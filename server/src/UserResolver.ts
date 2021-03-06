import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { User } from './entity/User';
import { MyContext } from './MyContext';


@ObjectType()
class LoginResponse {
    @Field()
    accessToken: String
};
@Resolver()
export class UserResolver {
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
        res.cookie('jid', sign({ userId: user.id}, 'ewjfoiejwifwj', {
            expiresIn: "7d"
        }),        
        {
            httpOnly: true
        });

        return {
            accessToken: sign({ userId: user.id}, 'asiodjioasjd4', {
                expiresIn: "60m"
            })
        };
    }
}