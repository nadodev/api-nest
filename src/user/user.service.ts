import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interface/user.interface';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = 10;
    const passwordHash = await hash(createUserDto.password, salt);

    const user: User = {
      id: uuid(),
      ...createUserDto,
      password: passwordHash,
    };

    this.users.push(user);

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}
