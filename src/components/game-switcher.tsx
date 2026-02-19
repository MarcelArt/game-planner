import * as React from 'react';
import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useQuery } from '@tanstack/react-query';
import gameData from '@/data/game.data';
import { useNavigate } from '@tanstack/react-router';

interface GameSwitcherProps {
	gameId: string;
}

export function GameSwitcher({ gameId }: GameSwitcherProps) {
	const [selectedGame, setSelectedGame] = React.useState(gameId);
	const navigate = useNavigate();

	const { data, status } = useQuery({
		queryKey: ['games'],
		queryFn: () => gameData.read(),
	});

	const games = status === 'success' ? data : [];
	const currentGame = games.find((game) => game.id === selectedGame);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								<GalleryVerticalEnd className="size-4" />
							</div>
							<div className="flex flex-col gap-0.5 leading-none">
								<span className="font-medium">Switch Game</span>
								<span className="">{currentGame?.title ?? ''}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)" align="start">
						{games.map((game) => (
							<DropdownMenuItem
								key={game.id}
								onSelect={() => {
									setSelectedGame(game.id);
									navigate({ to: '/game/$id', params: { id: game.id } });
								}}
							>
								{game.title} {game.id === selectedGame && <Check className="ml-auto" />}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
