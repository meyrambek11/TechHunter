import { Module } from '@nestjs/common';
import { TeacherDocumentsController } from './teacher-documents.controller';
import { TeacherDocumentsService } from './services/teacher-documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherDocument } from './entities/teacher-documents.entity';
import { DocumentType } from './entities/document-types.entity';
import { DocumentCategory } from './entities/document-categories.entity';
import { TeachersModule } from '../teachers/teachers.module';
import { DocumentOrdersService } from './services/document-orders.service';

@Module({
    controllers: [TeacherDocumentsController],
    providers: [TeacherDocumentsService, DocumentOrdersService],
    imports: [
		TypeOrmModule.forFeature([
			TeacherDocument,
			DocumentType,
            DocumentCategory
		]),
		TeachersModule
	],
	exports: [TeacherDocumentsService, DocumentOrdersService]
})
export class TeacherDocumentsModule {}
