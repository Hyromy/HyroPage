from django.contrib import admin
from django.urls import path, include

from .views import custom_404

from apps.lobby import urls as lobby_urls
from apps.bridge import urls as bridge_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(lobby_urls)),
    path('this/', include(bridge_urls)),
]

handler404 = custom_404
