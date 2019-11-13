import {
    Controller,
    Res,
    Get,
    Param,
    HttpStatus,
    Body,
    Put,
    Post,
    Delete,
    Req,
  } from '@nestjs/common';
  import { UserChatService } from './user-chat.service';
  import { UserChatEntity } from "./user-chat.entity";

@Controller('user-chat')
export class UserChatController {
    constructor(private userChatService: UserChatService){}

    @Get()
    public async getAllUserChats(@Res() res, @Req() req){
        const userChats = await this.userChatService.getAllUserCommmand();
        console.log(req.payload);
        
        
        res.status(HttpStatus.OK).json(userChats);
    } 

    @Get(':userid')
    public async getChatsByUserID(@Res() res, @Param('userid') userid){
        const userChats = await this.userChatService.getChatByUser(userid);
        res.status(HttpStatus.OK).json(userChats);
    }

    @Put(':id')
    public async updateChat(@Res() res, @Body() updatedUserChat : UserChatEntity, @Param('id') id)
    {
        const result = await this.userChatService.editUserChat(updatedUserChat,id);
        res.status(HttpStatus.ACCEPTED).json(result);
    } 
    












}
