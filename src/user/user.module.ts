import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { ProfileUserController } from './profile/profile.controller';
import { ProfileUserService } from './profile/profile.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './authentication/jwt.strategy';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DrizzleModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('SECRETKEY', 'fallback_secret'),
        signOptions: { expiresIn: config.get<string>('EXPIRESIN', '1h') },
      }),
    }),
  ],
  controllers: [ProfileUserController, AuthenticationController],
  providers: [
    ProfileUserService,
    AuthenticationService,
    JwtStrategy,
    UserService,
  ],
  exports: [PassportModule, JwtModule],
})
export class UserModule {}
