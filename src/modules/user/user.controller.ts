import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
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

  @Post('/change-password')
  @HttpCode(200)
  changePassword(
    @GetCurrentUserId() userId: number,
    @Body() changePassword: ChangePasswordDto
  ) {
    return this.userService.changePassword(+userId, changePassword);
  }

  @Put('/update-profile')
  updateUserProfile(
    @GetCurrentUserId() userId: number,
    @Body() updateUserProfileDto: UpdateUserProfileDto
  ) {
    return this.userService.updateProfile(+userId, updateUserProfileDto);
  }

  @Delete('/delete-account')
  @HttpCode(200)
  deleteAccount(@GetCurrentUserId() userId: number) {
    return this.userService.remove(userId);
  }
}
