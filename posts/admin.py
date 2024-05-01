from django.contrib import admin

from .models import Post, Comment, React, CommentReact

# Register your models here.
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(React)
admin.site.register(CommentReact)
