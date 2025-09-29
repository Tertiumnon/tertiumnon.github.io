export interface ArticleGetParams {
	category: string;
	name: string;
}

export interface Article {
	title: string;
	link: string;
	language: "en" | "ru";
	tags: string[];
}
