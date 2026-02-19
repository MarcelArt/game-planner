import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import useBreadcrumb from '@/hooks/use-breadcrumb';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';

export const Route = createFileRoute('/game/$id')({
	component: RouteComponent,
});

function RouteComponent() {
	const { paths } = useBreadcrumb();

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							{paths.map((p, i) => {
								return (
									<Fragment key={i}>
										{i > 0 ? <BreadcrumbSeparator className="hidden md:block" /> : null}
										<BreadcrumbItem className="hidden md:block">
											<BreadcrumbLink href={p.link}>{p.text}</BreadcrumbLink>
										</BreadcrumbItem>
									</Fragment>
								);
							})}
							{/* <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem> */}
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
