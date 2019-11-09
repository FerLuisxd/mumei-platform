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
import { SupportersEntity } from './supporters.entity';
import { SupportersService } from './supporters.service';

@Controller('supporters')
export class SupportersController {
    constructor(private supportersService: SupportersService) { }

    @Get()
    public async getAllSupporters(@Res() res) {
        console.log("Entre");
        const supporters = await this.supportersService.getAllSupporters();
        res.status(HttpStatus.OK).json(supporters);
    }

    @Get(':id')
    public async getSupporters(@Res() res, @Param('id') id) {
        const supporters = await this.supportersService.getSupportersById(id);
        res.status(HttpStatus.OK).json(supporters);

    }

    @Post()
    public async createSupporters(@Res() res, @Body() newSupporters: SupportersEntity) {
        const result = await this.supportersService.createSupporters(newSupporters);
        res.status(HttpStatus.CREATED).json(result);
    }

    @Put(':id')
    public async updateSupporters(@Res() res, @Body() updatedSupporters: SupportersEntity, @Param('id') id) {
        const result = await this.supportersService.editSupporters(updatedSupporters, id);
        res.status(HttpStatus.ACCEPTED).json(result);
    }

    @Delete(':id')
    public async deleteSupporters(@Res() res, @Param('id') id) {
        const result = await this.supportersService.deleteSupporters(id);
        res.status(HttpStatus.ACCEPTED).json(result);

    }
}
