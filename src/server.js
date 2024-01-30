import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// UUID => Unique ID

// CommonJS formato de import com requite
// ESModule formato de import com import/export

// Para fazer funcionar o ESModule coloque o "type: module" no package

// Dica, para diferenciar modulos do node, podemos usar "node:" antes do module na importação"

// Principais recursos de rota
// Método HTTP e URL que vem de dentro do REQ

// Cabeçalhos (Requisição/Resposta) => Metadados, servem pra dizer como podem interpretar o dado que vai chegar, é bom

const server = http.createServer(async (req, res) => {
  // Req todos os dados de quem chama o servidor
  // Res devolve uma respota
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = url.match(route.path);

    const { query, ...params } = routeParams.groups;
    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end('Usuário adicionado com sucesso!');
});

server.listen(3333);
// Localhost: 3333
