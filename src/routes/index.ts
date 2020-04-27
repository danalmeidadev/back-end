import { Router } from 'express';

const routes = Router();
routes.get('/', (request, response) => response.json({ message: 'Hello Wordnfklsdjdshfjksdhfjkhdsjkfhdjksfhjksdhfkjsdhfjlsjkldfjgknsdjkfhjksdfhjksdfhjksdhfjksdhfkldjgklfdjgklfjdklgjfkldgjlkdjglkdfjglkdjflkhfklsd' }));

export default routes;
