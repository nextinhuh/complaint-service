# Complaint Service

## 🔨 Pré-requisitos:

> 📋 Postgres 

> 🚴 Node.JS

## :dash: Como rodar a aplicação:  

> Primeiro, para instalar todas as dependências, deve executar o comando:

 `yarn`
 
  ### Para configurar o banco:  
  
 > O nome do banco deve ser:
 
 `complaint-service`
 
 > Depois, para rodar as migrations, deve executar o comando:
 
 `yarn typeorm migration:run`
 
 ### Iniciar a API:  
 
 > Para dar início no servidor, que será acessado pela porta `3000`, deve executar o comando:
 
 `yarn dev:server`  
 
 Tendo que receber uma mensagem como:
 
 `🚀 Server started on port 3000!`  
 
 Após isso, o servidor estará ativo e podendo receber requisições `POST` na rota:  
 
 ✅  `http://localhost:3000/v1/denuncias`  
 
 ##  📑 Rodando os testes:
 
 > Para rodar os testes deve executar o comando:
 
 `yarn test`
 
 ## ⚠️ Observação:
 
  ### Para que os testes funcionem, o servidor deve está ativo, pois ele faz requisições diretas a API.
 
  ### As requisições terão que ter o seguinte formato para que sejam aceitas:
 ```
 {  
	"latitude": 42.4648183,  
	"longitude":-71.010051,  
	"whistleblower": {  
		"name": "José",  
		"cpf": "06835346450"  
	},  
	"complaint": {  
		"title": "Esgoto a céu aberto",  
		"description": "Existe um esgoto a céu aberto."  
	}  
}
```
 
