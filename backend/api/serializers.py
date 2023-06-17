from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import IntegrityError, transaction
from django.utils.translation import gettext_lazy as _
from djoser.conf import settings
from djoser.serializers import (
    TokenSerializer,
    UserCreateSerializer,
    UserSerializer,
)
from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from api.fields import CurrentBudgetDefault, PrimaryKey404RelatedField
from budget.models import (
    Budget,
    BudgetCategory,
    BudgetFinance,
    Category,
    Finance,
    FinanceTransaction,
    Icon,
    IncomeExpenses,
)
from core.utils import (
    create_model_link_budget_data,
    create_ordered_dicts_from_objects,
)

User = get_user_model()


class AvatarMixin(serializers.Serializer):
    avatar = Base64ImageField(max_length=None, use_url=True, required=False)


class CustomUserCreateSerializer(AvatarMixin, UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = UserCreateSerializer.Meta.fields + (
            "first_name",
            "last_name",
            "avatar",
        )

    def perform_create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(**validated_data)
            budget = Budget.objects.create(
                name=f"{_('Default budget users')} {user.username}",
                user=user,
            )
            create_model_link_budget_data(
                budget,
                BudgetCategory,
                Category.get_default_use_records(
                    "name", "priority", "image_id"
                ),
            )
            create_model_link_budget_data(
                budget,
                BudgetFinance,
                create_ordered_dicts_from_objects(
                    Finance.get_default_use_records(flat=True), "finance_id"
                ),
            )
            if settings.SEND_ACTIVATION_EMAIL:
                user.is_active = False
                user.save(update_fields=["is_active"])
        return user


class CustomUserSerializer(AvatarMixin, UserSerializer):
    class Meta(UserSerializer.Meta):
        read_only_fields = None
        fields = UserSerializer.Meta.fields + (
            "first_name",
            "last_name",
            "avatar",
        )


class CustomDeleteUserSerializer(serializers.Serializer):
    pass


class CustomTokenSerializer(TokenSerializer):
    id = serializers.IntegerField(source="user.id")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    avatar = serializers.ImageField(source="user.avatar", use_url=True)

    class Meta(TokenSerializer.Meta):
        fields = TokenSerializer.Meta.fields + (
            "id",
            "first_name",
            "last_name",
            "avatar",
        )


class CategoryIconSerializer(serializers.ModelSerializer):
    """Сериализатор иконок для категорий."""

    class Meta:
        model = Icon
        fields = ["id", "image"]


class FinanceHandBookSerializer(serializers.ModelSerializer):
    """Сериализатор справочника истоичника финансирований."""

    class Meta:
        model = Finance
        fields = "__all__"


class FinanceDetailInfoSerializer(serializers.ModelSerializer):
    """Сериализатор с детальной информацией по отдельному счету бюджета."""

    class Meta:
        model = Finance
        fields = (
            "id",
            "name",
            "image",
        )


class DefaultBudgetDataSerializer(serializers.ModelSerializer):
    """Базовый сериализатор данных бюджета."""

    budget = serializers.HiddenField(default=CurrentBudgetDefault())

    def save(self, **kwargs):
        try:
            isinstance = super().save(**kwargs)
            isinstance.full_clean()
            return isinstance
        except (IntegrityError, DjangoValidationError) as exc:
            raise ValidationError(str(exc))


class BudgetFinanceSerializer(DefaultBudgetDataSerializer):
    """Сериализатор счетов для бюджета."""

    id = PrimaryKey404RelatedField(
        queryset=Finance.objects.all(), source="finance"
    )
    name = serializers.ReadOnlyField(source="finance.name")
    image = serializers.ImageField(
        source="finance.image",
        use_url=True,
        read_only=True,
    )
    balance = serializers.IntegerField()

    class Meta:
        model = BudgetFinance
        fields = ("id", "budget", "name", "image", "balance")
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=BudgetFinance.objects.all(),
                fields=["budget", "id"],
                message=_("The funding source for the budget must be unique"),
            )
        ]


class BudgetUpdateFinanceSerializer(BudgetFinanceSerializer):
    """Сериализатор счетов для бюджета."""

    id = PrimaryKey404RelatedField(source="finance", read_only=True)


class TransferFinanceSerializer(serializers.Serializer):
    """Трансфер баланса между счетами."""

    from_finance = PrimaryKey404RelatedField(queryset=Finance.objects.all())
    to_finance = PrimaryKey404RelatedField(queryset=Finance.objects.all())
    amount = serializers.IntegerField()

    def validate(self, data):
        """Валидация трансфера счетов."""
        if data["amount"] < 0:
            raise serializers.ValidationError(
                _("The amount for the transfer must be greater than zero!")
            )
        if data["from_finance"] == data["to_finance"]:
            raise serializers.ValidationError(
                _("The debit account must not match the credit account.")
            )
        budget = self.context["budget"]
        obj_from_finance = budget.finances.filter(finance=data["from_finance"])
        debet_balance = obj_from_finance.values_list("balance", flat=True)[0]
        if debet_balance < data["amount"]:
            raise serializers.ValidationError(
                _("There are not enough funds on the debit account.")
            )
        data["obj_from_finance"] = obj_from_finance.get()
        data["obj_to_finance"] = budget.finances.filter(
            finance=data["to_finance"]
        ).get()
        return data


class BudgetCategorySerializer(DefaultBudgetDataSerializer):
    """Сериализатор категорий расходов/доходов."""

    icon = PrimaryKey404RelatedField(
        queryset=Icon.objects.all(), source="icon"
    )
    image_url = serializers.ImageField(
        source="icon.image",
        use_url=True,
        read_only=True,
    )
    category_type = serializers.IntegerField(default=IncomeExpenses.EXPENSES)
    priority = serializers.ReadOnlyField()

    class Meta:
        model = BudgetCategory
        fields = (
            "id",
            "name",
            "priority",
            "budget",
            "icon",
            "image_url",
            "category_type",
            "color",
            "description",
        )


class TransactionReadSerializer(DefaultBudgetDataSerializer):
    """Сериализатор чтения транзакций."""

    category = BudgetCategorySerializer()
    finance = BudgetFinanceSerializer()

    class Meta:
        model = FinanceTransaction
        fields = "__all__"


class TransactionWriteSerializer(DefaultBudgetDataSerializer):
    """Сериализатор транзакций."""

    category = PrimaryKey404RelatedField(
        queryset=BudgetCategory.objects.all(),
    )
    finance = PrimaryKey404RelatedField(
        queryset=BudgetFinance.objects.all(),
    )

    class Meta:
        model = FinanceTransaction
        fields = "__all__"
