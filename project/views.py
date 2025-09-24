from django.shortcuts import render

def custom_404(request, exception):
    return render(request, "404.html", {
        "head": {
            "title": "Página no encontrada",
            "scripts": ["404"]
        }
    }, status = 404)

def coming_soon(request):
    return render(request, "coming_soon.html", {
        "head": {
            "title": "¡Próximamente!",
        }
    })
