import { createLoomState, createTag } from "src/data/loom-state-factory";
import { CommandRedoError, CommandUndoError } from "./command-errors";
import TagUpdateCommand from "./tag-update-command";

describe("tag-update-command", () => {
	it("should throw an error when undo() is called before execute()", () => {
		try {
			//Arrange
			const prevState = createLoomState(1, 2);

			const tags = [createTag("test1"), createTag("test2")];
			prevState.model.columns[0].tags = tags;

			const tagIds = tags.map((t) => t.id);
			prevState.model.bodyCells[0].tagIds = tagIds;
			prevState.model.bodyCells[1].tagIds = tagIds;

			const command = new TagUpdateCommand(
				prevState.model.columns[0].id,
				tags[0].id,
				"markdown",
				""
			);

			//Act
			command.undo(prevState);
		} catch (err) {
			expect(err).toBeInstanceOf(CommandUndoError);
		}
	});

	it("should throw an error when redo() is called before redo()", () => {
		try {
			//Arrange
			const prevState = createLoomState(1, 2);

			const tags = [createTag("test1"), createTag("test2")];
			prevState.model.columns[0].tags = tags;

			const tagIds = tags.map((t) => t.id);
			prevState.model.bodyCells[0].tagIds = tagIds;
			prevState.model.bodyCells[1].tagIds = tagIds;

			const command = new TagUpdateCommand(
				prevState.model.columns[0].id,
				tags[0].id,
				"markdown",
				""
			);

			//Act
			command.execute(prevState);
			command.redo(prevState);
		} catch (err) {
			expect(err).toBeInstanceOf(CommandRedoError);
		}
	});

	it("should update a tag property when execute() is called", async () => {
		//Arrange
		const prevState = createLoomState(1, 2);

		const tags = [createTag("test1"), createTag("test2")];
		prevState.model.columns[0].tags = tags;

		const tagIds = tags.map((t) => t.id);
		prevState.model.bodyCells[0].tagIds = tagIds;
		prevState.model.bodyCells[1].tagIds = tagIds;

		const command = new TagUpdateCommand(
			prevState.model.columns[0].id,
			tags[0].id,
			"markdown",
			""
		);

		//Act
		const executeState = command.execute(prevState);

		//Assert
		expect(executeState.model.columns[0].tags.length).toEqual(2);
		expect(executeState.model.columns[0].tags[0].markdown).toEqual("");
		expect(executeState.model.columns[0].tags[1].markdown).toEqual("test2");
		expect(executeState.model.bodyCells).toEqual(prevState.model.bodyCells);
	});

	it("should reset the cell property when undo() is called", () => {
		//Arrange
		const prevState = createLoomState(1, 2);

		const tags = [createTag("test1"), createTag("test2")];
		prevState.model.columns[0].tags = tags;

		const tagIds = tags.map((t) => t.id);
		prevState.model.bodyCells[0].tagIds = tagIds;
		prevState.model.bodyCells[1].tagIds = tagIds;

		const command = new TagUpdateCommand(
			prevState.model.columns[0].id,
			tags[0].id,
			"markdown",
			""
		);

		//Act
		const executeState = command.execute(prevState);
		const undoState = command.undo(executeState);

		//Assert
		expect(undoState.model.columns).toEqual(prevState.model.columns);
		expect(executeState.model.bodyCells).toEqual(prevState.model.bodyCells);
	});
});
