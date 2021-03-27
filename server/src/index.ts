import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import "dotenv/config";
import express from 'express';
import { verify } from 'jsonwebtoken';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { createAccessToken, createRefreshToken } from './auth';
import { User } from './entity/User';
import { sendRefreshToken } from './sendRefreshToken';
import { UserResolver } from './UserResolver';


// initialize app
(async () => {
    const app = express();
    app.use(cookieParser());
    app.get('/', (_, res) => res.send('hello'));
    // route to check cookie and give refresh token
    app.post('/refresh_token', async (req, res) => {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: ''});
        }

        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!); 
        } catch (err) {
            console.log(err);
            return res.send({ok: false, accessToken: ''});
        }

        // token is valid below and should return accessToken
        const user = await User.findOne({ id: payload.userId});

        if (!user) {
            return res.send({ok: false, accessToken: ''});
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ok: false, accessToken: ''});
        }

        //refresh the refresh token
       sendRefreshToken(res, createRefreshToken(user));
        
        return res.send({ok: true, accessToken: createAccessToken(user)});
    })

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
