import { Image } from 'lucide-react';
import { useForm } from '@tanstack/react-form';

import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { GameInputSchema, type GameInput } from '@/@types/game.d';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from './ui/popover';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import gameData from '@/data/game.data';

export function AddGameCard() {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: (input: GameInput) => gameData.create(input),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['games'],
			});
		}
	});

	const form = useForm({
		validators: {
			onSubmit: GameInputSchema,
		},
		defaultValues: {
			title: '',
			description: '',
			picture: '',
		},
		onSubmit: ({ value }) => mutate(value),
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Card className="relative mx-auto w-full max-w-sm pt-0">
				{/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
				<div className="relative z-20 aspect-video w-full object-cover items-center justify-center flex">
					<form.Field
						name="picture"
						children={(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Popover>
									<PopoverTrigger asChild>
										{field.state.value ? (
											<img src={field.state.value} alt="Event cover" className="relative z-20 aspect-video w-full object-cover" />
										) : (
											<Button variant="outline" className="w-full h-full" asChild>
												<Image />
											</Button>
										)}
									</PopoverTrigger>
									<PopoverContent>
										<PopoverHeader>
											<PopoverTitle>Picture</PopoverTitle>
										</PopoverHeader>
										<Field data-invalid={isInvalid} orientation="horizontal">
											<FieldLabel htmlFor={field.name} className="w-1/2">
												URL
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												type="text"
												placeholder="Picture URL"
												required
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									</PopoverContent>
								</Popover>
							);
						}}
					/>
				</div>
				<CardContent>
					<form>
						<div className="flex flex-col gap-2">
							<form.Field
								name="title"
								children={(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												type="text"
												placeholder="Title"
												required
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
							/>
							<form.Field
								name="description"
								children={(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<Textarea
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="Description"
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
							/>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full">
						Add game
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
