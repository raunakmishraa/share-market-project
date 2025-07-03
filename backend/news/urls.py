# backend/news/urls.py
from django.urls import path
from .views import NewsArticleList

urlpatterns = [
    path('', NewsArticleList.as_view(), name='news-list'),
]
