import React, { useRef } from "react";

import HeaderMenu from "../HeaderMenu";
import { CSS_MEASUREMENT_PIXEL_REGEX } from "src/services/string/regex";
import { numToPx, pxToNum } from "src/services/string/conversion";
import { SortDir } from "src/services/sort/types";
import { CellType } from "src/services/tableState/types";
import { useMenu } from "src/services/menu/hooks";
import { MenuLevel } from "src/services/menu/types";
import { MIN_COLUMN_WIDTH } from "src/services/tableState/constants";
import { useAppDispatch, useAppSelector } from "src/services/redux/hooks";
import {
	openMenu,
	closeTopLevelMenu,
	isMenuOpen,
} from "src/services/menu/menuSlice";

import "./styles.css";
import { usePosition } from "src/services/hooks";
import Icon from "../Icon";
import { IconType } from "src/services/icon/types";
import Stack from "../Stack";

interface Props {
	cellId: string;
	columnIndex: number;
	columnId: string;
	width: string;
	numColumns: number;
	markdown: string;
	shouldWrapOverflow: boolean;
	useAutoWidth: boolean;
	sortDir: SortDir;
	type: string;
	onMoveColumnClick: (columnId: string, moveRight: boolean) => void;
	onSortSelect: (columnId: string, sortDir: SortDir) => void;
	onInsertColumnClick: (columnId: string, insertRight: boolean) => void;
	onTypeSelect: (columnId: string, type: CellType) => void;
	onDeleteClick: (columnId: string) => void;
	onWidthChange: (columnId: string, width: string) => void;
	onAutoWidthToggle: (columnId: string, value: boolean) => void;
	onWrapOverflowToggle: (columnId: string, value: boolean) => void;
	onNameChange: (columnId: string, value: string) => void;
}

export default function EditableTh({
	cellId,
	columnIndex,
	columnId,
	width,
	markdown,
	useAutoWidth,
	shouldWrapOverflow,
	type,
	sortDir,
	numColumns,
	onWidthChange,
	onInsertColumnClick,
	onMoveColumnClick,
	onSortSelect,
	onTypeSelect,
	onDeleteClick,
	onWrapOverflowToggle,
	onAutoWidthToggle,
	onNameChange,
}: Props) {
	const mouseDownX = useRef(0);
	const isResizing = useRef(false);

	const menu = useMenu(MenuLevel.ONE);
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector((state) => isMenuOpen(state, menu));
	const { position, containerRef } = usePosition();

	function handleHeaderClick(e: React.MouseEvent) {
		//If we're clicking in the submenu, then don't close the menu
		const el = e.target as HTMLElement;
		if (el.closest(`#${menu.id}`)) return;

		if (isResizing.current) return;
		if (isOpen) {
			closeHeaderMenu();
		} else {
			openHeaderMenu();
		}
	}

	function openHeaderMenu() {
		dispatch(openMenu(menu));
	}

	function closeHeaderMenu() {
		dispatch(closeTopLevelMenu());
	}

	function handleMouseDown(e: React.MouseEvent) {
		mouseDownX.current = e.pageX;
		isResizing.current = true;
	}

	function handleMouseMove(e: MouseEvent) {
		if (width.match(CSS_MEASUREMENT_PIXEL_REGEX)) {
			const oldWidth = pxToNum(width);
			const dist = e.pageX - mouseDownX.current;
			const newWidth = oldWidth + dist;

			if (newWidth < MIN_COLUMN_WIDTH) return;
			onWidthChange(columnId, numToPx(newWidth));
		}
	}

	function handleMouseUp() {
		window.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
		setTimeout(() => {
			isResizing.current = false;
		}, 100);
	}

	const { top, left } = position;

	let icon = IconType.LABEL;

	if (type === CellType.TEXT) {
		icon = IconType.DESCRIPTION;
	} else if (type === CellType.NUMBER) {
		icon = IconType.NUMBERS;
	} else if (type === CellType.CHECKBOX) {
		icon = IconType.CHECK;
	} else if (type === CellType.DATE) {
		icon = IconType.CALENDAR_TODAY;
	}

	return (
		<div
			className="NLT__th-container NLT__selectable"
			ref={containerRef}
			onClick={handleHeaderClick}
			style={{
				width,
			}}
		>
			<HeaderMenu
				isOpen={isOpen}
				top={top}
				left={left}
				canDeleteColumn={numColumns > 1}
				columnId={columnId}
				cellId={cellId}
				shouldWrapOverflow={shouldWrapOverflow}
				useAutoWidth={useAutoWidth}
				id={menu.id}
				markdown={markdown}
				columnSortDir={sortDir}
				columnType={type}
				columnIndex={columnIndex}
				numColumns={numColumns}
				onSortSelect={onSortSelect}
				onMoveColumnClick={onMoveColumnClick}
				onInsertColumnClick={onInsertColumnClick}
				onTypeSelect={onTypeSelect}
				onDeleteClick={onDeleteClick}
				onClose={closeHeaderMenu}
				onAutoWidthToggle={onAutoWidthToggle}
				onWrapOverflowToggle={onWrapOverflowToggle}
				onNameChange={onNameChange}
			/>
			<div className="NLT__th-content">
				<Stack spacing="md">
					<Icon icon={icon} size="md" />
					{markdown}
				</Stack>
			</div>
			<div className="NLT__th-resize-container">
				{!useAutoWidth && (
					<div
						className="NLT__th-resize"
						onMouseDown={(e) => {
							closeHeaderMenu();
							//Prevents drag and drop
							//See: https://stackoverflow.com/questions/704564/disable-drag-and-drop-on-html-elements
							e.preventDefault();
							handleMouseDown(e);
							window.addEventListener(
								"mousemove",
								handleMouseMove
							);
							window.addEventListener("mouseup", handleMouseUp);
						}}
						onClick={(e) => {
							//Stop propagation so we don't open the header
							e.stopPropagation();
						}}
					/>
				)}
			</div>
		</div>
	);
}
