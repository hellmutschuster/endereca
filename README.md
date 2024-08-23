# Endereça API

Endereça é uma API construída com Express e JavaScript, parte do projeto da DGTI e do Geoprocessamento da SEMED para atender à demanda de uma aplicação para cadastrar e exportar endereços. Este README fornece as instruções necessárias para configurar e executar a API.

## Pré-requisitos

Antes de executar a API, é necessário ter o MongoDB rodando em sua máquina. Se você ainda não tem o MongoDB instalado, pode facilmente subir ele usando Docker.

### Executando o MongoDB com Docker

Use o seguinte comando para iniciar um container MongoDB:

```
docker run -d -p 27017:27017 --name mongodb mongo
```

## Instalando e Executando a API

```
git clone https://github.com/hellmutsemed/endereca .

npm install

npm run api
```
