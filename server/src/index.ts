import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import "reflect-metadata";


//initialize app
(async () => {
    const app = express();
    app.get('/', (_, res) => res.send('hello'));

    const apolloServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String!
        }
        `, 
        resolvers: {
            Query: {
                hello: () => 'hello world'
            }
        }
    });

    apolloServer.applyMiddleware( { app })
    
    app.listen(4000, () => {
        console.log("express server started")
    });
})();
