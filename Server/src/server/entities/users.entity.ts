import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_user')
export class UsersEntity {
  @PrimaryGeneratedColumn({ comment: '主键id' })
  id: number;

  @Column({ length: 50, default: '', comment: '电话号码' })
  mobile: string;

  @Column({ length: 50, default: '', comment: '昵称' })
  nick_name: string;

  @Column({ type: 'text', default: '', comment: '个人描述' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '更新时间' })
  update_time: Date;
}
