import faiss
import pickle
import numpy as np
import os


class VectorStore:

    def __init__(self):

        self.index_path = "database/faiss_index/index.faiss"
        self.metadata_path = "database/faiss_index/metadata.pkl"

        self.index = None
        self.metadata = []

    def create(self, dimension):

        self.index = faiss.IndexFlatL2(dimension)

    def add(self, embeddings, chunks):

        self.index.add(np.array(embeddings, dtype=np.float32))
        self.metadata.extend(chunks)

    def save(self):

        faiss.write_index(self.index, self.index_path)

        with open(self.metadata_path, "wb") as file:
            pickle.dump(self.metadata, file)

    def load(self):

        if not os.path.exists(self.index_path):
            raise FileNotFoundError("FAISS index not found.")

        self.index = faiss.read_index(self.index_path)

        with open(self.metadata_path, "rb") as file:
            self.metadata = pickle.load(file)

    def search(self, query_embedding, top_k=3):

        query_embedding = np.array(query_embedding, dtype=np.float32)

        distances, indices = self.index.search(
            query_embedding,
            top_k
        )

        results = []

        for idx in indices[0]:
            if idx != -1:
                results.append(self.metadata[idx])

        return results