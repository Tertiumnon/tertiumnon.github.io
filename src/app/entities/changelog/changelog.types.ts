export interface ChangelogGetParams {
	lang: string;
	name: string;
	filename?: string;
}

export interface Changelog {
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
	content?: string;
	isHidden?: boolean;
	source?: {
		name: string;
		url: string;
	};
}
