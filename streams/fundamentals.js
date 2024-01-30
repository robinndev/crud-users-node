// Netflix & Spotify

// Importação de cliente via CSV
// 1gb -> 1.000.000
// POST -> import.csv

// 10mb/s -> 100s

// 10mb/s -> 10.000

// Readble Streams / Writeable Streams

// ___________________________________

// Streams =>

process.stdin.pipe(process.stdout);
// Pipe é uma palavra que significa algo proximo a "Encanamento"
// Esse comando quer dizer "tudo que estou recebendo como entrada" exemplo do stdin, ele vai
// encaminhar, o pipe é uma forma de "encaminhar" para uma saida, o stdout é uma stream de saida.

// Ou seja, stdin -> Stream de leitura (readble)
// stdout -> Stream de escrita (writeable)

// Pra ler a string, estamos usando o pipe, pra ler ela aos poucos

