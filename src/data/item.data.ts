import type { Item, ItemInput } from "@/@types/item";
import db from "./sqlite";
import { v4 } from "uuid";

async function create(input: ItemInput) {
    return await db.execute('INSERT into items (id, name, picture, game_id) VALUES ($1, $2, $3, $4)', [v4(), input.name, input.picture, input.game_id]);
}

async function read(gameId: string): Promise<Item[]> {
    return await db.select<Item[]>('SELECT id, name, picture, game_id FROM items where game_id = $1', [gameId]);
}

async function update(id: string, input: ItemInput) {
	return await db.execute('UPDATE items SET name = $1, picture = $2 WHERE id = $3', [input.name, input.picture, id]);
}

// SELECT 
// 	i.*,
// 	coalesce(i2.amount, 0) amount
// from items i 
// left join inventories i2 on i.id = i2.item_id 
// where i.game_id = '4a3ae9d2-6c55-4cd4-91dd-3c5eb83ac3ea'

const itemData = {
    create,
    read,
    update,
};
export default itemData;