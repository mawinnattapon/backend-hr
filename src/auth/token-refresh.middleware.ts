import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class TokenRefreshMiddleware implements NestMiddleware {
  private jwtService: JwtService;
  private authService: AuthService;
  
  constructor(private moduleRef: ModuleRef) {
    // เราจะใช้ moduleRef เพื่อเข้าถึง services ในภายหลัง
  }
  
  // เรียกใช้เมื่อ middleware ถูกสร้าง
  onModuleInit() {
    this.jwtService = this.moduleRef.get(JwtService);
    this.authService = this.moduleRef.get(AuthService);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // ตรวจสอบว่า services ถูกโหลดหรือยัง
      if (!this.jwtService || !this.authService) {
        this.jwtService = this.moduleRef.get(JwtService, { strict: false });
        this.authService = this.moduleRef.get(AuthService, { strict: false });
      }
      
      // ตรวจสอบว่ามี Authorization header หรือไม่
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        
        try {
          // ตรวจสอบ token
          const payload = this.jwtService.verify(token, {
            secret: jwtConstants.secret,
          });
          
          // แนวคิด Sliding Expiration: ทุกครั้งที่มีการใช้งาน API ให้ต่ออายุ token ทันที
          if (payload) {
            // สร้าง token ใหม่
            const newToken = await this.authService.refreshToken(payload);
            
            // เพิ่ม token ใหม่ใน response header
            res.setHeader('Access-Control-Expose-Headers', 'X-New-Access-Token');
            res.setHeader('X-New-Access-Token', newToken.access_token);
          }
        } catch (error) {
          // ถ้า token ไม่ถูกต้องหรือหมดอายุ ไม่ต้องทำอะไร
          // ไคลเอนต์จะต้องจัดการ redirect ไปยังหน้า login
          console.log('Token verification error:', error.message);
        }
      }
    } catch (error) {
      console.error('Middleware error:', error);
    }
    
    next();
  }
}
