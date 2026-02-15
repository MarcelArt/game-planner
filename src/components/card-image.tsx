import { Button } from './ui/button';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface CardImageProps {
	title: string;
	description: string;
	picture: string;
  actionText: string;
  onActionPress: () => void;
}

export function CardImage({ description, picture, title, actionText, onActionPress }: CardImageProps) {
	return (
		<Card className="relative mx-auto w-full max-w-sm pt-0">
			{/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
			<img src={picture} alt="Event cover" className="relative z-20 aspect-video w-full object-cover" />
			<CardHeader>
				<CardAction>{/* <Badge variant="secondary">Featured</Badge> */}</CardAction>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardFooter className='mt-auto'>
				<Button onClick={onActionPress} className="w-full">{actionText}</Button>
			</CardFooter>
		</Card>
	);
}
