import buttonIconPrimary from '../Images/icons/btn-primary-icon.svg';
import buttonIconSecondary from '../Images/icons/btn-secondary-icon.svg';
import buttonIconFiat from '../Images/icons/btn-fiat-icon.svg';
import buttonIconMinus from '../Images/icons/btn-minus-icon.svg';

export const RegExLogin = '[da-zA-Zа-яА-ЯЁё/_.+-]+';
export const RegExEmail = '[da-zA-Z_.@-]+';
export const RegExName = '[^d!@#$%|^&*\\/()_+\n\t]+';
export const RegExSurname = '[^d!@#$%|^&*\\/()_+\n\t]+';
export const RegExPassword = '[da-zA-Z_ .!"#$%&,-]+';
export const RegExPhone = '[d+()]+';
export const RegExSpendOperationName = '[a-zA-Zа-яА-ЯЁё]+';
export const RegExEarnOperationName = '[a-zA-Zа-яА-ЯЁё‐— -]+';
export const RegExOperationAmount = '[d]+';

export const RequirementsLogin =
  'Имя пользователя должно состоять только из латинских букв (в верхнем или нижнем регистре), цифр, символов(_ . + -) и иметь длину от 2 до 25 символов. Пожалуйста, не используйте пробелы или другие символы. Регистр букв не учитывается.';
export const RequirementsEmail =
  'Адрес электронной почты может содержать только цифры, латинские буквы и специальные символы (@ - _ .) и должен иметь длину от 7 до 129 символов.';
export const RequirementsPassword =
  'Длина пароля должна быть от 8 до 40 символов. Используйте как минимум одну прописную (заглавную) латинскую букву, строчную латинскую букву, цифру (но не только цифры) и специальные символы (пробел ! " # $ % & . ,). Пароль чувствителен к регистру.';
export const RequirementsNameAndSurname =
  'Личные данные пользователя могут содержать прописные и строчные буквы, пробел в середине, дефис и тире и должны иметь длину от 0 до 50 символов. Регистр букв не учитывается.';

export const arrCategoriesСommon = [
  {
    title: 'Общие',
    id: '1',
  },
  {
    title: 'Расходы',
    id: '2',
  },
  {
    title: 'Доходы',
    id: '3',
  },
];

export const arrCategoriesDate = [
  {
    title: 'День',
    id: '1',
  },
  {
    title: 'Неделя',
    id: '2',
  },
  {
    title: 'Месяц',
    id: '3',
  },
  {
    title: 'Год',
    id: '4',
  },
];

export const arrCategoriesWeek = [
  {
    title: 'Пн',
    id: '1',
  },
  {
    title: 'Вт',
    id: '2',
  },
  {
    title: 'Ср',
    id: '3',
  },
  {
    title: 'Чт',
    id: '4',
  },
  {
    title: 'Пт',
    id: '5',
  },
  {
    title: 'Сб',
    id: '6',
  },
  {
    title: 'Вс',
    id: '7',
  },
];

export const arrInitFQA = [
  {
    id: '1',
    question: 'Как добавить доход?',
    answer:
      'По кнопке «+ Расход» в фильтрации на странице Бюджет. Нужно заполнить все необходимые поля, выбрать счёт с которого была проведена транзакция и подходящую категорию. Останется лишь нажать на кнопку «Готово» и транзакция отразится в таблице, а также на графиках.',
  },
  {
    id: '2',
    question: 'Где отслеживать динамику?',
    answer:
      'Отслеживать соотношение расходов и доходов можно на странице «Бюджет» исходя из вашего баланса. На странице «Статистика» предоставлено полное отслеживание динамики ваших расходов и доходов на разных графиках.',
  },
  {
    id: '3',
    question: 'Как добавлять свои категории?',
    answer:
      'В отображаемых категориях нужно нажать на кнопку «Добавить/Редактировать», после чего можно будет добавить свою категорию. Задайте ей название, выберите иконку и к чему она будет прикреплена, к расходам или доходам.',
  },
  {
    id: '4',
    question: 'Как пользоваться конвертом на накопления?',
    answer:
      'Он нужен, чтобы задавать цель, на которую вы хотите накопить и откладывать туда ваши накопления. Добавьте туда новую цель, задайте ей название и заполните все необходимые поля. По клику на цель вы можете каждый раз пополнять конверт и быть ближе к своей цели. Когда вы накопите желаемую сумму, вы сможете потратить ее и она сразу отобразится в таблице.',
  },
  {
    id: '5',
    question: 'Как занести повторяющиеся расходы?',
    answer:
      'Нажмите на кнопку «Добавить» и заполните необходимые поля. Обязательно выберите дату и длительность повторяющихся расходов, чтобы они повторялись тогда, когда вам это нужно и с нужной периодичностью. После того, как вы настроите повторяющиеся расходы, вам больше не придется заносить их в таблицу каждый раз.',
  },
  {
    id: '6',
    question: 'Как пользоваться фильтрацией?',
    answer:
      'В фильтрации можно выбирать конкретный период, в который вы хотите посмотреть осуществленные транзакции, а также выбирать конкретные даты в календаре. ',
  },
  {
    id: '7',
    question: 'Как работают отображаемые категории?',
    answer:
      'В отображаемых категориях можно выбрать, что вы хотите видеть в своей таблице. Можно как расходы и доходы, так и все транзакции вместе. Помимо этого можно выбирать определенные категории, которые вас интересуют в данный момент.',
  },
];

// Button icons 
export const BUTTON_ICON_PRIMARY = buttonIconPrimary;
export const BUTTON_ICON_SECONDARY = buttonIconSecondary;
export const BUTTON_ICON_FIAT = buttonIconFiat;
export const BUTTON_ICON_MINUS = buttonIconMinus;
