# Cadastro de Cliente e Contato

## Sobre o projeto
Projeto prático que cria uma API REST de cadastro de clientes que permite vincular contatos. 
Gera relatório em PDF que mosta os Clientes e Contatos associados aquele.

![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/b540d6d4-0914-4609-8d35-4b45c03acb80)
![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/944eb213-894d-491b-acf7-4b2a961fb133)

## DER
![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/c5b62580-4098-4d9b-9918-2d75500926b0)

## Kanban
![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/7e107d45-88e8-4782-a7e7-eecca76933dd)


## Stacks
No projetos foram utilizadas as tecnologias, ferramentas e frameworks:
* Java 17
* Spring (Framework)
* Maven
* Swagger OpenAPI
* Banco H2 in memory
* JavaDoc
* HTML | CSS | Javascript (Frontend)
* Itext gerador PDF
* Postman
* Kanban github
* Github pages

## Pré-requisitos
Antes de começar, você precisará ter o seguinte instalado em seu sistema:
* Java: (https://oracle.com/java/) (versão 17 ou superior)
* IDE: fica a seu critério (utilizei Intelli J)

## Executando o backend
Siga as etapas abaixo para configurar e executar o backend:

1. Clone o repositório:

```json
git clone git@github.com:alvescamila87/api-cadastro-cliente.git
```

2. Acesse o diretório do projeto:

```json
cd api-cadastro-cliente
```

3. Ao abrir o projeto na IDE, execute o comando do Maven para limpar a instalar as dependências:

```json
mvn clean install
```

4. Execute o projeto:

```json
mvn spring-boot:run
```

## Endpoints da API
**BASE_URL: http://localhost:8080**

O backend expõe as seguintes rotas da API:

### Clientes
* GET /clientes
* GET /clientes/:id
* POST /clientes:
* PUT /clientes/:id
* DELETE /clientes/:id

### Contatos
* GET /clientes/:idCliente:/Contatos
* GET /clientes/:idCliente:/Contatos/:id
* POST /clientes/:idCliente:/Contatos
* PUT /clientes/:idCliente:/Contatos/:id
* DELETE /clientes/:idCliente:/Contatos/:id

### Relatorio
* GET /clientes/relatorio

## Swagger 
Pode ser utilizado o Swagger para check de documentação de API Rest e testes
**URL_SWAGGER: [swagger-ui/index.html#/](http://localhost:8080/swagger-ui/index.html#/)**
![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/5d421a4c-31d7-4818-96f9-e102fd7a8180)

## Postman
A collection do Postman pode ser utilizada para os API Rest e testes também.
Ela foi disponibilizada em:
```json
resources > documentation > collection
```
![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/02c37d85-7697-4b8e-aace-25e3b05e5afe)

## Autor
* Camila Alves




