from services.document_processor import DocumentProcessor
from services.text_cleaner import TextCleaner
from services.chunking import TextChunker
from services.embedding_service import EmbeddingService

processor = DocumentProcessor("uploads")

text = processor.extract_text(
    "uploads/5a83fb80-462e-4e87-84c7-047b499ca59a.pdf"
)

cleaned = TextCleaner.clean(text)
chunks = TextChunker.chunk_text(cleaned)

embedder = EmbeddingService()

embeddings = embedder.encode(chunks)

print("Embeddings Shape:", embeddings.shape)
print("Number of Chunks:", len(chunks))