from services.vector_store import VectorStore
from services.embedding_service import EmbeddingService

texts = [
    "Leave Policy",
    "Work From Home",
    "Employee Benefits"
]

embedder = EmbeddingService()

embeddings = embedder.encode(texts)

store = VectorStore()

store.create(embeddings.shape[1])

store.add(embeddings, texts)

store.save()

print("FAISS index created successfully!")