export interface PostGetParams {
	lang: string;
	category: string;
	name: string;
	filename?: string;
}

export interface Post {
	title: string;
	link: string;
	language: "en" | "ru";
	category: string;
	tags: string[];
	publishedAt: string;
	updatedAt?: string;
	filename: string;
	dirname: string;
	isHidden?: boolean;
	source?: {
		name: string;
		url: string;
	};
}
