from services.embedding_service import EmbeddingService
from services.vector_store import VectorStore

embedder = EmbeddingService()

store = VectorStore()
store.load()

question = "How many casual leaves are allowed?"

query_embedding = embedder.encode([question])

results = store.search(query_embedding)

for i, result in enumerate(results, start=1):
    print(f"\nResult {i}\n")
    print(result)