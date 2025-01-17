import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { MailJobModule } from '../jobs/mail-job/mail-job.module';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), MailJobModule, CaslModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
