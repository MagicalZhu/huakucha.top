declare module 'internal' {
	/**
	 * blog模块
	 */
	export interface BlogType {
		path: string
		title: string
		date: string
		tags: string[] | string
		categories: string[] | string
	}
	/**
	 * 社交模块
	 */
	export interface Social {
		icon: string;
		link: string;
		name?: string;
		size?: string;
	}

	/**
	 * 留言板模块
	 */
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

	/**
	 * Project 模块
	 */
	export interface Project {
		name: string;
		desc?: string;
		icon?: string;
		home?: string;
		repo?: string;
	}
}
