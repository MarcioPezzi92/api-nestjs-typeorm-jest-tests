import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

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
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOne(id);
  }

  @Put(':userId')
  async update(@Body() body: UpdatePutUserDTO, @Param() userId) {
    return {
      method: 'put',
      body,
      userId
    }
  };

  @Patch(':userId')
  async updatePartial(@Body() body: UpdatePatchUserDTO, @Param() userId) {
    return {
      method: 'patch',
      body,
      userId
    }
  };

  @Delete(':userId')
  async delete(@Param('userId', ParseIntPipe) userId: number) {
    return { userId };
  }
}