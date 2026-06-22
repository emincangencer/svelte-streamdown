// A method that gets a value from an object using a path
// It should work with nested objects and arrays
// When the root value is an array, numeric keys are treated as 1-indexed (matching
// how LLMs number citations like [1], [2], [3]) and non-numeric keys return null.
export const get = <T>(obj: Record<string, any> | undefined, path: string): T | null => {
	if (!obj) return null;
	const keys = path.split('.');
	if (keys.length === 1) {
		if (Array.isArray(obj)) {
			const index = Number(path);
			if (!isNaN(index) && index >= 1 && index <= obj.length) {
				return obj[index - 1] as T;
			}
			return null;
		}
		return obj[path];
	}

	let value = obj;
	for (const key of keys) {
		if (value == null) return null;
		if (Array.isArray(value)) {
			const index = Number(key);
			if (isNaN(index) || index < 0 || index >= value.length) return null;
			value = value[index];
		} else {
			value = value[key];
		}
	}
	return value as T | null;
};
