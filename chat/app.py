from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)

# Dicionário de perguntas e respostas
faq = {
    "oi": "Olá! Como posso ajudar você?",
    "qual é o seu nome?": "Eu sou um bot criado para te ajudar!",
    "tchau": "Até logo! Se precisar, estarei aqui."
}

@app.route('/ask', methods=['POST'])
def ask():
    user_message = request.json.get('message', '').lower()
    response = faq.get(user_message, "Desculpe, não entendi sua pergunta.")
    return jsonify({'response': response})

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
