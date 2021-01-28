const http = require('http');
const { schemaBuilder } = require('./graphqlIndex')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('hello world!');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }

  if (req.url === '/api/humans') {
    console.log('req -> ', req);
    schemaBuilder('{ humans { id, name, appearsIn, homePlanet } }').then((humans) => {
      res.write(JSON.stringify(humans));
      res.end();
    });
  }
});

server.listen(3000);

//server.on('connection', () => console.log('New connection!'));

console.log('Listening on port 3000...');