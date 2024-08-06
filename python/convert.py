from flask import Flask, request, jsonify
from spire.doc import Document
from spire.doc.documents import FileFormat
import os

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert_file():
    input_path = request.json.get('input_path')
    output_path = request.json.get('output_path')
    if not input_path or not output_path:
        return jsonify({"error": "Missing input_path or output_path"}), 400

    try:
        # Create word document
        document = Document()
        # Load a doc or docx file
        document.load_from_file(input_path)
        # Save the document to PDF
        document.save_to_file(output_path, FileFormat.PDF)
        document.close()
        return jsonify({"message": "File converted successfully", "output_path": output_path}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
