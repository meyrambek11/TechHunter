import { Controller } from "@nestjs/common";
import { TeachersService } from "./services/teachers.service";

@Controller()
export class TeachersController{
    constructor(private teachersService: TeachersService){}
}