from django.shortcuts import render

from utils.vars import RENDER_CTX

def index(request):
    return render(request, "index.html", RENDER_CTX)
