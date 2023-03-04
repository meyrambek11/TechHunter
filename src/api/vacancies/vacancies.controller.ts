import { Body, Controller, Post } from "@nestjs/common";
import { StoreVacancyDto } from "./vacancies.dto";
import { VacancyService } from "./vacancies.service";
import { UserInfo } from "src/common/decorators/user.decorator";
import { UserMetadata } from "src/common/types/userMetadata";

@Controller()
export class VacancyController{
    constructor(private vacancyService: VacancyService) {}

    @Post()
    store(
        @Body() payload: StoreVacancyDto,
        @UserInfo() user: UserMetadata
    ){
        return this.vacancyService.store(user, payload);
    }
}