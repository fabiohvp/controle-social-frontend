import fs from "fs";
import path from "path";

export async function readJsonFile(filePath: string) {
	filePath = path.join(process.cwd(), `public/${filePath}`);
	const jsonData = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(jsonData);
}