import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UpdateUserDTO } from '../dtos/Update';
import { UserService } from '../user.service';

@Controller('users')
export class ProfileUserController {
  constructor(private readonly userService: UserService) {}

  @Post('update')
  async Update(@Body() updateUser: UpdateUserDTO) {
    return this.userService.Update(updateUser);
  }
  @Delete('/delete')
  async Delete(@Param('id') id: number) {
    return this.userService.Delete(id);
  }
}
