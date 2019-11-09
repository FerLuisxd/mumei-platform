import {} from '@nestjs/typeorm'
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
    
}

