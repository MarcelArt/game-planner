import db from "./sqlite";

async function viewByGameId(gameId: string): Promise<RecipeWithDetail[]> {
    return await db.select('SELECT * from v_recipes where game_id = $1', [gameId]);
}

const recipeData = {
    viewByGameId,
};
export default recipeData;