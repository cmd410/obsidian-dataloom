import { TFile } from "obsidian";
import { SuggestList } from "src/react/shared/suggest-list";
import { getBasename } from "src/shared/link/link-utils";

interface Props {
	onChange: (value: string) => void;
	onMenuClose: () => void;
}

export default function FileCellEdit({ onChange, onMenuClose }: Props) {
	function handleSuggestItemClick(file: TFile | null) {
		if (file) {
			//The basename does not include an extension
			let fileName = file.basename;
			if (file.path.includes("/"))
				fileName = `${file.path}|${file.basename}`;
			onChange(`[[${fileName}]]`);
		}
		onMenuClose();
	}

	function handleClearClick() {
		onChange("");
		onMenuClose();
	}

	function handleCreateClick(value: string) {
		let link = `[[${value}]]`;
		if (value.includes("/")) {
			const fileName = getBasename(value);
			link = `${value}|${fileName}`;
		}
		onChange(link);
		onMenuClose();
	}

	return (
		<div className="DataLoom__file-cell-edit">
			<SuggestList
				showInput
				showClear
				showCreate
				onItemClick={handleSuggestItemClick}
				onClearClick={handleClearClick}
				onCreateClick={handleCreateClick}
			/>
		</div>
	);
}
