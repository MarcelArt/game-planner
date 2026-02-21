import useBreadcrumb from '@/hooks/use-breadcrumb';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Fragment } from 'react/jsx-runtime';

export function GameBreadcrumb() {
	const { paths } = useBreadcrumb();

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem className="hidden md:block">
					<BreadcrumbLink href="/">My Games</BreadcrumbLink>
				</BreadcrumbItem>
				{paths.map((p, i) => {
					return (
						<Fragment key={i}>
							<BreadcrumbSeparator className="hidden md:block" />
							{p.link ? (
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href={p.link}>{p.text}</BreadcrumbLink>
								</BreadcrumbItem>
							) : (
								<BreadcrumbItem>
									<BreadcrumbPage>{p.text}</BreadcrumbPage>
								</BreadcrumbItem>
							)}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
