import { Injectable, NestMiddleware } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}
    use(req: any, res: any, next: () => void) {
        const token = req.headers.authorization;
        const decodedToken = this.jwtService.decode(token.replace('Bearer ', ''));
        req.user = decodedToken;
        next();
    }
}
