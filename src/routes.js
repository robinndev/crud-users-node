import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query;
      const users = database.select('users', { name: search, email: search });
      return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      // Aqui eu posso converte o tipo de dado que vem no buffer
      const { name, email } = req?.body;

      if (email) {
        const user = {
          name: name,
          email: email,
          id: randomUUID(),
        };

        database.insert('users', user);
        return res.writeHead(201).end();
      } else {
        return res.writeHead(404).end();
      }
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete('users', id);
      res.writeHead(204).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update('users', id, {
        name,
        email,
      });
      res.writeHead(204).end();
    },
  },
];
