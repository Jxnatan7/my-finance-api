import { User } from '../entity/user.entity';

export abstract class IUserRepository {
  abstract findById(id: number): Promise<User | null>;
}
