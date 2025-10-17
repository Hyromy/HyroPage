from django.http import JsonResponse

from os import getenv

def get_github_token(request):
    return JsonResponse({"token": getenv("GITHUB_TOKEN")})