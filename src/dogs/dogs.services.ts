import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from './dogs.interface';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

@Injectable()
export class DogsService {
    private readonly dataFilePath = join(process.cwd(), 'dogs.json');

    private async readDataFile(): Promise<Dog[]> {
        try {
            if (!existsSync(this.dataFilePath)) {
                return [];
            }

            const fileContent = await readFile(this.dataFilePath, 'utf-8');
            
            if (!fileContent.trim()) {
                return [];
            }

            const data = JSON.parse(fileContent);
            
            return Array.isArray(data) ? data : [];
        } catch (error) {
            if (error instanceof SyntaxError) {
                return [];
            }
            throw error;
        }
    }

    private async writeDataFile(dogs: Dog[]): Promise<void> {
        try {
            const jsonString = JSON.stringify(dogs, null, 2);
            
            await writeFile(this.dataFilePath, jsonString, 'utf-8');
        } catch (error) {
            throw error;
        }
    }

    async create(dog: Dog): Promise<Dog> {
        try {
            const dogs = await this.readDataFile();
            
            dogs.push(dog);
            
            await this.writeDataFile(dogs);
            
            return dog;
        } catch (error) {
            throw error;
        }
    }

    async findDog(id: string): Promise<Dog> {
        try {
            const dogs = await this.readDataFile();
            
            const dog = dogs.find(d => d.id === id);
            
            if (!dog) {
                throw new NotFoundException('Dog not found');
            }
            
            return dog;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw error;
        }
    }

    async findAllDogs(): Promise<Dog[]> {
        try {
            return await this.readDataFile();
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updatedDog: Partial<Dog>): Promise<Dog> {
        try {
            const dogs = await this.readDataFile();
            
            const dogIndex = dogs.findIndex(d => d.id === id);
            
            if (dogIndex === -1) {
                throw new NotFoundException('Dog not found to update');
            }
            
            dogs[dogIndex] = {
                ...dogs[dogIndex],
                ...updatedDog,
                id: dogs[dogIndex].id,
            };
            
            await this.writeDataFile(dogs);
            
            return dogs[dogIndex];
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const dogs = await this.readDataFile();
            
            const dogIndex = dogs.findIndex(d => d.id === id);
            
            if (dogIndex === -1) {
                throw new NotFoundException('Dog not found');
            }
            
            dogs.splice(dogIndex, 1);
            
            await this.writeDataFile(dogs);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw error;
        }
    }
}
