import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ProfileUserService } from './profile.service';
import { CreateUserSchema, UpdateUserSchema } from '../../drizzle/schema';
import { ZodFilter } from '../../filters/user.filter';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/CreateUser';

@Controller('users')
export class ProfileUserController {
  constructor(private readonly userService: ProfileUserService) {}

  @Post('create')
  @UseFilters(ZodFilter)
  async Create(@Body() createUser: CreateUserDTO) {
    const parseUser = CreateUserSchema.parse(createUser);
    return this.userService.Create(parseUser);
  }
  @Post('update')
  async Update(@Body() updateUser: UpdateUserDTO) {
    const parseUser = UpdateUserSchema.parse(updateUser);
    return this.userService.Update(parseUser);
  }
  @Get(':id')
  async FindOne(@Param('id') id: number) {
    return this.userService.FindOne(id);
  }
  @Delete('/delete/:id')
  async Delete(@Param('id') id: number) {
    return this.userService.Delete(id);
  }
}
