import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { ProfileUserController } from './profile/profile.controller';
import { ProfileUserService } from './profile/profile.service';

@Module({
  imports: [DrizzleModule],
  controllers: [ProfileUserController],
  providers: [ProfileUserService],
})
export class UserModule {}
