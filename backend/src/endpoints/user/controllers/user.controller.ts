import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { UserService } from '../services/user.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    const { password, ...user } = await this.userService.create(body);
    return user;
  }
  @Get()
  async findAll(@Query('s') searchString = null) {
    return this.userService.findAll(searchString);
  }
  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findByUnique(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDTO,
  ) {
    if (Object.keys(body).length === 0) {
      throw new HttpException('No body provided', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.findByUnique(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userService.update(id, body);
  }
  @Post('/:id/image')
  @UseInterceptors(AnyFilesInterceptor())
  async processImage(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const user = await this.userService.findByUnique(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!files) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    if (files.length > 1) {
      throw new HttpException(
        'Only one file can be uploaded',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      this.fileService.processImage(files[0], id);
      return { status: 1, message: 'Image processed' };
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findByUnique(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userService.delete(id);
  }
}
