import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Field( () => Int )
    @Column()
    email: string;

    @Column()
    password: string;

}
