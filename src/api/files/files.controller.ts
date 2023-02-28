import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import { FilesService } from "./files.service";

@Controller('file')
export class FilesController{
    constructor(private fileService: FilesService){}

    @Post()
    @UseInterceptors(FilesInterceptor('file'))
    upload(@UploadedFiles() file: Express.Multer.File): Promise<{url: string}>{
        return this.fileService.upload(file[0]);
    }
}