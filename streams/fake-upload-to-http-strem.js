import { Readable } from 'node:stream';

class OnToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 10) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 100);
  }
}

// Com as novas versões do Node, ao usar uma stream no body, precisamos passar o duplex

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OnToHundredStream(),
  duplex: 'half', // adicione essa linha
})
  .then((res) => {
    return res.text();
  })
  .then((data) => {
    console.log(data);
  });

// Para enviar infos aos poucos, via stream, tem que ser via POST

// Fetch API é uma API completa para trabalhar com requests e respostas dentro da Web e do Node
// Node já suporta nativamente desde a V18
// Pode ser feita de front pra front ou back pra back
