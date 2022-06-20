import * as bcrypt from 'bcryptjs'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'

import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

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
	async login() {}
	async generateToken(user: User) {
		const payload = { id: user.id, name: user.name, email: user.email }
		return this.jwtService.sign(payload)
	}
}
