import { create } from 'zustand';

interface BreadcrumbPath {
	link?: string;
	text: string;
}

interface BreadcrumbState {
	paths: BreadcrumbPath[];
	setPaths: (paths: BreadcrumbPath[]) => void;
}

const useBreadcrumb = create<BreadcrumbState>()((set) => ({
	paths: [],
	setPaths: (paths) => set({ paths }),
}));
export default useBreadcrumb;