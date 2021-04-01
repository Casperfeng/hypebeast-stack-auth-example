import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field( () => String )
    id: number;

    @Field( () => String )
    @Column()
    email: string;

    @Column()
    password: string;

    @Column('int', { default: 0})
    tokenVersion: number;

}
