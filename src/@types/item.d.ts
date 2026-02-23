import { z } from "zod";

export interface Item {
    id: string;
    name: string;
    picture: string;
    game_id: string;
}

export const ItemInputSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    picture: z.url('Must be a valid URL'),
    game_id: z.string(),
});
export type ItemInput = z.infer<typeof ItemInputSchema>;