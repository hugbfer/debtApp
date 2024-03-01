from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path(
        "list-debts/",
        views.GetUsersDebts.as_view(),
        name="list-debts",
    ),
    path(
        "send-mail/",
        views.SendMail.as_view(),
        name="send-mail",
    )
]