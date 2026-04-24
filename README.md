\# Projeto DimDim Docker



\## 📌 Descrição

Projeto desenvolvido para o Checkpoint de DevOps Tools \& Cloud Computing.



A aplicação consiste em uma API Node.js com CRUD de usuários integrada a um banco de dados MySQL, ambos rodando em containers Docker.



\---



\## 🐳 Tecnologias utilizadas

\- Node.js

\- Express

\- MySQL

\- Docker



\---



\## 🚀 Como executar o projeto



\### 1. Criar rede Docker

docker network create dimdim-network



\### 2. Subir o MySQL

docker run -d --name mysql-container-561190 --network dimdim-network -e MYSQL\_ROOT\_PASSWORD=root -e MYSQL\_DATABASE=dimdim -p 3306:3306 -v mysql-data:/var/lib/mysql mysql:8



\### 3. Criar tabela

docker exec -it mysql-container-561190 mysql -u root -p



Dentro do MySQL:

USE dimdim;



CREATE TABLE usuarios (

&#x20; id INT AUTO\_INCREMENT PRIMARY KEY,

&#x20; nome VARCHAR(100)

);



\### 4. Build da API

docker build -t dimdim-api ./app



\### 5. Rodar API

docker run -d --name api-561190 --network dimdim-network -p 3000:3000 dimdim-api

