// Polyfill localStorage for jsdom test environment
const storage = new Map<string, string>();
const localStorageMock = {
	getItem: (key: string) => storage.get(key) ?? null,
	setItem: (key: string, value: string) => storage.set(key, value),
	removeItem: (key: string) => storage.delete(key),
	clear: () => storage.clear(),
	get length() {
		return storage.size;
	},
	key: (index: number) => (index < storage.size ? [...storage.keys()][index] : null),
};
Object.defineProperty(window, "localStorage", {
	value: localStorageMock,
	writable: true,
	configurable: true,
});
