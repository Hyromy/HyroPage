from django.shortcuts import render

from utils.funcs import (
    render_ctx,
    get_public_repos,
    get_contrib_repos,
)
from utils.vars import TECHNOLOGIES

def index(request):
    ctx = render_ctx(
        title = "Inicio | ",
        styles = [None, "index"],
        scripts = [None, "index"]
    )

    ctx["technologies"] = dict()
    for tech in sorted(TECHNOLOGIES, key = lambda x: x["name"]):
        if tech["type"] not in ctx["technologies"]:
            ctx["technologies"][tech["type"]] = []

        ctx["technologies"][tech["type"]].append({
            "name": tech["name"],
            "img": tech["img"]
        })

    ctx["repos"] = get_public_repos("Hyromy")

    return render(request, "index.html", ctx)

def experience(request):
    return render(request, "coming_soon.html",
        render_ctx(title = "¡Próximamente!")
    )

def projects(request):
    return render(request, "coming_soon.html",
        render_ctx(title = "¡Próximamente!")
    )

def about_me(request):
    return render(request, "coming_soon.html",
        render_ctx(title = "¡Próximamente!")
    )
