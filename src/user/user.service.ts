import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { users } from '../drizzle/schema';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { CreateUserDTO } from './dtos/Create';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}
  async FindByEmail(email: string) {
    return this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }
  async ExistsByEmail(email: string): Promise<boolean> {
    const exists = await this.db.query.users.findFirst({
      columns: {
        email: true,
      },
      where: eq(users.email, email),
    });
    return !!exists;
  }
  async CreateUser(user: CreateUserDTO) {
    const exists: boolean = await this.ExistsByEmail(user.email);

    if (exists) {
      throw new NotFoundException('Este email já existe');
    }

    user.password = await hash(user.password, 8);

    const [result] = await this.db.insert(users).values(user).returning();

    return result;
  }
}
