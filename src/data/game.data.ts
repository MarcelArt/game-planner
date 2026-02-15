import type { Game, GameInput } from '@/@types/game';
import db from './sqlite';
import { v4 } from 'uuid';

async function create(input: GameInput) {
	return await db.execute('INSERT into games (id, title, description, picture) VALUES ($1, $2, $3, $4)', [v4(), input.title, input.description, input.picture]);
}

async function read(): Promise<Game[]> {
	const games = await db.select<Game[]>('SELECT id, title, description, picture FROM games');
	return games;
}

const gameData = {
    create,
	read,
};
export default gameData;
