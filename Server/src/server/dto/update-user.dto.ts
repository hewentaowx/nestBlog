import { MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Mike', description: '用户昵称', required: false })
  @IsOptional()
  nick_name: string;

  @ApiProperty({ example: '18677777777', description: '电话号码', required: false })
  @IsOptional()
  @MaxLength(11, {
    message: '手机号码最多不能超过11位'
  })
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
