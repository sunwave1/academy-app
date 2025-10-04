import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { InsertNewUser, UpdateUser, users } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProfileUserService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}
  async Create(user: InsertNewUser): Promise<InsertNewUser> {
    const exists = await this.db.query.users.findFirst({
      columns: {
        email: true,
      },
      where: eq(users.email, user.email),
    });
    if (exists) {
      throw new NotFoundException('Este email já existe');
    }

    const [result] = await this.db.insert(users).values(user).returning();

    return result as InsertNewUser;
  }
  async Update(user: UpdateUser): Promise<UpdateUser> {
    const [result] = await this.db
      .update(users)
      .set(user)
      .where(eq(users.email, user.email ?? ''))
      .returning();
    return result as UpdateUser;
  }
  async FindOne(id: number) {
    return this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }
  async Delete(id: number): Promise<{ id: number }> {
    const exists = await this.db.query.users.findFirst({
      columns: {
        id: true,
      },
      where: eq(users.id, id),
    });

    if (!exists) {
      throw new NotFoundException('Úsuario não encontrado');
    }

    const [result] = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id });

    return result;
  }
}
