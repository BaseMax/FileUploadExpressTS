import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  Put,
  UseBefore
} from 'routing-controllers';
import { Service } from 'typedi';
import { GetCurrentUserId } from '../../decorators/get-current-user-id.decorator';
import { AuthCheck } from '../../infrastructure/middlewares/auth.middleware';
import { UserService } from './user.service';
import { UpdateUserProfileDto } from './dto/update-profile';
import { ChangePasswordDto } from './dto/change-password.dto';
import { HasRole } from '../../infrastructure/middlewares/hasRole.middleware';
import { Roles } from '../auth/types/role.enum';
import { CreateUserDto } from './dto/createUser.dto';

@Service()
@JsonController('/user')
@UseBefore(AuthCheck)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @HttpCode(200)
  getUserProfile(@GetCurrentUserId() userId: number) {
    return this.userService.getUserProfile(+userId);
  }

  @Get('/downloads')
  getUserDownloadedFiles(@GetCurrentUserId() userId: number) {
    return this.userService.getUserDownloadedFiles(+userId);
  }

  @Get()
  @UseBefore(HasRole(Roles.Admin))
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/admin/user-stats/:id')
  @UseBefore(HasRole(Roles.Admin))
  getUserStats(@Param('id') id: number) {
    return this.userService.getUserStats(+id);
  }

  @Get('/admin/view-user-downloads/:id')
  @UseBefore(HasRole(Roles.Admin))
  getUserDownloads(@Param('id') id: number) {
    return this.userService.getUserDownloads(+id);
  }

  @Get('/admin/view-user-uploads/:id')
  @UseBefore(HasRole(Roles.Admin))
  getUserUploads(@Param('id') id: number) {
    return this.userService.getUserDownloads(+id);
  }

  @Post()
  @HttpCode(201)
  @UseBefore(HasRole(Roles.Admin))
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Post('/set-user-role/:id')
  @UseBefore(HasRole(Roles.Admin))
  setRole(@Param('id') id: number, @Body() payload: { role: Roles }) {
    return this.userService.setRole(+id, payload.role);
  }

  @Post('/change-password')
  @HttpCode(200)
  changePassword(
    @GetCurrentUserId() userId: number,
    @Body() changePassword: ChangePasswordDto
  ) {
    return this.userService.changePassword(+userId, changePassword);
  }

  @Put('/profile')
  updateUserProfile(
    @GetCurrentUserId() userId: number,
    @Body() updateUserProfileDto: UpdateUserProfileDto
  ) {
    return this.userService.updateProfile(+userId, updateUserProfileDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  @UseBefore(HasRole(Roles.Admin))
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(+id);
  }

  @Delete('/delete-account')
  @HttpCode(200)
  deleteAccount(@GetCurrentUserId() userId: number) {
    return this.userService.remove(userId);
  }
}
