import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserInfo } from "src/types/user/auth.type";

export const User = createParamDecorator((data, context: ExecutionContext): UserInfo => {
    const request = context.switchToHttp().getRequest()
    return request.user
})