import { PrismaService } from "src/prisma/prisma.service";
import { RegisterManegerDtp } from "src/dto/register-manager.dto";
import { BadRequestException, Injectable} from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Role } from "generated/prisma/enums";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async RegiterManeger(dto: RegisterManegerDtp) {
        const emialExiste = await this.prisma.user.findUnique({
            where: {email: dto.email}
        })

        if(emialExiste) {
            throw new BadRequestException("Email já cádastrado")
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);;

        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                passwordHash,
                role: Role.MANAGER
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                role: true
            }
        })
        return user
    }
    
}