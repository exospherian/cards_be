import { 
	ExtractJwt, 
	Strategy,
} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../JWT/constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor () {
		super({
			jwtFromRequest   : ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration : false,
			secretOrKey      : jwtConstants.secret,
		});
	}

	validate (payload: any): { userId: string } {
		return { userId: payload.id };
	};
}