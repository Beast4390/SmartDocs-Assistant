from services.document_processor import DocumentProcessor
from services.text_cleaner import TextCleaner
from services.chunking import TextChunker
from services.embedding_service import EmbeddingService
from services.vector_store import VectorStore

FILE_PATH = "uploads/5a83fb80-462e-4e87-84c7-047b499ca59a.pdf"

print("Extracting...")
processor = DocumentProcessor("uploads")
text = processor.extract_text(FILE_PATH)

print("Cleaning...")
cleaned = TextCleaner.clean(text)

print("Chunking...")
chunks = TextChunker.chunk_text(cleaned)
print(f"Chunks Created: {len(chunks)}")

print("Generating embeddings...")
embedder = EmbeddingService()
embeddings = embedder.encode(chunks)

print("Creating FAISS index...")
store = VectorStore()
store.create(embeddings.shape[1])

# Store FULL chunks (not titles)
store.add(embeddings, chunks)

print("Saving index...")
store.save()

print("✅ Index created successfully!")