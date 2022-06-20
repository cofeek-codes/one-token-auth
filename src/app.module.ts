import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		UserModule,
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'db',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),
		AuthModule,
	],
})
export class AppModule {}
