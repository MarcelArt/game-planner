import { createFileRoute } from '@tanstack/react-router';
import logo from '../logo.svg';
import { useQuery } from '@tanstack/react-query';
import gameData from '@/data/game.data';
import { CardImage } from '@/components/card-image';
import { useState } from 'react';
import { AddGameCard } from '@/components/add-game-card';

export const Route = createFileRoute('/')({
	component: App,
});

function App() {
	const [count, setCount] = useState(0);

	const { data, status } = useQuery({
		queryKey: ['games'],
		queryFn: () => gameData.read(),
	});

	if (status !== 'success') return null;

	console.log('data :>> ', data);

	return (
		<div className="m-4 grid grid-cols-4 gap-4">
			{data.map((game, i) => (
				<CardImage key={i} onActionPress={() => setCount(count + 1)} actionText={`${count}`} title={game.title} description={game.description} picture={game.picture} />
			))}
			<AddGameCard />
		</div>
	);
}
