import faiss
import pickle
import os
import numpy as np


class VectorStore:

    def __init__(self):

        self.index_path = "database/faiss_index/index.faiss"
        self.metadata_path = "database/faiss_index/metadata.pkl"

        self.index = None
        self.metadata = []

    def create(self, dimension):

        self.index = faiss.IndexFlatL2(dimension)

    def add(self, embeddings, chunks):

        self.index.add(np.array(embeddings))

        self.metadata.extend(chunks)

    def save(self):

        faiss.write_index(
            self.index,
            self.index_path
        )

        with open(self.metadata_path, "wb") as f:
            pickle.dump(self.metadata, f)

    def load(self):

        self.index = faiss.read_index(
            self.index_path
        )

        with open(self.metadata_path, "rb") as f:
            self.metadata = pickle.load(f)