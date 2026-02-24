import type { InventoryView } from '@/@types/inventory';
import { Item, ItemContent, ItemHeader, ItemTitle } from './ui/item';
import { Input } from './ui/input';
import { Column } from './column';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import inventoryData from '@/data/inventory.data';

interface InventoryComponentProps {
	inventory: InventoryView;
}

export function InventoryComponent({ inventory }: InventoryComponentProps) {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState(inventory.amount);
  
  const { mutate } = useMutation({
    mutationFn: () => inventoryData.setAmountByItemId(inventory.id, amount),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inventories'] }),
  });

  const onChange = (amount: number) => {
    setAmount(amount);
    mutate();
  }

	return (
		<Item variant='outline'>
			<ItemHeader>
				<img src={inventory.picture} alt={inventory.name} width={128} height={128} className='aspect-square w-full rounded-sm object-cover' />
			</ItemHeader>
			<ItemContent>
				<Column className='space-y-2'>
					<ItemTitle>{inventory.name}</ItemTitle>
          {/* <Spacer /> */}
          <Input type='number' value={amount} onChange={e => onChange(+e.target.value)}/>
				</Column>
			</ItemContent>
		</Item>
	);
}
