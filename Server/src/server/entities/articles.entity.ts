import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_article')
export class ArticlesEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 100 })
  title: string;

  @Column({ length: 50 })
  author: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
