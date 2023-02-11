import { Body, Controller, Patch } from "@nestjs/common";
import { UserInfo } from "src/common/decorators/user.decorator";
import { UserMetadata } from "src/common/types/userMetadata";
import { StoreEducationalInstitutionDto } from "./educational-institutions.dto";
import { EducationalInstitutionsService } from "./educational-institutions.service";
import { EducationalInstitution } from "./entities/educational-institutions.entity";

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
}