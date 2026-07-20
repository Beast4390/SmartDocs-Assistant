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

        print("\n========== RETRIEVED CHUNKS ==========")

        for i, chunk in enumerate(chunks, start=1):
            print(f"\nChunk {i}")
            print(chunk)

        context = "\n\n".join(chunks)

        print("\n========== CONTEXT ==========")
        print(context)

        answer = self.ollama.generate_answer(
            context,
            question
        )

        print("\n========== ANSWER ==========")
        print(answer)

        return answer