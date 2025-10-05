import { relations, sql } from 'drizzle-orm';
import {
  bigserial,
  varchar,
  text,
  pgTable,
  boolean,
  timestamp,
  uniqueIndex,
  smallint,
  bigint,
  index,
  integer,
} from 'drizzle-orm/pg-core';

const timestamps = {
  deleted_at: timestamp('deleted_at').default(sql`NULL`),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
};

export const users = pgTable(
  'users',
  {
    id: bigserial({ mode: 'number' }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 350 }).notNull().unique(),
    age: smallint('age').default(sql`NULL`),
    avatar_asset: text('avatar_asset').default(sql`NULL`),
    password: varchar('password', { length: 355 }).notNull(),
    cpf_cnpj: varchar('cpf_cnpj', { length: 255 }).default(sql`NULL`),
    phone: varchar('phone', { length: 50 }).default(sql`NULL`),
    second_phone: varchar('second_phone', { length: 50 }).default(sql`NULL`),
    receive_marketing: boolean('receive_marketing').default(true),
    birth_date_at: timestamp('birth_date_at').default(sql`NULL`),
    document_asset: text('document_asset').default(sql`NULL`),
    ...timestamps,
  },
  (table) => [
    uniqueIndex('email_idx').on(table.email),
    index('name_idx').on(table.name),
    index('phone_idx').on(table.phone),
    index('second_phone_idx').on(table.second_phone),
    index('receive_marketing_idx').on(table.receive_marketing),
    index('deleted_at_idx').on(table.deleted_at),
    index('birth_date_at_idx').on(table.birth_date_at),
    index('created_at_idx').on(table.created_at),
    index('cpf_cnpj_idx').on(table.cpf_cnpj),
  ],
);

export const students = pgTable('students', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  user_id: bigint({ mode: 'number' }).default(sql`NULL`),
  enem_grade: integer('enem_grade').default(sql`NULL`),
  ...timestamps,
});

export const teachers = pgTable('teachers', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  user_id: bigint({ mode: 'number' }).default(sql`NULL`),
  document: varchar('document', { length: 255 }).notNull().unique(),
  ...timestamps,
});

export const userRelations = relations(users, ({ one }) => ({
  student: one(students, {
    fields: [users.id],
    references: [students.user_id],
  }),
  teacher: one(teachers, {
    fields: [users.id],
    references: [teachers.user_id],
  }),
}));

export const studentRelations = relations(students, ({ one }) => ({
  user: one(users, {
    fields: [students.user_id],
    references: [users.id],
  }),
}));

export const teacherRelations = relations(teachers, ({ one }) => ({
  user: one(users, {
    fields: [teachers.user_id],
    references: [users.id],
  }),
}));
