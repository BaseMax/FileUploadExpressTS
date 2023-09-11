import { createParamDecorator } from 'routing-controllers';

export function GetCurrentUserId() {
  return createParamDecorator({
    value: (action) => {
      return action.request.user.id;
    }
  });
}
