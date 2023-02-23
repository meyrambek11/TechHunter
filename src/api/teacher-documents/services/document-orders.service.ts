import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Currency } from "src/api/references/entities/currencies.entity";
import { User } from "src/api/users/users.entity";
import { DataSource, Repository } from "typeorm";
import { DocumentOrder } from "../entities/document-orders.entity";
import { TeacherDocument } from "../entities/teacher-documents.entity";

@Injectable()
export class DocumentOrdersService{
    constructor(
        @InjectRepository(DocumentOrder)
        private documentOrderRepository: Repository<DocumentOrder>,
        @InjectDataSource() private dataSource: DataSource
    ){}

    async getOneByUserAndDocument(userId: string, documentId: string): Promise<DocumentOrder>{
        return await this.documentOrderRepository.findOne({
            where: {
                user: {id: userId},
                document: {id: documentId}
            }
        })
    }

    async store(payload: {user: User, document: TeacherDocument, price: number, currency: Currency}): Promise<{success: boolean}>{
        await this.dataSource.transaction(async manager => {
			await manager.save(DocumentOrder, {
				price: payload.price,
				currency: payload.currency,
				document: payload.document,
				user: payload.user
			});
		});
		return {success: true};
    }

    async getManyByUser(userId: string): Promise<DocumentOrder[]>{
        return await this.documentOrderRepository.find({
            where: {user: {id: userId}},
            select: ['document']
        })
    }
}