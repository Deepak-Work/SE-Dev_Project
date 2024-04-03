from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include, re_path

from django.conf import settings
from django.conf.urls.static import static

def index_view(request):
    return render(request, 'dist/index.html')

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/authentication/", include("authentication.urls")),
    path("api/clubs/", include("clubs.urls")),
    path("api/posts/", include("posts.urls")),
    path("api/events/", include("event.urls")),
    re_path(r'^.*$', index_view),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
