import { } from '@nestjs/typeorm'
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('business')
export class BusinessEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    businessMinutes: number;

    @Column('datetime')
    startOfBusinessSub: Date;

    @Column('datetime')
    endOfBusinessSub: Date;

}

