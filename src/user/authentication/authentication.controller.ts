import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginUserDTO } from '../dtos/Login';
import { AuthenticationService } from './authentication.service';
import { CreateUserDTO } from '../dtos/Create';
import { UserService } from '../user.service';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from '../../decorator/current.user.decorator';
import type { JwtPayload } from '../../interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
  ) {}
  @Post('/login')
  login(@Body() inputs: LoginUserDTO) {
    return this.authenticationService.SignIn(inputs);
  }
  @Post('/logout')
  logout() {
    return;
  }
  @Post('/register')
  register(@Body() user: CreateUserDTO) {
    return this.userService.CreateUser(user);
  }
  @UseGuards(AuthGuard)
  @Get('info')
  @UseInterceptors(ClassSerializerInterceptor)
  info(@CurrentUser() user: JwtPayload) {
    return this.userService.FindByEmail(user.email);
  }
}
