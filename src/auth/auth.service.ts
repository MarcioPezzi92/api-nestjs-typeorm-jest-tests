import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { UserEntity } from "../user/entity/user.entity";

@Injectable()
export class AuthService {

  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) { }

  createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: "7 days",
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience
        })
    }
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience
      });

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({email});

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException("Email e/ou senha incorretos.");
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOneBy({email});

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    const token = this.jwtService.sign({
      id: user.id
    },
    {
      expiresIn: "30 minutes",
      subject: String(user.id),
      issuer: 'forget',
      audience: 'users'
    });

    console.log(token);

    await this.mailer.sendMail({
      subject: "Recuperação de senha",
      to: 'marciopezzi92@gmail.com',
      template: 'forget',
      context: {
        name: user.name,
        token
      }
    });

    return true;
  }

  async reset(password: string, token: string) {

    try {
      const { id } = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: 'users'
      });

      if(isNaN(id)) throw new BadRequestException("Token inválido.");

      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);

      await this.usersRepository.update(Number(id), { password });

      const user = await this.userService.getOne(Number(id));
    
      return this.createToken(user);

    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(data: AuthRegisterDTO) {

    // Prevents a malicious user from passing 'Role': admin
    delete data.role;

    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}