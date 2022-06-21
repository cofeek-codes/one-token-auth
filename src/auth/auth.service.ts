import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'

import { LoginDTO } from './dto/login.dto'
import { RegisterDTO } from './dto/register.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly UserService: UserService,
		private readonly jwtService: JwtService
	) {}
	async register(dto: RegisterDTO) {
		const isAlreadyRegistered = await this.UserService.getUserByEmail(dto.email)
		if (isAlreadyRegistered)
			throw new BadRequestException(
				'user with this email is already registered'
			)
		const hashPassword = await bcrypt.hash(dto.password, 11)
		const user = await this.UserService.createUser({
			...dto,
			password: hashPassword,
		})
		const token = await this.generateToken(user)
		return { user, token }
	}
	async login(dto: LoginDTO) {
		const user = await this.validateUser(dto)
		return await this.generateToken(user)
	}
	async generateToken(user: User) {
		const payload = { id: user.id, name: user.name, email: user.email }
		return this.jwtService.sign(payload)
	}
	async validateUser(dto: LoginDTO) {
		const user = await this.UserService.getUserByEmail(dto.email)
		if (!user)
			throw new UnauthorizedException(
				'email is invalid or you are not registered'
			)
		const isValidPassword = await bcrypt.compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('invalid password')
		return user
	}
}
