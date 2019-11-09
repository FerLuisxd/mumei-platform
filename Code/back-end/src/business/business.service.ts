import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from './business.entity';
import { Repository } from 'typeorm';
const DB = require('better-sqlite3-helper');

@Injectable()
export class BusinessService {

    constructor(
        @InjectRepository(BusinessEntity)
        private businessRepository: Repository<BusinessEntity>,
    ) { }

    public async getAllBusiness() {
        return await this.businessRepository.find({ select: ['id', 'name', 'businessMinutes', 'startOfBusinessSub', 'endOfBusinessSub'] });
    }

    public async getBusinessById(id: number) {
        let res = await this.businessRepository.findOne({ id: id });
        console.log(res);
        if (res == null) {
            throw 'Business doesnt exist';
        }

        return res;
    }

    public async createBusiness(NewBusiness: BusinessEntity) {
        let res;
        let err;
        let names = await this.businessRepository.find({ name: NewBusiness.name });
        try {
            if (names.length > 0) {
                throw 'Name already on use';
            }
            res = await this.businessRepository.insert(NewBusiness);
            console.log(res);

        } catch (error) {
            console.log(error);
            err = error;
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: res.identifiers[0].id,
            }
        );
    }

    public async editBusiness(EditedBusiness: BusinessEntity, id) {
        let res;
        let err;
        let business = await this.businessRepository.findOne({ id: id });
        try {
            if (business != null) {
                console.log(EditedBusiness);
                res = await this.businessRepository.update(business, EditedBusiness);
                console.log(res);
            }

            else {
                throw 'Business doesnt exist';
            }

        } catch (e) {
            err = e;
            console.log(err);
            throw err;
        }

        return (
            err || {
                message: 'Updated',
                Updated: true,
                id: res.id,
            }
        );
    }

    public async deleteBusiness(id) {
        let res;
        let err;
        let business = await this.businessRepository.findOne({ id: id });

        try {
            if (business != null) {
                res = await this.businessRepository.delete({ id: id });
                console.log(res);
            } else {
                throw "Business doesnt exist";

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
}
