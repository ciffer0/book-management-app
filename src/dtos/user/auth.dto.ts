import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    firstName?: string;
    
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    lastName?: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    password: string;
}

export class SigninDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
