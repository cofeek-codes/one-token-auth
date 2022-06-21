import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login.dto'
import { RegisterDTO } from './dto/register.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly AuthService: AuthService) {}
	@Post('/register')
	async register(@Body() dto: RegisterDTO) {
		return await this.AuthService.register(dto)
	}
	@Post('/login')
	async login(@Body() dto: LoginDTO) {
		return await this.AuthService.login(dto)
	}
}
