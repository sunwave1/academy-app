import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDTO } from '../dtos/Update';
import { UserService } from '../user.service';
import { AuthGuard } from '../authentication/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
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
