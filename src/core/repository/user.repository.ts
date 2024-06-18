import { User } from '../entity/user.entity';
import { CreateUserRequest } from '../../http/rest/dto/create_user_request.dto';

export interface IUserRepository {
  create(createUserRequest: CreateUserRequest): Promise<User>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
