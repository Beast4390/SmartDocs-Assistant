from services.embedding_service import EmbeddingService
from services.vector_store import VectorStore
from services.ollama_service import OllamaService


class RAGService:

    def __init__(self):

        self.embedder = EmbeddingService()

        self.vector_store = VectorStore()
        self.vector_store.load()

        self.ollama = OllamaService()

    def ask(self, question):

        query_embedding = self.embedder.encode([question])

        chunks = self.vector_store.search(
            query_embedding,
            top_k=3
        )

        context = "\n\n".join(chunks)

        answer = self.ollama.generate_answer(
            context,
            question
        )

        return answer