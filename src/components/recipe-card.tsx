import { ArrowRight } from 'lucide-react';
import { Column } from './column';
import { Row } from './row';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Item, ItemHeader } from './ui/item';

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

export function RecipeCard({ recipe }: RecipeCardProps) {
	const { output, inputs } = recipe;

	return (
		<Card className='w-full max-w-2xl'>
			<CardHeader>
				<CardTitle>{output.name}</CardTitle>
				<CardDescription>
					Produces {output.amount}x {output.name}
				</CardDescription>
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

export function groupRecipes(recipes: RecipeWithDetail[]): RecipeCardProps['recipe'][] {
	const grouped = new Map<string, RecipeCardProps['recipe']>();

	for (const row of recipes) {
		if (!grouped.has(row.id)) {
			grouped.set(row.id, {
				id: row.id,
				output: {
					name: row.output_item,
					amount: row.output_amount,
					picture: row.output_picture,
				},
				inputs: [],
			});
		}

		grouped.get(row.id)!.inputs.push({
			name: row.input_item,
			amount: row.input_amount,
			picture: row.input_picture,
		});
	}

	return Array.from(grouped.values());
}
