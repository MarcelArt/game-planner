import * as React from 'react';

import { GameSwitcher } from '@/components/game-switcher';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar';
import { useParams } from '@tanstack/react-router';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { id } = useParams({ from: '/game/$id' });
	const gameUrl = `/game/${id}`;

	const data = {
		navMain: [
			{
				title: 'Master Data',
				url: '#',
				items: [
					{
						title: 'Game',
						url: '/',
					},
					{
						title: 'Items',
						url: '/items',
					},
					{
						title: 'Recipes',
						url: '/recipes',
					},
				],
			},
			{
				title: 'Planning',
				url: '#',
				items: [
					{
						title: 'Plans',
						url: '#',
					},
					{
						title: 'Inventories',
						url: '/inventories',
					},
					{
						title: 'Notes',
						url: '#',
					},
				],
			},
		],
	};

	const joinUrl = (path: string) => `${gameUrl}${path}`;

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<GameSwitcher gameId={id} />
				{/* <SearchForm /> */}
			</SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<a href={joinUrl(item.url)}>{item.title}</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
