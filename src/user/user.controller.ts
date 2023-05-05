import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/decorators/param-id-decorator";

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getOne(@ParamId('id', ParseIntPipe) id: number) {
    console.log({ id });
    return this.userService.getOne(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId('id', ParseIntPipe) id) {
    return this.userService.update(id, data);
  };

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId('id', ParseIntPipe) id) {
    return this.userService.updatePartial(id, data);
  };

  @Delete(':id')
  async delete(@ParamId('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}