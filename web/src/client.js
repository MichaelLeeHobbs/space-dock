import { API } from 'space-api';

const api = new API('todo-app', 'http://localhost/');
const db = api.Mongo();

export { api, db };
