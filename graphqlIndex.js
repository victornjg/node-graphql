const { graphql, buildSchema } = require('graphql');

const providers = {
  humans: [
    { id: '1000', name: 'Luke Skywalker', appearsIn: ['New Hope', 'Empire', 'Jedi'], homePlanet: 'Tatooine' },
    { id: '1002', name: 'Han Solo', appearsIn: ['New Hope', 'Empire', 'Jedi'], homePlanet: 'Corellia' },
    { id: '1003', name: 'Leia Organa', appearsIn: ['New Hope', 'Empire', 'Jedi'], homePlanet: 'Alderaan' },
  ]
};

const schema = buildSchema(`
  interface Character {
    id: String!
    name: String
    appearsIn: [String]
  }

  type Human implements Character {
    id: String!
    name: String
    appearsIn: [String]
    homePlanet: String
  }

  type Droid implements Character {
    id: String!
    name: String
    appearsIn: [String]
    primaryFunction: String
  }

  type Query {
    human(id: String!): Human
    humans: [Human]
  }
`);

const resolvers = {
  human: ({ id }) => {
    const human = providers.humans.find(item => item.id === id);
    return human;
  },
  humans: () => {
    return providers.humans;
  }
};

//graphql(schema, '{ human(id:"1000") { id, name, appearsIn, homePlanet } }', resolvers).then((res) => console.log(JSON.stringify(res)));
//graphql(schema, '{ humans { id, name, appearsIn, homePlanet } }', resolvers).then((res) => console.log(JSON.stringify(res)));

//const humansSchema = graphql(schema, '{ humans { id, name, appearsIn, homePlanet } }', resolvers);

const schemaBuilder = (query) => {
  return graphql(schema, query, resolvers);
};

module.exports.schemaBuilder = schemaBuilder;