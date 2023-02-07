import { Controller } from "@nestjs/common";
import { TeachersService } from "./teachers.service";

@Controller()
export class TeachersController{
    constructor(private teachersService: TeachersService){}
}