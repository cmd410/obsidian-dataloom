import { Color } from "../color/types";

export enum SortDir {
	ASC = "asc",
	DESC = "desc",
	NONE = "default",
}

export enum CellType {
	TEXT = "text",
	NUMBER = "number",
	CURRENCY = "currency",
	TAG = "tag",
	MULTI_TAG = "multi-tag",
	DATE = "date",
	CHECKBOX = "checkbox",
	CREATION_TIME = "creation-time",
	LAST_EDITED_TIME = "last-edited-time",
}

export enum CurrencyType {
	UNITED_STATES = "USD",
	CANADA = "CAD",
	SINGAPORE = "SGB",
	EUROPE = "EUR",
	POUND = "GBP",
	RUSSIA = "RUB",
	AUSTRALIA = "AUD",
	JAPAN = "JPY",
	INDIA = "INR",
	CHINA = "CNY",
	BRAZIL = "BRL",
	COLOMBIA = "COP",
	MEXICO = "MXN",
	ARGENTINA = "ARS",
}

export interface Cell {
	id: string;
	columnId: string;
	rowId: string;
	markdown: string;
	isHeader: boolean;
}

export interface Tag {
	id: string;
	markdown: string;
	color: Color;
	columnId: string;
	cellIds: string[];
}
export interface Column {
	id: string;
	sortDir: SortDir;
	width: string;
	type: CellType;
	currencyType: CurrencyType;
	hasAutoWidth: boolean;
	shouldWrapOverflow: boolean;
	footerCellId: string;
}

export interface Row {
	id: string;
	menuCellId: string;
	creationTime: number;
	lastEditedTime: number;
}

export interface TableModel {
	columns: Column[];
	rows: Row[];
	cells: Cell[];
	tags: Tag[];
}

export interface TableState {
	model: TableModel;
	pluginVersion: number;
}
