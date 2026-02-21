import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Item, ItemContent, ItemHeader, ItemTitle } from './ui/item';

interface ItemComponentProps {
	picture: string;
	name: string;
}

export function ItemComponent({ name, picture }: ItemComponentProps) {
	return (
		<Dialog>
			<DialogTrigger>
				<Item variant='outline' className='hover:bg-secondary'>
					<ItemHeader>
						<img src={picture} alt={name} width={128} height={128} className='aspect-square w-full rounded-sm object-cover' />
					</ItemHeader>
					<ItemContent>
						<ItemTitle>{name}</ItemTitle>
					</ItemContent>
				</Item>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
