import {
  HttpCode,
  JsonController,
  Param,
  Post,
  UseBefore
} from 'routing-controllers';
import { Service } from 'typedi';
import { AuthCheck } from '../../infrastructure/middlewares/auth.middleware';
import { GetCurrentUserId } from '../../decorators/get-current-user-id.decorator';
import { DirectoryService } from './directory.service';

@Service()
@UseBefore(AuthCheck)
@JsonController('/directory')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}
  @Post('/:name')
  @HttpCode(201)
  createDirectory(
    @GetCurrentUserId() userId: number,
    @Param('name') dirName: string
  ) {
    return this.directoryService.createDirectory(dirName, +userId);
  }
}
