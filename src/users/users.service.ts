import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(users)
    private usersRepository: Repository<users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<users> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { userId: id } });
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne({
      where: { username },
      select: ['userId', 'username', 'email', 'firstName', 'lastName', 'password', 'isActive', 'createdBy', 'refreshToken']
    });
  }
  
  findById(id: number) {
    return this.usersRepository.findOne({
      where: { userId: id },
      select: ['userId', 'username', 'email', 'firstName', 'lastName', 'isActive', 'refreshToken']
    });
  }
  
  async saveRefreshToken(userId: number, refreshToken: string) {
    await this.usersRepository.update(userId, { refreshToken });
    return true;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }
  
  async removeRefreshToken(userId: number) {
    await this.usersRepository.update(userId, { refreshToken: '' });
    return true;
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
