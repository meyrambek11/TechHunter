import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from "@nestjs/common";
import { UserInfo } from "src/common/decorators/user.decorator";
import { UserMetadata } from "src/common/types/userMetadata";
import { GetAllDocumentsQueryDto, TeacherDocumentStoreDto } from "./teacher-documents.dto";
import { TeacherDocumentsService } from "./services/teacher-documents.service";
import { TeacherDocument } from "./entities/teacher-documents.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guards";

@UseGuards(JwtAuthGuard)
@Controller('documents')
export class TeacherDocumentsController{
    constructor(private teacherDocumentsService: TeacherDocumentsService) {}

    @Post()
    store(
        @Body() payload: TeacherDocumentStoreDto,
        @UserInfo() user: UserMetadata
    ): Promise<TeacherDocument>{
        return this.teacherDocumentsService.store(payload, user);
    }

    @Get()
    getAll(@Query() query: GetAllDocumentsQueryDto){
        return this.teacherDocumentsService.getAll(query);
    }

    @Get(':id')
    getOne(
        @UserInfo() user: UserMetadata,
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<TeacherDocument>{
        return this.teacherDocumentsService.getOne(id, user);
    }

}