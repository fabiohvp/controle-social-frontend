import { promises as fs } from "node:fs";
import path from "node:path";

export async function readJsonFile<T>(filePath: string): Promise<T> {
	const fullPath = path.join(process.cwd(), `public/${filePath}`);
	const jsonData = await fs.readFile(fullPath, "utf8");
	return JSON.parse(jsonData) as T;
}
