import { Row } from '@/components/row';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import recipeData from '@/data/recipe.data';
import { groupRecipes, RecipeCard } from '@/components/recipe-card';
import { useMemo } from 'react';

export const Route = createFileRoute('/game/$id/recipes/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data, status } = useQuery({
		queryKey: ['recipes-with-detail', id],
		queryFn: () => recipeData.viewByGameId(id),
	});

	const recipes = useMemo(() => {
		return status === 'success' ? groupRecipes(data) : [];
	}, [data, status]);

	return (
		<div className='m-4 space-6'>
			<Row mainAxisAlignment='between' crossAxisAlignment='stretch'>
				<h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>Recipes</h2>
			</Row>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>
		</div>
	);
}
