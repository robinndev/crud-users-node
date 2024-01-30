import { Transform } from 'node:stream';
import http from 'node:http';

class InverseNumberStreams extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    // Dessa vez, a callback recebe dois parametros, o primeiro que seria para caso desse erro e o segundo é a conversão (dado transformado)
    callback(null, Buffer.from(String(transformed)));
  }
}

// req é uma stream de leitura -> Readble
// res é uma stream de escrita -> Writeable

const server = http.createServer((req, res) => {
  return req.pipe(new InverseNumberStreams()).pipe(res);
});

server.listen(3334);


