import { IsEmail, MinLength, IsString } from "class-validator";


export class RegisterManegerDtp {
    @IsString()
    name: string;

    @IsEmail()
    email: string

    @IsString()
    @MinLength(6)
    password: string;
};