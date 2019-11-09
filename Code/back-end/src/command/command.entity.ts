import {} from '@nestjs/typeorm'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserCommandEntity } from "../user-command/user-command.entity";

@Entity('command')
export class CommandEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    command:string;

    @Column()
    description:string;

    @Column()
    name:string; 
    
    @Column({default: "1"})    
    usable: boolean

    @OneToMany(type => UserCommandEntity, userCommand => userCommand.command)
    userCommand : UserCommandEntity[];

    
}

