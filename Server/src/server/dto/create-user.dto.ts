import { IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Mike', description: '用户名', required: true })
  @IsNotEmpty({ message: '昵称不能为空' })
  nick_name: string;

  @ApiProperty({ example: '18677777777', description: '电话', required: true })
  @IsNotEmpty({ message: '电话号码不能为空' })
  mobile: string;

  @ApiProperty({ example: '个人描述', description: '个人描述', required: false })
  @IsOptional()
  @MinLength(5, {
    message: '个人描述最少不得小于5字'
  })
  @MaxLength(100, {
    message: '个人描述最多不能超过100字'
  })
  description: string;
}
