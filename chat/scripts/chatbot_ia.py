import sqlite3
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from transformers import BertTokenizer, BertModel
import torch

# Conectar ao banco de dados
con = sqlite3.connect('../data/base_conhecimento.db')

# Carregar o modelo BERT
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Função para carregar a base de conhecimento
def carregar_base():
    df = pd.read_sql_query("SELECT * FROM conhecimento", con)
    return df

# Função para gerar embeddings com BERT
def gerar_embedding_bert(texto):
    tokens = tokenizer(texto, return_tensors='pt', padding=True, truncation=True, max_length=512)
    with torch.no_grad():
        embeddings = model(**tokens).last_hidden_state.mean(dim=1)
    return embeddings

# Função para encontrar a resposta com base na pergunta do cliente
def encontrar_resposta(pergunta_cliente):
    # Carregar base de conhecimento
    df = carregar_base()

    # Gerar embedding da pergunta do cliente
    embedding_cliente = gerar_embedding_bert(pergunta_cliente)

    # Gerar embeddings das descrições do banco de dados
    embeddings_bd = torch.vstack([gerar_embedding_bert(descricao) for descricao in df['descricao']])

    # Calcular similaridade coseno
    similaridade = cosine_similarity(embedding_cliente.numpy(), embeddings_bd.numpy())

    # Encontrar o índice da descrição mais similar
    indice_max = similaridade.argmax()

    # Retornar a descrição correspondente
    return df.iloc[indice_max]['descricao']

# Interagir com o chatbot
if __name__ == "__main__":
    print("Bem-vindo ao sistema de IA!")
    
    while True:
        pergunta = input("\nFaça sua pergunta (ou digite 'sair' para encerrar): ")
        
        if pergunta.lower() == 'sair':
            break
        
        resposta = encontrar_resposta(pergunta)
        print(f"Resposta: {resposta}")

# Fechar a conexão ao finalizar
con.close()
