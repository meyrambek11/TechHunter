import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';

@UseGuards(JwtAuthGuard)
@Controller('file')
export class FilesController{
	constructor(private fileService: FilesService){}

    @Post()
    @UseInterceptors(FilesInterceptor('file'))
	upload(@UploadedFiles() file: Express.Multer.File): Promise<{url: string}>{
		return this.fileService.upload(file[0]);
	}
}