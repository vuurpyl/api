import { User } from 'src/users/user.entity';

export class FindFollowDTO {
  from: User;

  to: User;
}
