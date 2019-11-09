import { Entity, Column, ManyToOne, PrimaryColumn} from "typeorm";
import { UserEntity } from "../user/user.entity";
import { CommandEntity } from "../command/command.entity";

@Entity('userCommand')
export class UserCommandEntity {

    @ManyToOne(type=>UserEntity, user => user.userCommand, {primary: true})
    user:UserEntity;
    
    @ManyToOne(type => CommandEntity, command => command.userCommand, {primary: true})
    command:CommandEntity;    

    @Column('datetime')
    registerDate: Date

    @Column({nullable: true, type: 'datetime'})
    deletedDate: Date

}

