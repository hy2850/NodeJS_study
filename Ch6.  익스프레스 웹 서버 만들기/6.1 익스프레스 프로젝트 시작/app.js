import express from 'express';
import path from 'path';

// ES6 No __dirname : https://velog.io/@suyeonpi/Node.js-dirname-is-not-defined-ES6
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  // res.send('Hello, Express');
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Express listening at port ${app.get('port')}`);
});
