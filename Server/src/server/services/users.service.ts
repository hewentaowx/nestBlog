import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { ApiExceptionFilter } from '../../common/filters/api-exception.filter';
import { ApiCode } from '../../common/enums/apiCode.enum';

export interface UsersList {
  list: UsersEntity[];
  count: number;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  // 创建用户
  async addUser(body: Partial<UsersEntity>): Promise<UsersEntity> {
    const { nick_name } = body;
    if (!nick_name) {
      throw new ApiExceptionFilter('缺少昵称', ApiCode.BUSINESS_ERROR);
    }
    const userInfo = await this.usersRepository.findOne({
      where: { nick_name },
    });
    if (userInfo) {
      throw new ApiExceptionFilter('该昵称已存在', ApiCode.BUSINESS_ERROR);
    }
    return await this.usersRepository.save(body);
  }

  // 获取用户列表
  async getUserList(query): Promise<UsersList> {
    const { page = 1, size = 10 } = query;
    const result = await this.usersRepository.findAndCount({
      where: {},
      skip: (Number(page) - 1) * size,
      take: size,
      cache: true
    });
    const [list, count] = result;
    return { list, count }
  }

  // 获取指定用户
  async getUserInfo(query): Promise<UsersEntity> {
    const { id } = query;
    return await this.usersRepository.findOne({
      where: { id }
    });
  }

  // 更新用户信息
  async editUser(user): Promise<UsersEntity> {
    const { id, ...params } = user;
    const existUser = await this.usersRepository.findOne({
      where: { id }
    });
    if (!existUser) {
      throw new HttpException(`id为${id}的用户不存在`, 401);
    }
    const updateUser = this.usersRepository.merge(existUser, params);
    return this.usersRepository.save(updateUser);
  }

  // 刪除用户
  async deleteUserById(body) {
    const existPost = await this.usersRepository.findOne({
      where: { id: body.id }
    });
    if (!existPost) {
      throw new HttpException(`id为${body.id}的用户不存在`, 401);
    }
    return await this.usersRepository.remove(existPost);
  }
}
