from django.urls import path

from . import views

urlpatterns = [
    path("get-repos/<str:username>", views.get_repos, name="get_repos"),
]
