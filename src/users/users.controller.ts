import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserLoginDto, UserSignupDto, getUserDto, updateUserDto } from './dto/users.dto';


@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post('/login')
    login(@Body() body: UserLoginDto) : any{
        let user = body;
    return this.usersService.login(user);
    }

    @Post('/signup')
  signup(@Body() body: UserSignupDto): any {
    let newUser = body;
    console.log(body)
    return this.usersService.signup(newUser);
  }

  @Get('/getListUser')
  getListUser(): Promise<getUserDto[]> {
    return this.usersService.getListUser();
  }

  @Put('/updateUser/:id')
  updateUser(
    @Body() updateUser: updateUserDto,
    @Param('id') id: string,
  ): Promise<any> {
    return this.usersService.updateUser(updateUser, +id);
  }

  @Delete('deleteUser/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }

}
