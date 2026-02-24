import type { Inventory, InventoryInput, InventoryView } from '@/@types/inventory';
import db from './sqlite';
import { v4 } from 'uuid';

async function create(input: InventoryInput) {
	return await db.execute('INSERT into inventories (id, item_id, amount) VALUES ($1, $2, $3)', [v4(), input.item_id, input.amount]);
}

async function update(id: string, input: InventoryInput) {
	return await db.execute('UPDATE inventories SET item_id = $1, amount = $2 WHERE id = $3', [input.item_id, input.amount, id]);
}

async function getById(id: string): Promise<Inventory> {
	const inventory = await db.select<Inventory[]>('SELECT id, item_id, amount FROM inventories where id = $1', [id]);
	return inventory[0];
}

async function viewByGameId(gameId: string): Promise<InventoryView[]> {
	return await db.select<InventoryView[]>(`SELECT * from v_inventories where game_id = $1`, [gameId]);
}

async function getByItemId(itemId: string): Promise<Inventory | null> {
	const inventory = await db.select<Inventory[]>('SELECT id, item_id, amount FROM inventories where item_id = $1', [itemId]);
	return inventory[0];
}

async function setAmountByItemId(itemId: string, amount: number) {
	const inventory = await getByItemId(itemId);

	return inventory ? update(inventory.id, { item_id: itemId, amount }) : create({ item_id: itemId, amount });
}

const inventoryData = {
	create,
	update,
	getById,
	viewByGameId,
	getByItemId,
	setAmountByItemId,
};
export default inventoryData;
