// Language icons from VS Code Great Icons (MIT), see assets/icons/languages.
const LANGUAGE_ICONS: Record<string, string> = {
	CSS: "css",
	HTML: "html",
	JavaScript: "javascript",
	Markdown: "markdown",
	PHP: "php",
	TypeScript: "typescript",
};

export const languageIconPath = (language?: string): string | undefined => {
	const file = language ? LANGUAGE_ICONS[language] : undefined;
	return file ? `assets/icons/languages/${file}.svg` : undefined;
};
