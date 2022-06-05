import { AppData } from "../state/appData";
import { AppDataStringBuffer } from "../external/saveUtils";
import { calcColumnCharLengths } from "../external/saveUtils";
import { CELL_TYPE } from "src/app/constants";

export const appDataIdsToMarkdown = (data: AppData): string => {
	const columnCharLengths = calcColumnCharLengths(data);

	const buffer = new AppDataStringBuffer();
	buffer.createRow();

	data.headers.forEach((header, i) => {
		buffer.writeColumn(header.content, columnCharLengths[i]);
	});

	buffer.createRow();

	for (let i = 0; i < data.headers.length + 1; i++) {
		const content = Array(columnCharLengths[i]).fill("-").join("");
		buffer.writeColumn(content, columnCharLengths[i]);
	}

	data.rows.forEach((row) => {
		buffer.createRow();

		for (let i = 0; i < data.headers.length; i++) {
			const cell = data.cells.find(
				(cell) =>
					cell.rowId === row.id &&
					cell.headerId === data.headers[i].id
			);
			if (cell.type === CELL_TYPE.TAG) {
				const tagIds = data.tags
					.filter((tag) => tag.selected.includes(cell.id))
					.map((tag) => tag.id);
				buffer.writeColumn(tagIds.join(", "), columnCharLengths[i]);
			} else {
				buffer.writeColumn(cell.id, columnCharLengths[i]);
			}
		}
	});
	return buffer.toString();
};

export const appDataTypesToMarkdown = (data: AppData): string => {
	const columnCharLengths = calcColumnCharLengths(data);

	const buffer = new AppDataStringBuffer();
	buffer.createRow();

	data.headers.forEach((header, i) => {
		buffer.writeColumn(header.content, columnCharLengths[i]);
	});
	buffer.writeColumn("", columnCharLengths[data.headers.length]);

	buffer.createRow();

	for (let i = 0; i < data.headers.length + 1; i++) {
		const content = Array(columnCharLengths[i]).fill("-").join("");
		buffer.writeColumn(content, columnCharLengths[i]);
	}

	data.rows.forEach((row) => {
		buffer.createRow();

		for (let i = 0; i < data.headers.length; i++) {
			const cell = data.cells.find(
				(cell) =>
					cell.rowId === row.id &&
					cell.headerId === data.headers[i].id
			);
			buffer.writeColumn(cell.type, columnCharLengths[i]);
		}
	});
	return buffer.toString();
};
