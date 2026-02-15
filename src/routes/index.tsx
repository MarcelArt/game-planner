import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import gameData from '@/data/game.data';
import { CardImage } from '@/components/card-image';
import { AddGameCard } from '@/components/add-game-card';

export const Route = createFileRoute('/')({
	component: App,
});

function App() {
	const navigate = useNavigate({ from: '/' });

	const { data, status } = useQuery({
		queryKey: ['games'],
		queryFn: () => gameData.read(),
	});

	if (status !== 'success') return null;

	return (
		<div className="m-4 grid grid-cols-4 gap-4">
			{data.map((game, i) => (
				<CardImage
					key={i}
					onActionPress={() => navigate({ to: '/game/$id', params: { id: game.id } })}
					actionText='Enter'
					title={game.title}
					description={game.description}
					picture={game.picture}
				/>
			))}
			<AddGameCard />
		</div>
	);
}
