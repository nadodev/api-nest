import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dtos/userCreateDto';
import { UserService } from './user.service';
import { UserEntity } from './interface/user.entity';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async userCreate(@Body() userCreate: UserCreateDto) {
    return this.userService.userCreate(userCreate);
  }
}
