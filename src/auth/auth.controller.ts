import { Controller, Request, Post, UseGuards, Get, Body, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

// เพิ่ม interface สำหรับรับข้อมูล login
interface LoginDto {
  username: string;
  password: string;
}

// เพิ่ม interface สำหรับรับ refresh token
interface RefreshTokenDto {
  refresh_token: string;
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
  getProfile(@Request() req, @Res({ passthrough: true }) res: Response) {
    // ตรวจสอบว่ามี token ใหม่ใน header หรือไม่
    const newToken = res.getHeader('X-New-Access-Token');
    if (newToken) {
      // ถ้ามี token ใหม่ ให้ส่งกลับไปให้ client ด้วย
      return {
        ...req.user,
        new_access_token: newToken
      };
    }
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refreshTokenByToken(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      // เรียกใช้ refreshTokenByToken จาก AuthService
      return await this.authService.refreshTokenByToken(refreshTokenDto.refresh_token);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    // เรียกใช้ logout จาก AuthService
    await this.authService.logout(req.user.userId);
    return { message: 'Logout successful' };
  }
}
