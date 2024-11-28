import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { AppRequest } from '../types/token';

export const UserClaims = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AppRequest>();
    if (!request.user) throw new UnauthorizedException('Authorization required. Log in to gain access.');
    return request.user;
});
