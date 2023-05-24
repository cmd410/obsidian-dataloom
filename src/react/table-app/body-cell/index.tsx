import React from "react";
import { Notice } from "obsidian";

import TextCell from "../text-cell";
import TagCell from "../tag-cell";
import CheckboxCell from "../checkbox-cell";
import DateCell from "../date-cell";
import NumberCell from "../number-cell";
import NumberCellEdit from "../number-cell-edit";
import TextCellEdit from "../text-cell-edit";
import TagCellEdit from "../tag-cell-edit";
import DateCellEdit from "../date-cell-edit";
import MultiTagCell from "../multi-tag-cell";
import Menu from "../../shared/menu";

import {
	CellType,
	CurrencyType,
	DateFormat,
	Tag,
} from "src/shared/types/types";
import { useMenu } from "src/shared/menu/hooks";
import { MenuLevel } from "src/shared/menu/types";
import { useAppDispatch } from "src/redux/global/hooks";

import LastEditedTimeCell from "../last-edited-time-cell";
import CreationTimeCell from "../creation-time-cell";
import {
	CHECKBOX_MARKDOWN_CHECKED,
	CHECKBOX_MARKDOWN_UNCHECKED,
} from "src/shared/table-state/constants";
import { isCheckboxChecked } from "src/shared/validators";

import "./styles.css";
import { useDidMountEffect } from "src/shared/hooks";
import { updateSortTime } from "src/redux/global/global-slice";
import { Color } from "src/shared/types/types";
import CurrencyCell from "../currency-cell";
import CurrencyCellEdit from "../currency-cell-edit";
import { shiftMenuIntoViewContent } from "src/shared/menu/utils";
import MenuTrigger from "src/react/shared/menu-trigger";

interface Props {
	columnType: string;
	cellId: string;
	rowId: string;
	dateTime: number | null;
	dateFormat: DateFormat;
	columnCurrencyType: CurrencyType;
	columnId: string;
	markdown: string;
	rowCreationTime: number;
	rowLastEditedTime: number;
	width: string;
	columnTags: Tag[];
	cellTagIds: string[];
	shouldWrapOverflow: boolean;
	onTagRemoveClick: (cellId: string, rowId: string, tagId: string) => void;
	onTagMultipleRemove: (
		cellId: string,
		rowId: string,
		tagIds: string[]
	) => void;
	onTagClick: (
		cellId: string,
		rowId: string,
		tagId: string,
		isMultiTag: boolean
	) => void;
	onContentChange: (cellId: string, rowId: string, value: string) => void;
	onTagAdd: (
		cellId: string,
		columnId: string,
		rowId: string,
		markdown: string,
		color: Color,
		isMultiTag: boolean
	) => void;
	onTagDelete: (columnId: string, tagId: string) => void;
	onTagColorChange: (columnId: string, tagId: string, color: Color) => void;
	onDateFormatChange: (columnId: string, value: DateFormat) => void;
	onDateTimeChange: (
		cellId: string,
		rowId: string,
		value: number | null
	) => void;
}

