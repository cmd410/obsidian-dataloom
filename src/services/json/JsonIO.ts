import { Notice } from "obsidian";
import FileOperations from "../file/FileOperations";

export const TABLE_EXTENSION = "table";
export default class JsonIO {
	static async createNotionLikeTableFile() {
		try {
			const filePath = "Untitled" + "." + TABLE_EXTENSION;
			const updatedFilePath = await FileOperations.createFile(
				filePath,
				"{}"
			);
			return updatedFilePath;
		} catch (err) {
			new Notice("Could not create Notion-Like-Table file");
			throw err;
		}
	}
}
