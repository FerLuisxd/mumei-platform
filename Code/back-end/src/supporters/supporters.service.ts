import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportersEntity } from './supporters.entity';
const DB = require('better-sqlite3-helper');

@Injectable()
export class SupportersService {
    constructor(
        @InjectRepository(SupportersEntity)
        private supportersRepository: Repository<SupportersEntity>,
    ) { }

    public async getAllSupporters() {
        return await this.supportersRepository.find({ select: ['id', 'name', 'hours', 'description', 'salary'] });
    }

    public async getSupportersById(id: number) {
        let res = await this.supportersRepository.findOne({ id: id });
        // console.log(res);
        if (res == null) {
            throw 'Supporter doesnt exist';
        }

        return res;
    }

    public async createSupporters(NewSupporters: SupportersEntity) {
        let res;
        let err;
        try {
            res = await this.supportersRepository.insert(NewSupporters);
            // console.log(res);

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

    public async editSupporters(EditedSupporters: SupportersEntity, id) {
        let res;
        let err;
        let supporters = await this.supportersRepository.findOne({ id: id });
        try {
            if (supporters != null) {
                console.log(EditedSupporters);
                res = await this.supportersRepository.update(supporters, EditedSupporters);
                // console.log(res);
            }

            else {
                throw 'Supporter doesnt exist';
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

    public async deleteSupporters(id) {
        let res;
        let err;
        let supporters = await this.supportersRepository.findOne({ id: id });

        try {
            if (supporters != null) {
                res = await this.supportersRepository.delete({ id: id });
                // console.log(res);
            } else {
                throw "Supporter doesnt exist";

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
