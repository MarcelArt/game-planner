import Database from '@tauri-apps/plugin-sql';

async function connectDb() {
    const db = await Database.load('sqlite:game-planner.db');
    // const sqlxMigrations = await db.select('SELECT version, description, installed_on, success, checksum, execution_time FROM "_sqlx_migrations"');
    // console.log('sqlxMigrations :>> ', sqlxMigrations);
    return db;
}

async function select<T>(query: string, bindValues?: Array<string | number | boolean>): Promise<T> {
    const db = await connectDb();
    return await db.select<T>(query, bindValues);
}

async function execute(query: string, bindValues?: Array<string | number | boolean>) {
    const db = await connectDb();
    const res = await db.execute(query, bindValues);
    return res;
}

const db = {
    select,
    execute,
};
export default db;