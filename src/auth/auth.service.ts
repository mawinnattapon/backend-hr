
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findByUsername(username);
      if (user && (await bcrypt.compare(pass, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, firstName: user.firstName, lastName: user.lastName, userId: user.userId };
    
    // สร้าง access token และ refresh token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
    
    const refreshToken = this.jwtService.sign({ sub: user.userId }, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
    
    // บันทึก refresh token ลงในฐานข้อมูล
    await this.userService.saveRefreshToken(user.userId, refreshToken);
    
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(payload: any) {
    // สร้าง token ใหม่โดยใช้ payload เดิม (Sliding Expiration)
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
    
    // สร้าง refresh token ใหม่
    const refreshToken = this.jwtService.sign({ sub: payload.userId }, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
    
    // บันทึก refresh token ใหม่ลงในฐานข้อมูล
    await this.userService.saveRefreshToken(payload.userId, refreshToken);
    
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  
  async refreshTokenByToken(oldRefreshToken: string) {
    try {
      // ตรวจสอบ refresh token
      const payload = this.jwtService.verify(oldRefreshToken, {
        secret: process.env.JWT_SECRET,
      });
      
      // ค้นหาผู้ใช้จาก userId ใน payload
      const user = await this.userService.findById(payload.sub);
      
      // ตรวจสอบว่า refresh token ตรงกับที่เก็บในฐานข้อมูลหรือไม่
      if (!user || user.refreshToken !== oldRefreshToken) {
        throw new Error('Invalid refresh token');
      }
      
      // สร้าง payload สำหรับ token ใหม่
      const newPayload = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user.userId,
      };
      
      // สร้าง token ใหม่
      return this.refreshToken(newPayload);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
  
  async logout(userId: number) {
    // ลบ refresh token ออกจากฐานข้อมูล
    return this.userService.removeRefreshToken(userId);
  }
}
