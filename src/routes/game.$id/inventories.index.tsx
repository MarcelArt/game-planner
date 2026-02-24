import { InventoryComponent } from '@/components/inventory-component';
import { Row } from '@/components/row';
import { ItemGroup } from '@/components/ui/item';
import inventoryData from '@/data/inventory.data';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/game/$id/inventories/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	const { data, status } = useQuery({
		queryKey: ['inventories', id],
		queryFn: () => inventoryData.viewByGameId(id),
	});
	const inventories = status === 'success' ? data : [];

	return (
		<div className='m-4 space-6'>
			<Row mainAxisAlignment='between' crossAxisAlignment='stretch'>
				<h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>Inventories</h2>
			</Row>
			<div className='flex w-full max-w-fit flex-col gap-6 mt-4'>
				<ItemGroup className='grid grid-cols-10 gap-4'>
					{inventories.map((inventory) => (
						<InventoryComponent key={inventory.id} inventory={inventory} />
					))}
				</ItemGroup>
			</div>
		</div>
	);
}
