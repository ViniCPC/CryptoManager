import { IsEmail, MinLength, IsString } from "class-validator";


export class RegisterManegerDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string

    @IsString()
    @MinLength(6)
    password: string;
};