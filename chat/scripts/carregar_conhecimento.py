import sqlite3
import os

# Caminho absoluto do banco de dados
caminho_banco = os.path.abspath('/home/devgir/gir_system/data/base_conhecimento.db')
print(f"Caminho do banco de dados: {caminho_banco}")

# Conectar ao banco de dados
con = sqlite3.connect(caminho_banco)
cur = con.cursor()

# Criação da tabela se não existir
cur.execute('''
    CREATE TABLE IF NOT EXISTS conhecimento (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topico TEXT,
        descricao TEXT
    )
''')

# Inserção de informações no banco
def inserir_informacoes():
    dados = [
        ('Login', 'Para fazer login, insira seu nome de usuário e senha na tela de login.'),
        ('Alterar Senha', 'Para alterar sua senha, vá até Configurações de Conta e clique em "Alterar Senha".'),
        ('Recuperar Senha', 'Clique em "Esqueci minha senha" e siga as instruções para recuperar sua senha.'),
        ('Funcionalidades', 'O sistema possui funcionalidades como controle de estoque, relatórios e gestão de clientes.'),
    ]

    # Inserir dados no banco
    cur.executemany("INSERT INTO conhecimento (topico, descricao) VALUES (?, ?)", dados)
    con.commit()

if __name__ == "__main__":
    inserir_informacoes()
    con.close()
    print("Informações inseridas com sucesso!")
