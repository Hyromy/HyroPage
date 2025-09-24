from django.shortcuts import render

from project.views import coming_soon

def index(request):
    return coming_soon(request)
