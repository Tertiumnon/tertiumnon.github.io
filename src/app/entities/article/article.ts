export interface Article {
  title: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  language: "en" | "ru";
  tags: string[];
}
