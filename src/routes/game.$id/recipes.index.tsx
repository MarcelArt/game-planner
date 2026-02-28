import { Row } from '@/components/row';
import { Column } from '@/components/column';
import { Item, ItemHeader } from '@/components/ui/item';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/game/$id/recipes/')({
	component: RouteComponent,
});

function RouteComponent() {
	const dummyRecipes = [
		{
			id: '1',
			output: {
				name: 'Wooden Sword',
				amount: 1,
				picture: '/logo192.png',
			},
			inputs: [
				{ name: 'Wood', amount: 5, picture: '/logo192.png' },
				{ name: 'Iron', amount: 2, picture: '/logo192.png' },
			],
		},
		{
			id: '2',
			output: {
				name: 'Health Potion',
				amount: 3,
				picture: '/logo192.png',
			},
			inputs: [
				{ name: 'Herb', amount: 3, picture: '/logo192.png' },
				{ name: 'Water', amount: 1, picture: '/logo192.png' },
				{ name: 'Bottle', amount: 3, picture: '/logo192.png' },
			],
		},
	];

	return (
		<div className='m-4 space-6'>
			<Row mainAxisAlignment='between' crossAxisAlignment='stretch'>
				<h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>Recipes</h2>
			</Row>
			<div className='flex w-full max-w-fit flex-col gap-6 mt-4'>
				{dummyRecipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>
		</div>
	);
}

interface RecipeCardProps {
	recipe: {
		id: string;
		output: {
			name: string;
			amount: number;
			picture: string;
		};
		inputs: Array<{
			name: string;
			amount: number;
			picture: string;
		}>;
	};
}

function RecipeCard({ recipe }: RecipeCardProps) {
	const { output, inputs } = recipe;

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>{output.name}</CardTitle>
				<CardDescription>Produces {output.amount}x {output.name}</CardDescription>
			</CardHeader>
			<CardContent>
				<Row mainAxisAlignment='start' crossAxisAlignment='center' className='gap-4'>
					<Column className='gap-2'>
						<span className='text-sm text-muted-foreground'>Inputs:</span>
						<div className='flex flex-wrap gap-2'>
							{inputs.map((input, idx) => (
								<div key={idx} className='flex items-center gap-2'>
									<Item variant='outline' className='w-16 h-16'>
										<ItemHeader>
											<img src={input.picture} alt={input.name} className='aspect-square w-full rounded-sm object-cover' />
										</ItemHeader>
									</Item>
									<Badge variant='secondary'>{input.amount}x</Badge>
								</div>
							))}
						</div>
					</Column>
					<ArrowRight className='h-8 w-8 text-muted-foreground' />
					<Column className='gap-2'>
						<span className='text-sm text-muted-foreground'>Output:</span>
						<div className='flex items-center gap-2'>
							<Item variant='outline' className='w-16 h-16'>
								<ItemHeader>
									<img src={output.picture} alt={output.name} className='aspect-square w-full rounded-sm object-cover' />
								</ItemHeader>
							</Item>
							<Badge variant='default'>{output.amount}x</Badge>
						</div>
					</Column>
				</Row>
			</CardContent>
		</Card>
	);
}
