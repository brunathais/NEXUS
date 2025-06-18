from locust import HttpUser, task, between
import random
import string

def gerar_email():
    return ''.join(random.choices(string.ascii_lowercase, k=5)) + "@example.com"

class UsuarioCadastroTest(HttpUser):
    wait_time = between(1, 3)  # Tempo entre requisições por usuário

    @task
    def cadastrar_usuario(self):
        usuario = {
            "nome": "Usuário de Teste",
            "email": gerar_email(),  # Evita duplicar os emails
            "senha": "senha123"
        }

        with self.client.post("/usuarios", json=usuario, catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Erro ao cadastrar: {response.status_code} - {response.text}")
