import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/decorators/user/user.decorator';
import { SigninDto, SignupDto } from 'src/dtos/user/auth.dto';
import { UserInfo } from 'src/types/user/auth.type';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('signup')
    signup(@Body() body: SignupDto): Promise<{ token: string }>{
        return this.authService.signup(body)
    }

    @Post('signin')
    signin(@Body() body: SigninDto): Promise<{ token: string }>{
        return this.authService.signin(body)
    }

    @Get('me')
    me(@User() user: UserInfo): { user: UserInfo }{
        return { user }
    }
}
