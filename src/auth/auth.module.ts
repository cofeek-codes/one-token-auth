import { User } from 'src/user/entities/user.entity'
import { UserModule } from 'src/user/user.module'

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			secret: 'secret',
			signOptions: {
				expiresIn: '24h',
			},
		}),
		TypeOrmModule.forFeature([User]),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
