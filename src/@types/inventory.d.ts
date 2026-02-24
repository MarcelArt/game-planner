export interface Inventory {
    id: string;
    amount: number;
    item_id: string;
}

export interface InventoryView {
    id: string;
    name: string;
    picture: string;
    game_id: string;
    amount: number;
    inventory_id?: string;
}

export interface InventoryInput {
    amount: number;
    item_id: string;
}