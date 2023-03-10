import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from '@nestjs/jwt';
import { Observable } from "rxjs";
import { ROLE_KEY } from './../decorators/role-auth.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) { }
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLE_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (!requiredRoles) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException({
                message: "Foydalanuvchi avtorizatsiyadan o'tmangan"
            })
        }
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({
                message: "Foydalanuvchi avtorizatsiyadan o'tmangan"
            })
        }
        let user: any;
        try {
            user = this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException({
                message: "Foydalanuvchi avtorizatsiyadan o'tmangan"
            })
        }
        req.user = user;
        const permission = user.role.some((role: any) => requiredRoles.includes(role.value));
        if (!permission) {
            throw new ForbiddenException({
                message: "Sizga ruxsat etilmagan"
            })
        }
        return true;
    }
}