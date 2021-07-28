# Hiring Coders - exemplo de REST e SOAP

Este exemplo utiliza o postgresql rodando em docker, para rodar:
```
docker run --name database -e ALLOW_EMPTY_PASSWORD=no -e POSTGRESQL_PASSWORD=docker -p 5432:5432 bitnami/postgresql:13
```
Instalar o express, framework 
```
npm i express --save
```
Instalar o pacote de desenvolvimento sucrase
```
npm i sucrase -D
```

Instalar o pacote de desenvolvimento nodemon que server para manter rodando a api
```
npm i nodemon -D
```
Criar e configurar o nodemon.json na raiz com o seguinte:
```
{
    "execMap": {
        "js": "sucrase-node"
    }
}
```
Colocar no package.json dentro de scripts:
```
  "scripts": {
    "dev": "nodemon src/server"
  }
```
Para rodar:
```
npm run dev
```
Instalar o sequelize (ORM para nodejs) e também o sequelize client. (importante: o sequelize só aceita exports usando module.exports)
```
npm i sequelize
npm install --save-dev sequelize-cli
```
Instalar também para conectar via postgresql (dialeto)
```
npm i pg pg-hstore
```
Depois de criados os arquivos necessários para o sequelize, para criar o migrations, rodar:
```
npx sequelize migration:create --name=create-users
```
Para criar as tabelas no database de acordo com o migrations via sequelize:
```
npx sequelize db:migrate (cria as tabelas)
npx sequelize db:migrate:undo (remove as tabelas)
npx sequelize db:migrate:undo:all (remove todas as tabelas ???)
```
O arquivo .sequelizerc deve estar na raiz do projeto, facilmente se equivoca e coloca no src.

Instalar bcrypt para tratar de senhas:
```
npm i bcrypt
```
Instalar o JWT (JSON web token)
```
npm i jsonwebtoken
```
Instalar a lib para realizar validações:
```
npm install yup
```
Instalar o multer para upload de arquivos:
```
npm i multer
```
Criar migrations para files (upload de imagem):
```
npx sequelize migration:create --name=create-files
```
Cada vez que criar uma migration, para roda-la fazendo com que persista no db:
```
npx sequelize db:migrate 
```
Instalar date-fns para tratamento com datas:
```
npm i date-fns
```
Para efeito de aprendizado foi utilizado o mongodb no ["MongoDB Atlas"](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_americas_brazil_search_core_brand_atlas_desktop&utm_term=atlas%20mongo%20db&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624308&gclid=Cj0KCQjw9O6HBhCrARIsADx5qCREUxII6MblocNcQ4rIuGQsZ154uXXfPoLPabK7X9FGI4FtF22sGXEaAm_-EALw_wcB)

Instalar o conector para mongoDB:
```
npm i mongoose
```
Utilizado o [MongoDB Compass](https://www.mongodb.com/try/download/compass) como cliente mongodb.
