import { z } from 'zod';

export interface Game {
    id: string;
    title: string;
    description: string;
    picture: string;
}

export const GameInputSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string(),
    picture: z.string(),
});
export type GameInput = z.infer<typeof GameInputSchema>;