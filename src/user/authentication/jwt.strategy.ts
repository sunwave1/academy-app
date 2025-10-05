import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRETKEY ?? '',
    });
  }
  async validate(email: string): Promise<any> {
    const user = await this.userService.FindByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
