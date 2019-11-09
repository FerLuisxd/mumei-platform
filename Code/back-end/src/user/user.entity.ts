import {} from '@nestjs/typeorm'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserCommandEntity} from "../user-command/user-command.entity";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;
    
    @Column()
    role:string;

    @OneToMany(type => UserCommandEntity , userCommand => userCommand.user)
    userCommand : UserCommandEntity[];


}

