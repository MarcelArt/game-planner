import type { Item } from "@/@types/item";
import db from "./sqlite";

async function read(gameId: string): Promise<Item[]> {
    return await db.select<Item[]>('SELECT id, name, picture, game_id FROM items where game_id = $1', [gameId]);
}

const itemData = {
    read,
};
export default itemData;