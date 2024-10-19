import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('email', 'varchar', (col) => col.notNull().unique())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('last_sign_in_at', 'timestamp', (col) => col.notNull())
    .execute()

  await db.schema
    .createTable('identities')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('user_id', 'uuid', (col) => col.notNull())
    .addColumn('provider_id', 'varchar', (col) => col.notNull())
    .addColumn('provider', 'varchar', (col) => col.notNull())
    .addColumn('identity_data', 'jsonb', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('email', 'varchar', (col) => col.generatedAlwaysAs(sql`lower((identity_data ->> 'email')::text)`).stored().notNull().unique())
    .addUniqueConstraint('identities_provider_id_provider_unique', ['provider_id', 'provider'])
    .execute()

  await db.schema
    .createTable('profiles')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('username', 'varchar', (col) => col.notNull().unique())
    .addColumn('screen_name', 'varchar')
    .addColumn('full_name', 'varchar')
    .addColumn('avatar_url', 'text')
    .addColumn('bio', 'text')
    .addColumn('location', 'text')
    .addColumn('join_reason', 'text')
    .addColumn('nuclear_likes', 'text')
    .addColumn('x_username', 'text')
    .addColumn('website', 'text')
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('temp').execute()
}