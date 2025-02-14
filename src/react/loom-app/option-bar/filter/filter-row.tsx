import FilterRowDropdown from "./filter-type-select";
import Icon from "src/react/shared/icon";
import Button from "src/react/shared/button";
import Switch from "src/react/shared/switch";
import { CellType, FilterType, Tag } from "src/shared/types";
import FilterColumnDropdown from "./filter-column-select";
import FilterTextInput from "./filter-text-input";
import { ColumnWithMarkdown } from "../types";
import Wrap from "src/react/shared/wrap";
import Stack from "src/react/shared/stack";

interface Props {
	id: string;
	columns: ColumnWithMarkdown[];
	isEnabled: boolean;
	columnId: string;
	cellType: CellType;
	columnTags: Tag[];
	tagIds: string[];
	filterType: FilterType;
	text: string;
	onToggle: (id: string) => void;
	onColumnChange: (id: string, columnId: string) => void;
	onFilterTypeChange: (id: string, value: FilterType) => void;
	onTextChange: (id: string, value: string) => void;
	onDeleteClick: (id: string) => void;
	onTagsChange: (id: string, value: string[]) => void;
}

export default function FilterRow({
	id,
	columns,
	isEnabled,
	columnId,
	filterType,
	columnTags,
	tagIds,
	cellType,
	text,
	onToggle,
	onColumnChange,
	onFilterTypeChange,
	onTextChange,
	onDeleteClick,
	onTagsChange,
}: Props) {
	return (
		<Wrap>
			<FilterColumnDropdown
				id={id}
				columns={columns}
				value={columnId}
				onChange={onColumnChange}
			/>
			<FilterRowDropdown
				id={id}
				cellType={cellType}
				value={filterType}
				onChange={onFilterTypeChange}
			/>
			{filterType !== FilterType.IS_EMPTY &&
				filterType !== FilterType.IS_NOT_EMPTY && (
					<FilterTextInput
						id={id}
						tagIds={tagIds}
						columnTags={columnTags}
						cellType={cellType}
						text={text}
						onTextChange={onTextChange}
						onTagsChange={onTagsChange}
					/>
				)}
			<Stack
				grow
				justify="flex-end"
				align="center"
				spacing="lg"
				isHorizontal
			>
				<Button
					icon={<Icon lucideId="trash-2" />}
					ariaLabel="Delete filter rule"
					onClick={() => onDeleteClick(id)}
				/>
				<Switch
					value={isEnabled}
					ariaLabel={
						isEnabled ? "Disable filter rule" : "Enable filter rule"
					}
					onToggle={() => onToggle(id)}
				/>
			</Stack>
		</Wrap>
	);
}
