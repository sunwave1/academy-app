import { sql } from 'drizzle-orm';
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
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable(
  'users',
  {
    id: bigserial({ mode: 'number' }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 350 }).notNull().unique(),
    morph_id: bigint({ mode: 'bigint' }).default(sql`NULL`),
    morph_model: varchar('morph_model', { length: 255 }).default(sql`NULL`),
    age: smallint('age').default(sql`NULL`),
    avatar_asset: text('avatar_asset').default(sql`NULL`),
    password: varchar('password', { length: 355 }).notNull(),
    cpf_cnpj: varchar('cpf_cnpj', { length: 255 }).default(sql`NULL`),
    phone: varchar('phone', { length: 50 }).default(sql`NULL`),
    second_phone: varchar('second_phone', { length: 50 }).default(sql`NULL`),
    receive_marketing: boolean('receive_marketing').default(true),
    deleted_at: timestamp('deleted_at').default(sql`NULL`),
    birth_date_at: timestamp('birth_date_at').default(sql`NULL`),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
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
    index('morph_id_idx').on(table.morph_id),
    index('morph_model_idx').on(table.morph_model),
    index('cpf_cnpj_idx').on(table.cpf_cnpj),
  ],
);

export const CreateUserSchema = createInsertSchema(users, {
  name: (schema) =>
    schema
      .min(5, { message: 'Nome deve conter no minimo 5 caracteres' })
      .max(255, { message: 'Nome deve conter no maximo 255 caracteres' }),
  email: (schema) => schema.email({ message: 'Email deve ser correto' }),
  password: (schema) =>
    schema
      .min(5, { message: 'Senha deve conter no minimo 5 caracteres' })
      .max(255, { message: 'Senha deve conter no maximo 255 caracteres' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          'Password deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número',
      }),
});

export const UpdateUserSchema = createUpdateSchema(users, {
  name: (schema) =>
    schema
      .min(5, { message: 'Nome deve conter no minimo 5 caracteres' })
      .max(255, { message: 'Nome deve conter no maximo 255 caracteres' }),
  email: (schema) => schema.email({ message: 'Email deve ser correto' }),
  password: (schema) =>
    schema
      .min(5, { message: 'Password deve ser correto' })
      .max(255, { message: 'Password deve ser correto' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          'Password deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número',
      }),
  phone: (schema) =>
    schema.regex(/^(55)?([1-9]{2})?(\d{4,5})(\d{4})$/, {
      message: 'Formato do telefone está incorreto',
    }),
  second_phone: (schema) =>
    schema.regex(/^(55)?([1-9]{2})?(\d{4,5})(\d{4})$/, {
      message: 'Formato do telefone está incorreto',
    }),
  cpf_cnpj: (schema) =>
    schema.regex(
      /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/,
      { message: 'CPF ou CNPJ inválido' },
    ),
});

export type InsertNewUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
