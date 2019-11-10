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
  import { UserCommandService } from './user-command.service';
  import { UserCommandEntity } from "./user-command.entity";
  import {  usercommandDTO} from "../dto/create.usercommand.dto";

@Controller('user-command')
export class UserCommandController {
    constructor(private userCommandService: UserCommandService){}

    @Get()
    public async getAllUserCommands(@Res() res){
        const userCommands = await this.userCommandService.getAllUserCommmand();
        res.status(HttpStatus.OK).json(userCommands);
    } 

    @Get(':userid')
    public async getCommandsByUserID(@Res() res, @Param('userid') userid){
        const userCommands = await this.userCommandService.getCommandByUser(userid);
        res.status(HttpStatus.OK).json(userCommands);
    }

    @Post()
    public async createUserCommand(@Res() res, @Body() newUserCommand : usercommandDTO){
        let newuc = new UserCommandEntity();
        newuc.deletedDate = newUserCommand.deletedDate;
        newuc.registerDate = newUserCommand.registerDate;      
        console.log(newUserCommand);
        const result = await this.userCommandService.createUserCommand(newuc,newUserCommand.userId,newUserCommand.commandId);
        res.status(HttpStatus.ACCEPTED).json(result);
    }

    @Put(':id')
    public async updateCommand(@Res() res, @Body() updatedUserCommand : UserCommandEntity, @Param('id') id)
    {
        const result = await this.userCommandService.editUserCommand(updatedUserCommand,id);
        res.status(HttpStatus.ACCEPTED).json(result);
    } 

    @Delete(':id')
    public async deleteCommand(@Res() res, @Param('id') id)
    {
        const result = await this.userCommandService.deleteCommand(id);
        res.status(HttpStatus.ACCEPTED).json(result);
        
    }
    












}
