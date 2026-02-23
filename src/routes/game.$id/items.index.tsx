import { CreateItemDialog } from '@/components/create-item-dialog';
import { ItemComponent } from '@/components/item-component';
import { Row } from '@/components/row';
import { ItemGroup } from '@/components/ui/item';
import gameData from '@/data/game.data';
import itemData from '@/data/item.data';
import useBreadcrumb from '@/hooks/use-breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/game/$id/items/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { setPaths } = useBreadcrumb();

	const { data: game, status: gameStatus } = useQuery({
		queryKey: ['games', id],
		queryFn: () => gameData.getById(id),
	});

	useEffect(() => {
		if (gameStatus === 'success') setPaths([{ text: game.title, link: `/game/${id}` }, { text: 'Items' }]);
	}, [game, gameStatus]);

	const { data, status } = useQuery({
		queryKey: ['items', id],
		queryFn: () => itemData.read(id),
	});

	const items = status === 'success' ? data : [];

	return (
		<div className='m-4 space-6'>
			<Row mainAxisAlignment='between' crossAxisAlignment='stretch'>
				<h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>Items</h2>
				<CreateItemDialog gameId={id}/>
			</Row>
			<div className='flex w-full max-w-fit flex-col gap-6 mt-4'>
				<ItemGroup className='grid grid-cols-10 gap-4'>
					{items.map((item) => (
						<ItemComponent key={item.id} name={item.name} picture={item.picture} />
					))}
				</ItemGroup>
			</div>
		</div>
	);
}
