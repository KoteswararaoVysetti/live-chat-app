import { Base } from './_base';

export interface User extends Base {
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;
}
