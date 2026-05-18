import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { signJwt } from './jwt';
import { findUser } from './users';

interface LoginDto {
  usernameOrEmail?: string;
  password?: string;
}

@Controller()
export class AuthController {
  // Full path = /api/auth/login (global prefix + no Kong strip).
  // This path is whitelisted in Kong (no jwt) — you can't log in with a token
  // you don't have yet.
  @Post('login')
  @HttpCode(200)
  login(@Body() body: LoginDto) {
    const user = findUser(body?.usernameOrEmail ?? '', body?.password ?? '');
    if (!user) throw new UnauthorizedException('invalid credentials');

    const access_token = signJwt({
      sub: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    });

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    };
  }
}
