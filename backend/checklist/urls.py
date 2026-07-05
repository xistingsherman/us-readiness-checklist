from django.urls import path
from .views import ChecklistResultCreateView, ChecklistResultDetailView

urlpatterns = [
    path('results/', ChecklistResultCreateView.as_view(), name='result-create'),
    path('results/<uuid:pk>/', ChecklistResultDetailView.as_view(), name='result-detail')
]