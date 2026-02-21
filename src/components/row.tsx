import * as React from 'react';
import { cn } from '@/lib/utils';

type MainAxisAlignment = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

type CrossAxisAlignment = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
	mainAxisAlignment?: MainAxisAlignment;
	crossAxisAlignment?: CrossAxisAlignment;
}

const mainAxisMap: Record<MainAxisAlignment, string> = {
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
	between: 'justify-between',
	around: 'justify-around',
	evenly: 'justify-evenly',
};

const crossAxisMap: Record<CrossAxisAlignment, string> = {
	start: 'items-start',
	center: 'items-center',
	end: 'items-end',
	stretch: 'items-stretch',
	baseline: 'items-baseline',
};

export const Row = React.forwardRef<HTMLDivElement, RowProps>(({ className, mainAxisAlignment = 'start', crossAxisAlignment = 'center', ...props }, ref) => {
	return <div ref={ref} className={cn('flex flex-row', mainAxisMap[mainAxisAlignment], crossAxisMap[crossAxisAlignment], className)} {...props} />;
});

Row.displayName = 'Row';
