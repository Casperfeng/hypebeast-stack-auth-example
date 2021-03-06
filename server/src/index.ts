import { ApolloServer } from 'apollo-server-express';
import "dotenv/config";
import express from 'express';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './UserResolver';


//initialize app
(async () => {
    const app = express();
    app.get('/', (_, res) => res.send('hello'));

    console.log(process.env.ACCESS_TOKEN_SECRET);
    await createConnection();

    const apolloServer = new ApolloServer({
       schema: await buildSchema({
           resolvers: [UserResolver],
       }),
       context: ( {req, res}  ) => ({ req, res
       })
    });

    apolloServer.applyMiddleware( { app })
    
    app.listen(4000, () => {
        console.log("express server started")
    });
})();
