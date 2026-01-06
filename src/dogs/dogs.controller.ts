import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { DogsService } from './dogs.services';
import { CreateDogDto, UpdateDogDto } from './dogs.dtos';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { v4 as uuidv4 } from 'uuid';

@Controller('dogs')
export class DogsController {

    constructor(private dogsService: DogsService) {}

    @UseGuards(JwtAuthGuard)
    @Post("create")
    async createDog(@Body() dog: CreateDogDto) {
        return await this.dogsService.create({id: uuidv4(), name: dog.name, age: dog.age, breed: dog.breed});
    }

    @Get("get/:id")
    async getDog(@Param("id") id: string) {
        return await this.dogsService.findDog(id);
    }

    @Get("getall")
    async getAllDogs(){
        return await this.dogsService.findAllDogs();
    }

    @UseGuards(JwtAuthGuard)
    @Put("edit/:id")
    async editDog(@Param("id") id: string, @Body() dog: UpdateDogDto){
        return await this.dogsService.update(id, {id: id, name: dog.name ?? '', age: dog.age ?? 0, breed: dog.breed ?? ''});
    }

    @UseGuards(JwtAuthGuard)
    @Delete("delete/:id")
    async deleteDog(@Param("id") id: string){
        return await this.dogsService.delete(id);
    }
}