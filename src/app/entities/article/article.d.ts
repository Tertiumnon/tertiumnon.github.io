export interface ArticleGetParams {
	lang: string;
	category: string;
	name: string;
}

export interface Article {
	title: string;
	link: string;
	language: "en" | "ru";
	tags: string[];
	publishedAt: string;
	updatedAt?: string;
}
