import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string | number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async find(options: any, withPassword = false): Promise<User> | null {
    const user = await this.userRepository.findOne(options);
    if (!user) {
      return;
    }
    if (!withPassword) {
      delete user.password;
    }
    return user;
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const newUser = await this.userRepository.create({ name, email, password });
    const result = await this.userRepository.save(newUser);
    return result;
  }

  async updateUser(id: string | number, properties: any) {
    const user = await this.findById(id);
    console.log(properties);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    try {
      const updatedUser = await this.userRepository.save({
        ...user,
        ...properties,
      });
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
