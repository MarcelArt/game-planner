import { GameInputSchema, type GameInput } from '@/@types/game.d';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import gameData from '@/data/game.data';
import useBreadcrumb from '@/hooks/use-breadcrumb';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/game/$id/')({
	component: RouteComponent,
  loader: async ({ params }) => {
    const game = await gameData.getById(params.id);
    return {
      data: game,
    }
  }
});

function RouteComponent() {
	const { id } = Route.useParams();
  const { data } = Route.useLoaderData();
  const queryClient = useQueryClient();
	const { setPaths } = useBreadcrumb();

	useEffect(() => {
		setPaths([{ link: '/', text: data.title }]);
	}, [])

	const { mutate } = useMutation({
		mutationFn: (input: GameInput) => gameData.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['games'],
      });
      toast.success('Game updated');
    }
	});

	const form = useForm({
		validators: {
			onSubmit: GameInputSchema,
		},
		defaultValues: {
			title: data?.title ?? '',
			description: data?.description ?? '',
			picture: data?.picture ?? '',
		},
		onSubmit: ({ value }) => mutate(value),
	});

	return (
		<div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
			<div className="flex flex-col gap-6 w-full max-w-7xl">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<div className="flex flex-col items-center gap-2 text-center">
							<form.Field name="picture" children={(field) => <img src={field.state.value} alt="Event cover" className="relative z-20 aspect-video w-full object-cover" />} />
							<h1 className="text-xl font-bold">Update game {data.title}</h1>
						</div>
						<form.Field
							name="title"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Title</FieldLabel>
										<Input
											id={field.name}
											type="text"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
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
										<FieldLabel htmlFor={field.name}>Description</FieldLabel>
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
						<form.Field
							name="picture"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Picture URL</FieldLabel>
										<Input
											id={field.name}
											type="text"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Picture URL"
											required
										/>
									</Field>
								);
							}}
						/>
						<div className="grid grid-cols-12">
							<div className="col-span-11"></div>
							<Field className="col-span-1">
								<Button type="submit">Update</Button>
							</Field>
						</div>
					</FieldGroup>
				</form>
			</div>
		</div>
	);
}
