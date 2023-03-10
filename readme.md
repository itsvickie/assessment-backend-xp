# ✨ Desafio Técnico - Web Jump
Projeto desenvolvido na segunda fase do processo seletivo da Web Jump para o cargo de Desenvolvedor Back-end.

# 📂 Tecnologias, Versões e Soluções
O servidor foi desenvolvido com **Node.js** e **Express** com **Typescript**, já o banco de dados foi escolhido o não relacional: **MongoDB**. Nos testes, **Jest** e **Supertest**. E também utilizado o **Docker** para containizar o projeto. Foram escolhidas essas tecnologias visando o alto desempenho e a facilidade no desenvolvimento de um projeto rápido. O projeto segue os príncipios do **SOLID** e a arquitetura **UseCase**. A documentação da API foi feita pelo Postman pela facilidade e preferência.

# ⚙️ Rodando o Projeto
### ✅ Pré-requisitos
- [Docker](https://www.docker.com/get-started/)

### ⚒️ Ferramentas (Opcionais)
- [Postman](https://www.postman.com/downloads/)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass)

### ✨ Instalando
É necessário primeiramente clonar o repositório no seu local.

**Com SSH**
```
git clone git@bitbucket.org:Vickie1/assessment-backend-xp.git 
```

**Com HTTPS**
```
git clone https://Vickie1@bitbucket.org/Vickie1/assessment-backend-xp.git
```

No diretório da cópia do repositório, builde o container do Docker.
```
docker-compose up --build
```

Pronto! O projeto já está rodando localmente, sendo acesso pela URL: **http://localhost:8000/**

# 📃 Documentação

- Documentação Publicada: https://documenter.getpostman.com/view/15088635/VUjLMSiQ
- Link da **Collection** para importar: https://www.getpostman.com/collections/1604df52a1a50cd538a6
