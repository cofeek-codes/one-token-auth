import { Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDTO } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly UserRepository: Repository<User>
	) {}
	async getAllUsers() {
		return await this.UserRepository.find()
	}
	async createUser(userDTO: CreateUserDTO) {
		return await this.UserRepository.save(userDTO)
	}
	async getUserByEmail(email: string) {
		return await this.UserRepository.findOne({ where: { email: email } })
	}
}
