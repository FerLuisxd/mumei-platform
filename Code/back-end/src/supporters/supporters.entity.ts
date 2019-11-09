import { } from '@nestjs/typeorm'
import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm";

@Entity('supporters')
export class SupportersEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    hours: number;

    @Column()
    description: string;

    @Column()
    salary: number;

}

