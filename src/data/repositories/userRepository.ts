import { User } from '../../core/entities/User';

export interface IUserRepository {
    create(user: User): Promise<void>;
    findByUsername(username: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
    async create(user: User): Promise<void> {
        const client = await (await import('../../infrastructure/db/database')).getClient();
        await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [user.username, user.password]);
    }

    async findByUsername(username: string): Promise<User | null> {
        const client = await (await import('../../infrastructure/db/database')).getClient();
        const res = await client.query('SELECT * FROM users WHERE username = $1', [username]);

        if (res.rows.length === 0) {
            return null;
        }

        const row = res.rows[0];
        return new User(row.id, row.username, row.password);
    }
}
