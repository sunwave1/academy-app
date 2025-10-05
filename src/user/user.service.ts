import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';
import { users } from '../drizzle/schema';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { CreateUserDTO } from './dtos/Create';
import { hash } from 'bcrypt';
import { UpdateUserDTO } from './dtos/Update';

@Injectable()
export class UserService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}
  async FindByEmail(email: string) {
    return this.db.query.users.findFirst({
      where: and(eq(users.email, email), isNull(users.deleted_at)),
    });
  }
  async ExistsByEmail(email: string): Promise<boolean> {
    return !!(await this.db.query.users.findFirst({
      columns: {
        email: true,
      },
      where: and(eq(users.email, email), isNull(users.deleted_at)),
    }));
  }
  async ExistsById(id: number): Promise<boolean> {
    return !!(await this.db.query.users.findFirst({
      columns: {
        email: true,
      },
      where: and(eq(users.id, id), isNull(users.deleted_at)),
    }));
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
  async Update(user: UpdateUserDTO) {
    const [result] = await this.db
      .update(users)
      .set(user)
      .where(eq(users.email, user.email))
      .returning();
    return result;
  }
  async Delete(id: number): Promise<{ id: number }> {
    const exists = await this.ExistsById(id);

    if (!exists) {
      throw new NotFoundException('Úsuario não encontrado');
    }

    const [result] = await this.db
      .update(users)
      .set({ deleted_at: new Date() })
      .where(eq(users.id, id))
      .returning();

    return result;
  }
}
