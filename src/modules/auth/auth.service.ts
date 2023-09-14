import { Service } from 'typedi';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from '../user/user.service';
import { BadRequestError, NotFoundError } from 'routing-controllers';
import { HashService } from '../../infrastructure/services/hash/hash.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { JwtService } from '../../infrastructure/services/jwt/jwt.service';

@Service()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);

    if (!user) throw new NotFoundError('User with this email was not found');

    const matchPassword = await this.hashService.compare(
      loginUserDto.password,
      user.password
    );

    if (!matchPassword)
      throw new BadRequestError('Login information is incorrect');

    const token = this.jwtService.sign({ id: user.id });

    return {
      token: token,
      user: {
        email: user.email
      }
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.userService.findByEmail(registerUserDto.email);

    if (user) throw new BadRequestError('email already registered in system!');

    const hashedPassword = await this.hashService.make(
      registerUserDto.password
    );

    await this.userService.create({
      email: registerUserDto.email,
      username: registerUserDto.username,
      password: hashedPassword
    });

    return { message: 'User registered successfully' };
  }
}
