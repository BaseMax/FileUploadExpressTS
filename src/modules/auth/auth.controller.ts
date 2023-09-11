import { Body, HttpCode, JsonController, Post, Res } from 'routing-controllers';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthService } from './auth.service';
import { Service } from 'typedi';
import { RegisterUserDto } from './dto/registerUser.dto';
import { Response } from 'express';
import { authConfig } from '../../config';

@Service()
@JsonController('/auth')
export class AuthController {
  private readonly cookieOptions = {
    maxAge: +authConfig.cookie.maxAge,
    httpOnly: true
  };

  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { token, user } = await this.authService.login(loginUserDto);

    res.cookie('token', token, this.cookieOptions);

    return res.status(200).json({ token, user });
  }

  @Post('/register')
  @HttpCode(201)
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('/logout')
  @HttpCode(200)
  logout(@Res() res: Response) {
    res.clearCookie('token', { httpOnly: true });
    return { message: 'User logged out successfully' };
  }
}
