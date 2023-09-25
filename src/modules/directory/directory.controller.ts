import {
  Body,
  HttpCode,
  JsonController,
  Post,
  UseBefore
} from 'routing-controllers';
import { Service } from 'typedi';
import { AuthCheck } from '../../infrastructure/middlewares/auth.middleware';
import { GetCurrentUserId } from '../../decorators/get-current-user-id.decorator';
import { DirectoryService } from './directory.service';
import { CreateDirectoryDto } from './dto/create-directory.dto';

@Service()
@UseBefore(AuthCheck)
@JsonController('/directory')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Post()
  @HttpCode(201)
  createDirectory(
    @GetCurrentUserId() userId: number,
    @Body() payload: CreateDirectoryDto
  ) {
    return this.directoryService.createDirectory(+userId, payload);
  }
}
