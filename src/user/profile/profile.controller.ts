import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProfileUserService } from './profile.service';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/CreateUser';

@Controller('users')
export class ProfileUserController {
  constructor(private readonly userService: ProfileUserService) {}

  @Post('create')
  async Create(@Body() createUser: CreateUserDTO) {
    return this.userService.Create(createUser);
  }
  @Post('update')
  async Update(@Body() updateUser: UpdateUserDTO) {
    return this.userService.Update(updateUser);
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