export default function BodyCell({
	cellId,
	columnId,
	rowId,
	markdown,
	dateFormat,
	dateTime,
	columnCurrencyType,
	columnType,
	rowCreationTime,
	rowLastEditedTime,
	columnTags,
	cellTagIds,
	width,
	shouldWrapOverflow,
	onTagRemoveClick,
	onTagMultipleRemove,
	onTagColorChange,
	onTagDelete,
	onTagClick,
	onContentChange,
	onDateFormatChange,
	onDateTimeChange,
	onTagAdd,
}: Props) {
	const {
		menu,
		menuPosition,
		isMenuOpen,
		menuCloseRequestTime,
		isMenuVisible,
		openMenu,
		closeTopMenu,
	} = useMenu(
		MenuLevel.ONE,
		columnType === CellType.DATE ||
			columnType === CellType.TAG ||
			columnType === CellType.MULTI_TAG
	);

	const dispatch = useAppDispatch();

	//If we open a menu and then close it, we want to sort all rows
	//TODO optimize?
	useDidMountEffect(() => {
		if (!isMenuOpen) {
			dispatch(updateSortTime());
		}
	}, [isMenuOpen]);

	async function handleCellContextClick() {
		try {
			await navigator.clipboard.writeText(markdown);
			new Notice("Copied text to clipboard");
		} catch (err) {
			console.log(err);
		}
	}

	function toggleCheckbox() {
		const isChecked = isCheckboxChecked(markdown);

		if (isChecked) {
			handleCheckboxChange(CHECKBOX_MARKDOWN_UNCHECKED);
		} else {
			handleCheckboxChange(CHECKBOX_MARKDOWN_CHECKED);
		}
	}

	function handleBackspaceDown() {
		if (
			columnType === CellType.TEXT ||
			columnType === CellType.NUMBER ||
			columnType === CellType.CURRENCY
		) {
			onContentChange(cellId, rowId, "");
		} else if (columnType === CellType.DATE) {
			onDateTimeChange(cellId, rowId, null);
		} else if (columnType === CellType.CHECKBOX) {
			onContentChange(cellId, rowId, CHECKBOX_MARKDOWN_UNCHECKED);
		} else if (
			columnType === CellType.TAG ||
			columnType === CellType.MULTI_TAG
		) {
			onTagMultipleRemove(cellId, rowId, cellTagIds);
		}
	}

	function handleEnterDown() {
		if (columnType === CellType.CHECKBOX) toggleCheckbox();
	}

	function handleMenuTriggerClick(e: React.MouseEvent) {
		if (columnType === CellType.CHECKBOX) {
			toggleCheckbox();
		} else if (
			columnType !== CellType.CREATION_TIME &&
			columnType !== CellType.LAST_EDITED_TIME
		) {
			const el = e.target as HTMLInputElement;

			//If we clicked on the link for a file or tag, return
			if (el.nodeName === "A") return;
			openMenu(menu);
		}
	}

	function handleTagAdd(markdown: string, color: Color) {
		onTagAdd(
			cellId,
			columnId,
			rowId,
			markdown,
			color,
			columnType === CellType.MULTI_TAG
		);
	}

	function handleRemoveTagClick(tagId: string) {
		onTagRemoveClick(cellId, rowId, tagId);
	}

	function handleTagColorChange(tagId: string, color: Color) {
		onTagColorChange(columnId, tagId, color);
	}

	function handleTagDeleteClick(tagId: string) {
		onTagDelete(columnId, tagId);
	}

	function handleTagClick(tagId: string) {
		onTagClick(cellId, rowId, tagId, columnType === CellType.MULTI_TAG);
	}

	function handleTextInputChange(value: string) {
		onContentChange(cellId, rowId, value);
	}

	function handleNumberInputChange(value: string) {
		onContentChange(cellId, rowId, value);
	}

	function handleCheckboxChange(value: string) {
		onContentChange(cellId, rowId, value);
	}

	function handleCurrencyChange(value: string) {
		onContentChange(cellId, rowId, value);
	}

	function handleDateFormatChange(value: DateFormat) {
		onDateFormatChange(columnId, value);
	}

	function handleDateTimeChange(value: number | null) {
		onDateTimeChange(cellId, rowId, value);
	}

	function handleMenuClose() {
		closeTopMenu();
	}

	const {
		position: { top, left },
		isMenuReady,
	} = shiftMenuIntoViewContent({
		menuId: menu.id,
		menuPositionEl: menuPosition.positionRef.current,
		menuPosition: menuPosition.position,
	});

	const { width: measuredWidth, height: measuredHeight } =
		menuPosition.position;

	let menuHeight = measuredHeight;
	if (
		columnType === CellType.TAG ||
		columnType === CellType.MULTI_TAG ||
		columnType === CellType.DATE ||
		columnType === CellType.NUMBER ||
		columnType === CellType.CURRENCY
	) {
		menuHeight = 0;
	}

	let menuWidth = measuredWidth;
	if (columnType === CellType.TAG || columnType === CellType.MULTI_TAG) {
		menuWidth = 250;
	} else if (columnType == CellType.DATE) {
		menuWidth = 175;
	}

	let className = "NLT__td-container";
	if (
		columnType === CellType.LAST_EDITED_TIME ||
		columnType === CellType.CREATION_TIME
	) {
		className += " NLT__default-cursor";
	}

	const cellTags = columnTags.filter((tag) => cellTagIds.includes(tag.id));

	return (
		<>
			<MenuTrigger
				menuId={menu.id}
				onClick={handleMenuTriggerClick}
				shouldMenuRequestOnClose={menu.shouldRequestOnClose}
				onEnterDown={handleEnterDown}
				onBackspaceDown={handleBackspaceDown}
				canMenuOpen={
					columnType !== CellType.CHECKBOX &&
					columnType !== CellType.CREATION_TIME &&
					columnType !== CellType.LAST_EDITED_TIME
				}
			>
				<div
					ref={menuPosition.positionRef}
					onContextMenu={handleCellContextClick}
					className={className}
					style={{
						width,
					}}
				>
					{columnType === CellType.TEXT && (
						<TextCell
							markdown={markdown}
							shouldWrapOverflow={shouldWrapOverflow}
						/>
					)}
					{columnType === CellType.NUMBER && (
						<NumberCell
							value={markdown}
							shouldWrapOverflow={shouldWrapOverflow}
						/>
					)}
					{columnType === CellType.CURRENCY && (
						<CurrencyCell
							value={markdown}
							currencyType={columnCurrencyType}
							shouldWrapOverflow={shouldWrapOverflow}
						/>
					)}
					{columnType === CellType.TAG && cellTags.length === 1 && (
						<TagCell
							markdown={cellTags[0].markdown}
							color={cellTags[0].color}
							shouldWrapOverflow={shouldWrapOverflow}
						/>
					)}
					{columnType === CellType.MULTI_TAG &&
						cellTags.length !== 0 && (
							<MultiTagCell
								cellTags={cellTags}
								shouldWrapOverflow={shouldWrapOverflow}
							/>
						)}
					{columnType === CellType.DATE && (
						<DateCell value={dateTime} format={dateFormat} />
					)}
					{columnType === CellType.CHECKBOX && (
						<CheckboxCell
							value={markdown}
							onCheckboxChange={handleCheckboxChange}
						/>
					)}
					{columnType === CellType.CREATION_TIME && (
						<CreationTimeCell
							value={rowCreationTime}
							format={dateFormat}
							shouldWrapOverflow={shouldWrapOverflow}
						/>
					)}
					{columnType === CellType.LAST_EDITED_TIME && (
						<LastEditedTimeCell
							value={rowLastEditedTime}
							format={dateFormat}
							shouldWrapOverflow={shouldWrapOverflow}
						/>
					)}
				</div>
			</MenuTrigger>
			<Menu
				id={menu.id}
				isReady={isMenuReady}
				isOpen={isMenuOpen}
				top={top}
				left={left}
				width={menuWidth}
				height={menuHeight}
			>
				{columnType === CellType.TEXT && (
					<TextCellEdit
						shouldWrapOverflow={shouldWrapOverflow}
						value={markdown}
						isMenuVisible={isMenuVisible}
						onChange={handleTextInputChange}
					/>
				)}
				{columnType === CellType.NUMBER && (
					<NumberCellEdit
						value={markdown}
						isMenuVisible={isMenuVisible}
						onChange={handleNumberInputChange}
					/>
				)}
				{(columnType === CellType.TAG ||
					columnType === CellType.MULTI_TAG) && (
					<TagCellEdit
						isMenuVisible={isMenuVisible}
						menuCloseRequestTime={menuCloseRequestTime}
						menuPosition={menuPosition}
						columnTags={columnTags}
						cellTags={cellTags}
						onTagColorChange={handleTagColorChange}
						onTagAdd={handleTagAdd}
						onRemoveTag={handleRemoveTagClick}
						onTagClick={handleTagClick}
						onTagDelete={handleTagDeleteClick}
						onMenuClose={handleMenuClose}
					/>
				)}
				{columnType === CellType.DATE && (
					<DateCellEdit
						isMenuVisible={isMenuVisible}
						menuPosition={menuPosition}
						value={dateTime}
						menuCloseRequestTime={menuCloseRequestTime}
						dateFormat={dateFormat}
						onDateTimeChange={handleDateTimeChange}
						onDateFormatChange={handleDateFormatChange}
						onMenuClose={handleMenuClose}
					/>
				)}
				{columnType === CellType.CURRENCY && (
					<CurrencyCellEdit
						isMenuVisible={isMenuVisible}
						value={markdown}
						onChange={handleCurrencyChange}
					/>
				)}
			</Menu>
		</>
	);
}
