from rest_framework import generics
from .models import ChecklistResult
from .serializers import ChecklistResultSerializer

class ChecklistResultCreateView(generics.CreateAPIView):
    queryset = ChecklistResult.objects.all
    serializer_class = ChecklistResultSerializer

class ChecklistResultDetailView(generics.RetrieveAPIView):
    queryset = ChecklistResult.objects.all()
    serializer_class = ChecklistResultSerializer