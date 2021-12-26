import { User } from 'src/user/user.entity';

export default interface UserAndAccessTokenInterface {
  user: User;
  access_token: string;
}
