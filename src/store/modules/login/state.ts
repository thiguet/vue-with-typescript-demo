import { User } from '@/store/datatypes/models';

export default class LoginState {
    username!: string;

    password!: string;

    currentUser!: User;
}
