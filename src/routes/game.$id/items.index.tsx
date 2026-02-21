import { Column } from '@/components/column';
import { ItemComponent } from '@/components/item-component';
import { Row } from '@/components/row';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Item, ItemContent, ItemGroup, ItemHeader, ItemTitle } from '@/components/ui/item';
import { Label } from '@/components/ui/label';
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
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='default'>Add Item</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Item</DialogTitle>
							<DialogDescription>Add new item to this game. Click save when you are done</DialogDescription>
							<Row className='gap-6' mainAxisAlignment='between' crossAxisAlignment='stretch'>
								<Item variant='outline' className='shrink-0'>
									<ItemHeader>
										<img src='https://minecraft.wiki/images/Coal_JE4_BE3.png?165e9' alt='Coal' className='aspect-square w-full rounded-sm object-cover' />
									</ItemHeader>
									<ItemContent>
										<ItemTitle>Coal</ItemTitle>
									</ItemContent>
								</Item>
								<Column className='gap-4' crossAxisAlignment='start'>
									<Column className='gap-2' crossAxisAlignment='start'>
										<Label>Name</Label>
										<Input placeholder='Name' />
									</Column>
									<Column className='gap-2' crossAxisAlignment='start'>
										<Label>Picture</Label>
										<Input placeholder='Picture URL' />
									</Column>
                  <Spacer/>
									<Button className='self-end'>Save</Button>
								</Column>
							</Row>
						</DialogHeader>
					</DialogContent>
				</Dialog>
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
