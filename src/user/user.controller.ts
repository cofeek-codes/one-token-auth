import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'

import { CreateUserDTO } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}
	@UseGuards(AuthGuard)
	@Get()
	async getAllUsers() {
		return await this.userService.getAllUsers()
	}
	@Post('/n')
	async createUser(@Body() user: CreateUserDTO) {
		return await this.userService.createUser(user)
	}
}
