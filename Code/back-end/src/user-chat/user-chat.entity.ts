import { Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinTable} from "typeorm";
import { UserEntity } from "../user/user.entity";
import { CommandEntity } from "../command/command.entity";

@Entity('userchat')
export class UserChatEntity {//a
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(type=>UserEntity, user => user.userChat,{onDelete: 'CASCADE'})
  //  @JoinTable()
    user:UserEntity;

    @Column()
    message:string;    

    @Column({nullable:true})
    problem:string;

    @Column('datetime')
    registerDate: Date

    @Column({nullable: true, type: 'datetime'})
    deletedDate: Date

}

