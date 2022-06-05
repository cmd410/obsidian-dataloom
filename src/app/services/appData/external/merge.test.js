import { findAppData } from "./saveUtils";
import { updateAppDataFromSavedState } from "./merge";
import { CELL_TYPE } from "src/app/constants";
import { SORT } from "src/app/components/HeaderMenu/constants";
import { mockParsedTable } from "src/app/services/mock";

describe("updateAppDataFromSavedState", () => {
	it("merges new header content", () => {
		let parsedTable = mockParsedTable();
		const oldAppData = findAppData(parsedTable);
		parsedTable = mockParsedTable({ headers: ["Updated 1", "Updated 2"] });
		const newAppData = findAppData(parsedTable);

		const merged = updateAppDataFromSavedState(oldAppData, newAppData);
		//Check content
		expect(merged.headers[0].content).toEqual("Updated 1");
		expect(merged.headers[1].content).toEqual("Updated 2");
	});

	it("merges new cell content", () => {
		let parsedTable = mockParsedTable();
		const oldAppData = findAppData(parsedTable);
		parsedTable = mockParsedTable({
			cells: ["Updated 1", "Updated 2"],
		});
		const newAppData = findAppData(parsedTable);

		const merged = updateAppDataFromSavedState(oldAppData, newAppData);
		//Check content
		expect(merged.cells[0].toString()).toEqual("Updated 1");
		expect(merged.cells[1].toString()).toEqual("Updated 2");
	});

	it("merges updated column type", () => {
		let parsedTable = mockParsedTable();
		const oldAppData = findAppData(parsedTable);
		parsedTable = mockParsedTable({ cells: ["123456", "#tag1"] });
		const newAppData = findAppData(parsedTable);

		const merged = updateAppDataFromSavedState(oldAppData, newAppData);
		expect(merged.headers[0].type).toEqual(CELL_TYPE.NUMBER);
		expect(merged.headers[1].type).toEqual(CELL_TYPE.TAG);
	});

	it("merges new tag content", () => {
		let parsedTable = mockParsedTable({ cells: ["#tag1", "#tag2"] });
		const oldAppData = findAppData(parsedTable);
		parsedTable = mockParsedTable({ cells: ["#updated1", "#updated2"] });
		const newAppData = findAppData(parsedTable);

		const merged = updateAppDataFromSavedState(oldAppData, newAppData);
		expect(merged.tags[0].color).toEqual(newAppData.tags[0].color);
		expect(merged.tags[1].color).toEqual(oldAppData.tags[1].color);
		expect(merged.tags[0].content).toEqual("#updated1");
		expect(merged.tags[1].content).toEqual("#updated2");
	});

	it("merges header sort name", () => {
		const parsedTable = mockParsedTable();
		const oldAppData = findAppData(parsedTable);
		oldAppData.headers[0].sortName = SORT.ASC.name;
		oldAppData.headers[1].sortName = SORT.DESC.name;
		const newAppData = findAppData(parsedTable);

		const merged = updateAppDataFromSavedState(oldAppData, newAppData);
		expect(merged.headers[0].sortName).toEqual(SORT.ASC.name);
		expect(merged.headers[1].sortName).toEqual(SORT.DESC.name);
	});

	it("merges header width", () => {
		const parsedTable = mockPar;
		const oldAppData = findAppData(parsedTable);
		oldAppData.headers[0].width = "20rem";
		oldAppData.headers[1].width = "15rem";
		const newAppData = findAppData(parsedTable);

		const merged = updateAppDataFromSavedState(oldAppData, newAppData);
		expect(merged.headers[0].width).toEqual("20rem");
		expect(merged.headers[1].width).toEqual("15rem");
	});

	it("merges row creation times", () => {
		const parsedTable = mockParsedTable();
		const oldAppData = findAppData(parsedTable);
		const newAppData = findAppData(parsedTable);
		expect(oldAppData.rows[0].creationTime).not.toEqual(
			newAppData.rows[0].creationTime
		);

		const merged = updateAppDataFromSavedState(oldAppData, newAppData);
		expect(merged.rows[0].creationTime).toEqual(
			oldAppData.rows[0].creationTime
		);
	});
});
