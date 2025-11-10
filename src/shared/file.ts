export async function readJsonFile(filePath: string) {
	const url = `${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}${filePath}`;
	console.log(url)
	const res = await fetch(url);
	const json = await res.json();
	return json;
}