import { hash } from 'bcryptjs';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './entity/User';

@Resolver()
export class UserResolver {
    @Query( () => String )
    hello(){
        return 'hi!'
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
        return false;
        }
    }
}