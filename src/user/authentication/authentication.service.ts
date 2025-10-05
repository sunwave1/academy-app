import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDTO } from '../dtos/Login';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async SignIn(input: LoginUserDTO) {
    const user = await this.userService.FindByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordEqual: boolean = await compare(input.password, user.password);

    if (!passwordEqual) {
      throw new UnauthorizedException();
    }

    const authorization = this.jwtService.sign(
      {
        sub: user.id,
      },
      { expiresIn: process.env.EXPIRESIN ?? '2h' },
    );

    return {
      accessToken: authorization,
      user,
    };
  }
}
