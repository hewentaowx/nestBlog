import { Body, Controller, Get, Query, Post, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';

@Controller('user')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 创建新用户
   * @param {Object} user 具体参数见CreateUserDto
   * @returns {Object}
   */
  @Post('addUser')
  @ApiOperation({ summary: '新增用户', description: '新增用户' })
  @ApiBody({ type: CreateUserDto, description: '参数如下' })
  @ApiResponse({ status: 200, description: '新增用户成功' })
  async addUser(@Body() user: CreateUserDto) {
    return await this.usersService.addUser(user);
  }

  /**
   * 获取用户列表
   * @param {Number} query.page 页码
   * @param {Number} query.size 一页数量
   * @returns {Object} { list: [], count: 0 }
   */
  @Get('userList')
  @ApiOperation({ summary: '查找全部用户', description: '查找全部用户' })
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'size', required: true })
  async getUserList(@Query() query) {
    return await this.usersService.getUserList(query);
  }

  /**
   * 获取单个用户信息
   * @param {Number} query.id 用户id
   * @returns {Object}
   */
  @Get('userInfo')
  @ApiOperation({ summary: '查找单个用户', description: '查找单个用户' })
  @ApiQuery({ name: 'id', required: true })
  async getUserInfo(@Query() query) {
    return await this.usersService.getUserInfo(query);
  }

  /**
   * 更新用户信息
   * @param {Object} body 具体见UpdateUserDto
   * @returns
   */
  @Post('editUser')
  @ApiOperation({ summary: '更新用户信息', description: '更新用户信息' })
  @ApiBody({ type: UpdateUserDto, description: '参数如下' })
  async editUser(@Body() body: UpdateUserDto) {
    return await this.usersService.editUser(body);
  }

  /**
   * 删除用户
   * @param
   */
  @Post('delUser')
  @ApiOperation({ summary: '利用id删除用户', description: '利用id删除用户' })
  @ApiBody({ type: DeleteUserDto, description: '请传入删除用户id' })
  @ApiResponse({ status: 200, description: '删除用户成功' })
  async delUserById(@Body() body: DeleteUserDto) {
    return await this.usersService.deleteUserById(body);
  }
}
