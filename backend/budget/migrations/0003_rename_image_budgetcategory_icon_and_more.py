# Generated by Django 4.1.3 on 2023-06-17 16:11

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("budget", "0002_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="budgetcategory",
            old_name="image",
            new_name="icon",
        ),
        migrations.RenameField(
            model_name="category",
            old_name="image",
            new_name="icon",
        ),
    ]
