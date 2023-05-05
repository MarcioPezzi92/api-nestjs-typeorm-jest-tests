import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";


@Module({
  imports: [
    JwtModule.register({ secret: "vLqV5m[@BfYKH(J;^3#)epkn>g,RwTAs" }),
    UserModule,
    PrismaModule
  ],
  controllers: [AuthController]
})
export class AuthModule {

}