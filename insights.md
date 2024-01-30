1 - Rodar o node em modo Watch
    - Para rodar o node onde ele fique escutando as mudanças, podemos usar o comando node --watch src/arquivo-desejado

2 - Para não ter que rodar esse comando varias vezes, você pode criar um script automatizado "alias" no package.json para facilitar

3 - PUT e PATCH:
    PUT ATUALIZAR UM RECURSO NO BACK-END (VARIOS CAMPOS)
    PATCH ATUALIZAR UMA INFO ESPECÍFICA (INFOS ESPECIFICAS)

3 - Como diferenciamos as rotas? 
    Podemos ter mais de uma rota igual, pois a diferença entre elas é vista como "URL + Método" então pode ter 3 /users, se os tipos de métodos forem diferentes, como "PUT, GET, DELETE"

4 - Stateful 
    Depende de dados em mémoria, talvez quando rodar sem os dados, ela rode diferente, até receber novamente, diferente da Stateless que salva externamente, como em BD

5 - Status Code
    Para auxiliar quem consome nossa API, podemos, padrões:
    Sempre tem 3 digitos.
    Sempre são de 1 a 100, 100 a 200, 200 a 300 e assim por diante até 600.
    100-199 Informativos (Só info)
    200-299 Sucesso (Por padrão vem 200)
    300-399 Redirect (Quando a rota não existe e foi direcionada pra outra)
    400-499 Client Error (Quando existe algum erro na request do front pro back)
    500-599 Erro de servidor (Quando algo ta cagado no back-end)

6 - Streams
    Dois conceitos de streams são "Writable Stream e Readble Stream"
    O Writable tem como exemplo um filme que estamos enviando aos poucos pro front-end processar
    E o Readble tem como exemplo um POST que envia um arquivo CSV, onde o back-end lê o dado por partes, até subir por completo.

    No node, toda porta de entrada e saida é uma stream, então tanto o req como e res são streams.
    O que isso quer dizer?
    Quer dizer que tanto posso enviar dados aos poucos mantendo o req aberto, quanto posso receber dados aos poucos com o res, mantendo ela aberta.
    Ex: REQ Upload | RES netflix

    Com Streams, nunca poderemos trabalhar com tipos primitivos, temos que usar um tipo especifico do node, que se chama buffer.

6 - Existem 3 formas do front-end mandar um dado em uma request
    - Query Params
    - Route Params
    - Request Body

    QueryParams são parametros nomeados, enviados no propio url da request, como:
    localhost:3000/users?userID=2 (Nesse caso, o userId é o QueryParams, para adicionar mais valores, vamos concatenando com &)
    - Usados quando a URL é statefull (Quando queremos modificar a url por exemplo com filtros, para mandar para alguém já filtrado)
    - Filtros
    - Paginação
    - Não pode ser usado para passagem de dado sensivel pois pode ser interceptado na URL

    RouteParams são parametros não nomeados, que também ficam na rota, exemplo: 
    localhost:3333/users/2 (Não tem nome, pois não precisa, normalmente o método http já fala o intuito, exemplo "DELETE", para deletar o user com id 2)
    - Usado para indetificação de recursos
    - Não pode ser usado para passagem de dado sensivel pois pode ser interceptado na URL

    Request Body é usado para envio de infos de formulario, além dos dados enviados ai, passarem pelo protocolo HTTPS então dificulta o acesso de hackers descobrirem o dado enviado.
    - Usado para dados sensiveis
    - Usado para formularios 