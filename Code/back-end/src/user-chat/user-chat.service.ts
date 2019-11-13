import { Injectable, HttpException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserChatEntity } from './user-chat.entity'
import {  UserEntity } from "../user/user.entity";
import { Repository } from 'typeorm';



@Injectable()
export class UserChatService {

    constructor(
        @InjectRepository(UserChatEntity)
        private userChatRepository: Repository<UserChatEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ){}

    public async getAllUserCommmand()
    {        
        return await this.userChatRepository.find({ relations: ["user", "chat"] });
    }

    public async getChatByUser(userID: any)//OrderBy TODO
    {
        let res = await this.userChatRepository.find({where: {user:userID}, relations: ["user"]})
        // if (res.length <1){ throw 'This user doesnt have chats.';}
        console.log(res.length);
        return res;
    }

    public async editUserChat(EditedUserChat: UserChatEntity, id)
    {
        let res;
        let err;
        let userChats = await this.userChatRepository.findOne({id: id});
        try {
            if (userChats == null) { throw 'this userChat doesnt exist';}
            res = await this.userChatRepository.update(userChats,EditedUserChat);
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

    public async deleteChat(id)
    {
        let res;
        let err;
        let chat = await this.userChatRepository.findOne({id:id});

        try {
            if (chat != null) {
                res = await this.userChatRepository.delete({id:id});
                console.log(res);                
            } else {
                throw "userChat doesnt exist";
                
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

    public async createUserChat(userid: number)
    {
        let res;
        let err;
        let today = new Date();
        let NewUserChat = new UserChatEntity();
      
        try {            
            let user = await this.userRepository.findOne({id:userid});
            NewUserChat.user = user;
            NewUserChat.registerDate = today;
            res = await this.userChatRepository.insert(NewUserChat);

        } catch (error) {
            console.log(error);
            err = error;                 
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: NewUserChat.id,
                userid: NewUserChat.user.id
            }
        );
    }
}
