import { Readable, Writable, Transform } from 'node:stream';

// Vamos criar um stream de leitura do zero

// Toda stream contém um método obrigátorio que é o _read

// push é o método que usamos para uma Readble Stream mostrar pra quem esta consumindo ela.
// Raramente iremos criar uma stream do zero, pois podemos usar o response e request.
class OnToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 100);
  }
}

// Criando uma Stream de escrita

// Diferente da stream de leitura, aqui o método obrigatorio é o Write
// o método _write, recebera três params "chunk, encoding e callback"

// O Chunk é o pedaço que lemos com a string de leitura, tudo que é enviado no thi.push
// Enconding é como que essa info está codificada
// Callback é uma função que a stream de escrita precisa chamar quando ela terminou fazer o que ela teria que fazer

// A stream de escrita ela não retorna nada, ela apenas processa, a stream de transformação é outra

class MultiplyForTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);

    callback();
  }
}

// Criando uma Stream de transformação

// Streams de transformação serve para tranformar dados, como por exemplo, converter números positivos pra negativos
// Diferente da de escrita, ao invés de usarmos um console.log, vamos enviar o dado modificado via call back, jnto com a possibilidade de enviar um erro
// Diferente das demais Streams, a de transformação tem como método obrigatorio o _transform

class InverseNumberStreams extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    // Dessa vez, a callback recebe dois parametros, o primeiro que seria para caso desse erro e o segundo é a conversão (dado transformado)
    callback(null, Buffer.from(String(transformed)));
  }
}

// Explicação
// A Stream de leitura, eu consigo ler com ela
// A Stream de escrita, eu só consigo escrever dados com ela
// A Stream de transformação, ela obrigatoriamente precisa ler dados de algum lugar e escrever dados para outro lugar, é uma stream de intermeio, entre a comunicação de duas outras streams

new OnToHundredStream()
  .pipe(new InverseNumberStreams())
  .pipe(new MultiplyForTenStream());

  // O que é um Buffer ? Buffer é uma forma de transicionar informações entre streams, sem ter que enviar streams, inteiros e etc

  // Além de todas essas Streams, existe também a Stream Duplex, que ela pode tanto ser uma Stream de leitura, quanto uma de escrita.
  // Podemos pensar nela como um arquivo fisico do sistema, podemos ler ele, escrever nele, mas não podemos transformar ele.
  // Ela é um conjunto da Readble e Writeable
  