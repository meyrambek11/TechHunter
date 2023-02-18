import { Module } from '@nestjs/common';
import { TeacherBasketController } from './teacher-baskets.controller';
import { TeacherBasketService } from './teacher-baskets.service';

@Module({
	controllers: [TeacherBasketController],
	providers: [TeacherBasketService]
})
export class TeachersBasketModule {}
