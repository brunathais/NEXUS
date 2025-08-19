# Imagem base com Java
FROM openjdk:17-jdk-slim

# Define a pasta de trabalho no container
WORKDIR /app  

# Copia o jar da aplicação para dentro do container
COPY target/nexus.jar app.jar  

# Comando para rodar a aplicação
CMD ["java", "-jar", "app.jar"]
