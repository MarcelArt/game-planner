import { AppSidebar } from '@/components/app-sidebar';
import { GameBreadcrumb } from '@/components/game-breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/game/$id')({
	component: RouteComponent,
});

function RouteComponent() {

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
					<GameBreadcrumb/>
				</header>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
