declare module 'internal' {
	export interface BlogType {
		path: string
		title: string
		date: string
		tags: string[] | string
		categories: string[] | string
	}
	export interface Social {
		icon: string;
		link: string;
		name?: string;
		size?: string;
	}
  export interface Board {
		title: string;
		state: string
		boardContent: string;
		time: string;
		labels?: string[];
    comments: number,
    linkUrl: string,
    author: string,
    authorHome: string
	}

	export interface Project {
		name: string;
		desc?: string;
		icon?: string;
		home?: string;
		repo?: string;
	}
}
