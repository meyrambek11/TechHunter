import { Body, Controller, Get, Patch, Query, UseGuards } from "@nestjs/common";
import { UserInfo } from "src/common/decorators/user.decorator";
import { UserMetadata } from "src/common/types/userMetadata";
import { EducationalInstitutionQueryDto, StoreEducationalInstitutionDto } from "./educational-institutions.dto";
import { EducationalInstitutionsService } from "./services/educational-institutions.service";
import { EducationalInstitution } from "./entities/educational-institutions.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guards";

@UseGuards(JwtAuthGuard)
@Controller('educational-institution')
export class EducationalInstitutionsController{
    constructor(private educationalInstitutionsService: EducationalInstitutionsService){}

    @Patch()
    update(
        @Body() payload: StoreEducationalInstitutionDto, 
        @UserInfo() user: UserMetadata
    ): Promise<EducationalInstitution>{
        return this.educationalInstitutionsService.update(user, payload);
    }

    @Get()
    getAll(@Query() query: EducationalInstitutionQueryDto): Promise<EducationalInstitution[]>{
        return this.educationalInstitutionsService.getAll(query);
    }

    @Get('bought-teachers')
    getBoughtTeachers(@UserInfo() user: UserMetadata){
        
    }
}