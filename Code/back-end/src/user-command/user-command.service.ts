import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCommandEntity } from './user-command.entity'
import {  UserEntity } from "../user/user.entity";
import {  CommandEntity } from "../command/command.entity";
import { Repository } from 'typeorm';

const DB = require('better-sqlite3-helper');


@Injectable()
export class UserCommandService {

    constructor(
        @InjectRepository(UserCommandEntity)
        private userCommandRepository: Repository<UserCommandEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(CommandEntity)
        private commandRepository: Repository<CommandEntity>,
    ){}

    public async getAllUserCommmand()
    {
        return await this.userCommandRepository.find();
    }

    public async getCommandByUser(userID: any)
    {
        let res = await this.userCommandRepository.find({user:userID});
        if (res == null){ throw 'This user doesnt have commands.'}
        return res;
    }

    public async editUserCommand(EditedUserCommand: UserCommandEntity, id)
    {
        let res;
        let err;
        let userCommands = await this.userCommandRepository.findOne({id: id});
        try {
            if (userCommands == null) { throw 'this userCommand doesnt exist';}
            res = await this.userCommandRepository.update(userCommands,EditedUserCommand);
        } catch (error) {
            err = error;
            console.log(err);
            throw err;
        }

        return (
            err || {
                message: 'Updated',
                Updated: true,
                id: res.id,
            }

        )

    }

    public async deleteCommand(id)
    {
        let res;
        let err;
        let command = await this.userCommandRepository.findOne({id:id});

        try {
            if (command != null) {
                res = await this.userCommandRepository.delete({id:id});
                console.log(res);                
            } else {
                throw "Command doesnt exist";
                
            }
        } catch (error) {
            err = error;
            console.log(err);
            throw err;            
        }

        return (
            err || {
                message: "Eliminated",
                Eliminated: true,
                id: id,
            }
        );
    }

    public async createUserCommand(NewUserCommand : UserCommandEntity, userid, commandid)
    {
        let res;
        let err;
        let users = await this.userRepository.findOne({id: userid});
        let commands = await this.commandRepository.findOne({id: commandid});
        try {
            if (users == null) {throw 'userid doesnt exist';}
            if (commands == null) {throw 'commandid doesnt exist';}
            NewUserCommand.command = commands;
            NewUserCommand.user = users;
            res = await this.userCommandRepository.insert(NewUserCommand);

        } catch (error) {
            console.log(error);
            err = error;                 
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: NewUserCommand.id,
                userid: NewUserCommand.user.id,
                commandid: NewUserCommand.command.id,
            }
        );
    }
}
