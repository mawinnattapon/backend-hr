import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

// เพิ่ม interface สำหรับรับข้อมูล login
interface LoginDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // เรียกใช้ validateUser ก่อนแล้วจึงเรียก login
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      return { statusCode: 401, message: 'Unauthorized' };
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
