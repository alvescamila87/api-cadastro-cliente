# Cadastro de Cliente e Contato

## Sobre o projeto
Projeto prático que cria uma API REST de cadastro de clientes que permite vincular contatos. 
Gera relatório em PDF que mosta os Clientes e Contatos associados aquele.
![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/3aa82b12-e373-442c-b872-f95c3d37b72f)
![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/b9b2eb57-837d-4317-82ba-f438941d54f0)

## DER
![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/a0ad7b57-1912-458f-9307-ae296cf71885)

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
![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/236f4243-0a7c-4066-b761-11593a0e1581)


## Documentação
A documentação foi disponibilizada para facilitar a interação do usuário.
**JavaDoc**

![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/b9602805-2771-4c76-a3be-966de61c6c8f)

**DER**

![image](https://github.com/alvescamila87/api-cadastro-cliente/assets/116912821/ecd0cbb7-fbcd-40b3-b6b3-c719b236cb38)

**Swagger OpenAPI**

**Collection Postman**

## Autor
* Camila Alves




