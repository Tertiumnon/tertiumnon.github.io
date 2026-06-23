export interface NewsGetParams {
	lang: string;
	name: string;
	filename?: string;
}

export interface News {
	title: string;
	link: string;
	language: "en" | "ru";
	category: string;
	project?: string;
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
