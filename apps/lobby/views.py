from django.shortcuts import render

from utils.vars import RENDER_CTX

def index(request):
    RENDER_CTX["head"]["title"] += "| Inicio"
    return render(request, "index.html", RENDER_CTX)
