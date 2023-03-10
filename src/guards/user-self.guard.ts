import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class UserSelfGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        if (String(req.user.id) !== req.params.id) {
            throw new UnauthorizedException({
                message: "Ruxsat etilmagan foydalanuvchi"
            })
        }
        return true;
    }
}