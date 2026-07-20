import fitz  # PyMuPDF


class PDFExtractor:

    @staticmethod
    def extract_text(file_path: str) -> str:
        text = []

        with fitz.open(file_path) as pdf:
            for page in pdf:
                page_text = page.get_text("text")

                if page_text:
                    text.append(page_text)

        return "\n".join(text)