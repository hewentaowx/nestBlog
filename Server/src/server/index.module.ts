import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesEntity } from './entities/articles.entity';
import { ArticlesController } from './controllers/articles.controller';
import { ArticlesService } from './services/articles.service';
import { UsersEntity } from './entities/users.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticlesEntity,
      UsersEntity
    ])
  ],
  controllers: [
    ArticlesController,
    UsersController,
  ],
  providers: [
    ArticlesService,
    UsersService,
  ],
})
export class IndexModule {}

