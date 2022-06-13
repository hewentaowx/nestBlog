import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({ example: 1, description: 'id为1的用户', required: true })
  @IsNotEmpty({ message: '用户id为必传' })
  id: number
}
