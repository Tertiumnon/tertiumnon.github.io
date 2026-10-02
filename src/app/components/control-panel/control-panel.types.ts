export interface FilterConfig {
	label: string;
	value: string;
	options: string[];
	onChange: (value: string) => void;
}
