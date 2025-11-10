export async function loadJsonFile(filePath: string) {
	const url = `${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}/${filePath}`;
	const res = await fetch(url);
	const json = await res.json();
	return json
}