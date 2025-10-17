from django.urls import path

from . import views

urlpatterns = [
    path("get-github-token/", views.get_github_token, name="get_github_token"),
]
