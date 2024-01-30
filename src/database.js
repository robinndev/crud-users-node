import fs from 'node:fs/promises';
// Também podemos usar o fs/promises, ele nos da a possibilidade de usarmos then e etc de assincronismo, porem o fs/promises n tem streaming, ent se for usar streaming, n pode usar ele

// Aqui estamos criando um construtor com nome do arquivo e um caminho relativo dele, usando o import.meta.url do propio node
// Com isso, agora posso passar direto o databasePath como caminho no writeFile do fs que ele entederá
const databasePath = new URL('db.json', import.meta.url);

export class Database {
  // Podemos usar sem o #, mas usando ela na frente, significa que de fora do arquivo, não é possível acessar database direto
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch((err) => {
        this.#persist();
      });
  }

  // Vamos criar um método chamado persit, esse método vai escrever os dados em um arquivo fisico
  // Vamos chamar ele sempre que inserirmos um novo valor no banco

  // Como estamos salvando em objeto, "Valor facil de ler", então vamos salvar os dados no arquivo json mesmo
  // p writeFile só aceita arquivos em string, por isso o segundo parametro vai ser o valor convertido
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search.name || search.email) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value?.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(table, data) {
    if (!this.#database[table]) {
      this.#database[table] = [];
    }

    this.#database[table].push(data);

    this.#persist();
    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data };
      this.#persist();
    }
  }
}
