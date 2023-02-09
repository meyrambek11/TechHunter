import { Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { TeachersService } from "./services/teachers.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guards";
import { UserInfo } from "src/common/decorators/user.decorator";
import { UserMetadata } from "src/common/types/userMetadata";
import { Body } from "@nestjs/common/decorators";
import { StoreTeacherDto } from "./teachers.dto";
import { Teacher } from "./entities/teachers.entity";

@UseGuards(JwtAuthGuard)
@Controller('teacher')
export class TeachersController{
    constructor(private teachersService: TeachersService){}

    @Patch()
    update(@UserInfo() user: UserMetadata, @Body() payload: StoreTeacherDto): Promise<Teacher>{
        return this.teachersService.update(user, payload);
    }
}