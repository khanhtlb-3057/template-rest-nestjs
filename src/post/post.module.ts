import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { MailJobModule } from '../jobs/mail-job/mail-job.module';
import { CaslModule } from '../casl/casl.module';
import { PdfModule } from '../pdfs/pdf.module';
import { PdfService } from '../pdfs/pdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    MailJobModule,
    CaslModule,
    PdfModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, PdfService],
})
export class PostModule {}
