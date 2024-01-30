import { Transform } from 'node:stream';
import http from 'node:http';

const server = http.createServer(async (req, res) => {
  const buffers = [];

  // Vamos percorrer a stream de requests populando o array

  // O for await vai garantir que nossa aplicação não execute a lógica antes de finalizar a leitura da stream.
  // ou seja "chunk" de req

  for await (const chunk of req) {
    buffers.push(chunk); // Ou seja, toda vez adicionanamos no array
  }

  // O for await vai garantir que nossa aplicação não execute a lógica antes de finalizar a leitura da stream.
  // Após chegar aqui, vamos usar o Buffer.concat pra concatenar vários pedaços de buffers

  const fullStreamContent = Buffer.concat(buffers);
  console.log(fullStreamContent);

  return res.end(fullStreamContent);
  //   return req.pipe(new InverseNumberStreams()).pipe(res);
});

server.listen(3334);
