from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include, re_path

def index_view(request):
    return render(request, 'dist/index.html')

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/authentication/", include("authentication.urls")),
    path("api/clubs/", include("clubs.urls")),
    path("api/posts/", include("posts.urls")),
    re_path(r'^.*$', index_view),
]
