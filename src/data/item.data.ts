import type { Item, ItemInput } from "@/@types/item";
import db from "./sqlite";
import { v4 } from "uuid";

async function create(input: ItemInput) {
    return await db.execute('INSERT into items (id, name, picture, game_id) VALUES ($1, $2, $3, $4)', [v4(), input.name, input.picture, input.game_id]);
}

async function read(gameId: string): Promise<Item[]> {
    return await db.select<Item[]>('SELECT id, name, picture, game_id FROM items where game_id = $1', [gameId]);
}

const itemData = {
    create,
    read,
};
export default itemData;