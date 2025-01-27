import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { username, email, password } = body;

    //validate the input
    if (!username || !email || !password) {
      throw new Error('Missing name, email or password');
    }

    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const existingUsername = await this.userService.findByUsername(username);
    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    //create the user
    const user = await this.userService.createUser(body);

    return {
      message: 'User created successfully',
      user,
    };
  }
}
