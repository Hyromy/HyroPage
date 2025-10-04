from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name = "index"),
    path("experience/", views.experience, name = "experience"),
    path("projects/", views.projects, name = "projects"),
    path("about-me/", views.about_me, name = "about_me"),
]
