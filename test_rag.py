from services.rag_service import RAGService

rag = RAGService()

question = input("Ask a question: ")

answer = rag.ask(question)

print("\nAnswer:\n")
print(answer)