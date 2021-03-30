import { compare, hash } from 'bcryptjs';
import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
import { createAccessToken, createRefreshToken } from './auth';
import { User } from './entity/User';
import { isAuth } from './isAuth';
import { MyContext } from './MyContext';
import { sendRefreshToken } from './sendRefreshToken';


@ObjectType()
class LoginResponse {
    @Field()
    accessToken: String
};
@Resolver()
export class UserResolver {

    @Query(() => String)
    hello(){
        return "hello"
    }

    @Query( () => [User] )
    async users(){
        try {
            const users = await User.find();
            return users;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    id(
        @Ctx() { payload }: MyContext
    ) {
        return payload?.userId;
    }
    
    @Mutation(() => Boolean )
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        const hashedPassword = await hash(password, 12);
        try {
            await User.insert(
                {
                    email,
                    password: hashedPassword
                }
            );
            return true;
        } catch (e) {
            console.log(e);
        return false;
        }
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(
        @Arg('userId', () => Int) userId: number
    ) {
        await getConnection().getRepository(User).increment({id: userId}, 'tokenVersion', 1);
        return true;
    }

    @Mutation(() => LoginResponse )
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() {res}: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne( { where: {email}});

        if (!user) {
            throw new Error('could not find user');
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            throw new Error('incorrect password');
        }

        //below is authenticated
        sendRefreshToken(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user)
        };
    }
}