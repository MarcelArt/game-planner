import { useForm } from '@tanstack/react-form';
import { Column } from './column';
import { Spacer } from './spacer';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Item, ItemContent, ItemHeader, ItemTitle } from './ui/item';
import { ItemInputSchema, type ItemInput } from '@/@types/item.d';
import { Field, FieldError, FieldLabel } from './ui/field';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import itemData from '@/data/item.data';
import { toast } from 'sonner';
import { useState } from 'react';

interface CreateItemDialogProps {
	gameId: string;
}

export function CreateItemDialog({ gameId }: CreateItemDialogProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

	const { mutate, isPending } = useMutation({
		mutationFn: (input: ItemInput) => itemData.create(input),
    onSuccess: () => {
      toast.success('Item created successfully');
      queryClient.invalidateQueries({ queryKey: ['items', gameId] });
      setOpen(false);
    },
    onError: () => toast.error('Failed to create item'),
	});

	const form = useForm({
		defaultValues: {
			name: '',
			picture: '',
			game_id: gameId,
		},
		validators: {
			onSubmit: ItemInputSchema,
		},
		onSubmit: ({ value }) => mutate(value),
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='default'>Add Item</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Item</DialogTitle>
					<DialogDescription>Add new item to this game. Click save when you are done</DialogDescription>
					<Column className='gap-6' mainAxisAlignment='between' crossAxisAlignment='stretch'>
						<Item variant='outline' className='shrink-0 max-w-sm'>
							<ItemHeader>
								<form.Field
									name='picture'
									children={(field) => <img src={field.state.value || '/logo192.png'} alt='Item' className='aspect-square w-full rounded-sm object-cover' />}
								/>
							</ItemHeader>
							<ItemContent>
								<ItemTitle>Item</ItemTitle>
							</ItemContent>
						</Item>
						<form
							id='create-item'
							onSubmit={(e) => {
								e.preventDefault();
								form.handleSubmit();
							}}
						>
							<Column className='gap-4' crossAxisAlignment='start'>
								<form.Field
									name='name'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<Column className='gap-2' crossAxisAlignment='start'>
													<FieldLabel htmlFor={field.name}>Name</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder='Name'
													/>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Column>
											</Field>
										);
									}}
								/>
								<form.Field
									name='picture'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<Column className='gap-2' crossAxisAlignment='start'>
													<FieldLabel htmlFor={field.name}>Picture</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder='Picture URL'
													/>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Column>
											</Field>
										);
									}}
								/>
								<Spacer />
								<Button disabled={isPending} type='submit' className='self-end'>
									Save
								</Button>
							</Column>
						</form>
					</Column>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
