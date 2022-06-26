import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly JwtService: JwtService) {}
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest()
		try {
			const authHeader = req.headers.authorization
			const bearer = authHeader.split('')[0]
			const token = authHeader.split('')[1]
			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException('Unauthorized User')
			}
			const user = this.JwtService.verify(token)
			req.user = user
			return true
		} catch (error) {
			console.log(error)
			throw new UnauthorizedException('Unauthorized User')
		}
	}
}
