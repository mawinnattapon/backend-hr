import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class TokenRefreshInterceptor implements NestInterceptor {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    
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
    
    // ดำเนินการต่อไปยัง handler ถัดไป
    return next.handle().pipe(
      tap(() => {
        // สามารถทำอะไรกับ response ได้ที่นี่ (หลังจาก handler ทำงานเสร็จ)
      }),
    );
  }
}
