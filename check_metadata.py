import pickle

with open("database/faiss_index/metadata.pkl", "rb") as f:
    metadata = pickle.load(f)

print(f"Total Chunks: {len(metadata)}")

for i, chunk in enumerate(metadata, start=1):
    print("\n" + "=" * 60)
    print(f"CHUNK {i}")
    print("=" * 60)
    print(chunk)