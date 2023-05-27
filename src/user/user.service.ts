import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dtos/userCreateDto';
import { User } from './interface/user.interface';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';

type ApiResponse = {
  msg: string;
  status: number;
};

@Injectable()
export class UserService {
  private users: User[] = [];

  async userCreate(userCreateDto: UserCreateDto): Promise<ApiResponse> {
    const salt = 10;
    const passwordHash = await hash(userCreateDto.password, salt);

    const user: User = {
      id: uuid(),
      ...userCreateDto,
      password: passwordHash,
    };

    this.users.push(user);

    return {
      msg: 'Usuário Salvo com Sucesso',
      status: 201,
    };
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}
