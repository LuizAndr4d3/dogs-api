export class CreateDogDto {
    name: string;
    age: number;
    breed: string;
}

export class UpdateDogDto {
    name?: string;
    age?: number;
    breed?: string;
}