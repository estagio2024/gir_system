import sqlite3
from flask import Flask, request, jsonify, render_template
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
db_file = 'girIA.db'
ai_name = "girIA"  # Nome da IA

def init_db():
    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS system_info (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question TEXT UNIQUE,
                answer TEXT
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_info (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                key TEXT UNIQUE,
                value TEXT
            )
        ''')
        conn.commit()

def add_system_info(variations, answer):
    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        for question in variations:
            cursor.execute('INSERT OR REPLACE INTO system_info (question, answer) VALUES (?, ?)', (question, answer))
        conn.commit()

def get_all_questions():
    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT question, answer FROM system_info')
        return cursor.fetchall()

def find_best_response(user_question):
    questions = get_all_questions()
    if not questions:
        return None

    questions_list = [q[0] for q in questions] + [user_question]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(questions_list)
    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])

    best_index = cosine_sim.argmax()
    if cosine_sim[0][best_index] > 0.1:
        return questions[best_index]
    return None

def get_system_response(user_question):
    response = find_best_response(user_question)
    if response:
        return response[1]
    return "Desculpe, não sei a resposta. Você pode me ensinar?"

def process_input(user_input):
    user_input = user_input.strip().lower()

    # Respostas para saudações
    greetings = ["olá", "oi", "bom dia", "boa tarde", "boa noite"]
    if any(greeting in user_input for greeting in greetings):
        return "Olá! Eu sou a girIA. Como posso ajudar você hoje?"

    # Reconhecer elogios
    compliments = ["ótimo trabalho", "muito bom", "excelente", "parabéns", "você é incrível"]
    if any(compliment in user_input for compliment in compliments):
        return "Obrigado pelo elogio! Isso significa muito para mim. Como posso ajudar você mais?"

    # Resposta para perguntas sobre o nome da IA
    if "qual seu nome" in user_input or "como você se chama" in user_input:
        return f"Meu nome é {ai_name}. Como posso ajudar você?"

    # Processar instruções para aprendizado
    if "ensine" in user_input:
        instruction = user_input.replace("ensine ", "").strip()
        add_system_info([instruction], instruction)  # Armazena a instrução
        return "Entendi, vou lembrar disso!"

    # Perguntas sobre o sistema
    if user_input.endswith('?'):
        normalized_question = user_input[:-1].strip()
        return get_system_response(normalized_question)

    # Armazenar informações fornecidas
    variations = [user_input]
    add_system_info(variations, user_input)
    return "Entendi, vou lembrar disso!"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_input = request.form['user_input']
    response = process_input(user_input)
    return jsonify(response=response)

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
