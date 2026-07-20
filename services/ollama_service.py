import ollama


class OllamaService:

    def __init__(self, model="qwen3:1.7b"):
        self.model = model

    def generate_answer(self, context, question):

        prompt = f"""
You are SmartDocs Assistant.

Answer ONLY from the given context.

If the answer is not present, say:
"I couldn't find that information in the uploaded documents."

Context:
{context}

Question:
{question}

Answer:
"""

        response = ollama.chat(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response["message"]["content"]