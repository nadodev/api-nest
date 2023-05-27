import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dtos/userCreateDto';
import { UserEntity } from './interface/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

type ApiResponse = {
  msg: string;
  status: number;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async userCreate(userCreateDto: UserCreateDto): Promise<ApiResponse> {
    const salt = 10;
    const passwordHash = await hash(userCreateDto.password, salt);

    this.userRepository.save({
      ...userCreateDto,
      password: passwordHash,
    });

    return {
      msg: 'Usuário Salvo com Sucesso',
      status: 201,
    };
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
