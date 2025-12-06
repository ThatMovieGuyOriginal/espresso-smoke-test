import sys

import PyPDF2


def extract_pdf_text(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += f"\n--- PAGE {page_num + 1} ---\n"
                text += page.extract_text()
            return text
    except Exception as e:
        return f"Error extracting {pdf_path}: {str(e)}"

if __name__ == "__main__":
    pdf_path = sys.argv[1] if len(sys.argv) > 1 else None
    if pdf_path:
        print(extract_pdf_text(pdf_path))
    else:
        print("Usage: python extract_pdf.py <pdf_path>")
