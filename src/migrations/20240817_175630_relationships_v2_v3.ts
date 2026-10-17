import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
    // This database was created on the Payload 3 schema by 20240817_172121.
    // migratePostgresV2toV3() reads the latest snapshot and, after the 3.91 migration,
    // would treat that snapshot as the v2 schema and call process.exit when it finds no diff.
    payload.logger.info('Skipping v2 to v3 relationship migration; schema is already v3.')
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
    // Migration code
}
