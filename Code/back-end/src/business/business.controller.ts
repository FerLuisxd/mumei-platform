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
import { BusinessEntity } from './business.entity';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
    constructor(private businessService: BusinessService) { }

    @Get()
    public async getAllBusiness(@Res() res) {
        console.log("Entre");
        const business = await this.businessService.getAllBusiness();
        res.status(HttpStatus.OK).json(business);
    }

    @Get(':id')
    public async getBusiness(@Res() res, @Param('id') id) {
        const business = await this.businessService.getBusinessById(id);
        res.status(HttpStatus.OK).json(business);

    }

    @Post()
    public async createBusiness(@Res() res, @Body() newBusiness: BusinessEntity) {
        const result = await this.businessService.createBusiness(newBusiness);
        res.status(HttpStatus.CREATED).json(result);
    }

    @Put(':id')
    public async updateBusiness(@Res() res, @Body() updatedBusiness: BusinessEntity, @Param('id') id) {
        const result = await this.businessService.editBusiness(updatedBusiness, id);
        res.status(HttpStatus.ACCEPTED).json(result);
    }

    @Delete(':id')
    public async deleteBusiness(@Res() res, @Param('id') id) {
        const result = await this.businessService.deleteBusiness(id);
        res.status(HttpStatus.ACCEPTED).json(result);

    }
}
