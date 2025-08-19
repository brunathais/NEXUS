# Imagem base com Java
FROM openjdk:17-jdk-slim

# Define a pasta de trabalho no container
WORKDIR /NEXUS  

# Copia o jar da aplicação para dentro do container
COPY target/NEXUS.jar NEXUS.jar  

# Comando para rodar a aplicação
CMD ["java", "-jar", "NEXUS.jar"]
