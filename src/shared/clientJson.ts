export async function loadJsonFile<T>(filePath: string) {
	const url = `${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}/${filePath}`;
	const res = await fetch(url);
	const json = await res.json();
	return json as T;
}