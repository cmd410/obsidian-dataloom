import NltPlugin from "../../main";
import React, { useState, useContext, useEffect } from "react";
import { DEBUG } from "src/constants";
import { logFunc } from "src/services/debug";

const FocusContext = React.createContext(false);

export const useTableFocus = () => {
	return useContext(FocusContext);
};

const COMPONENT_NAME = "FocusProvider";

interface Props {
	children: React.ReactNode;
	plugin: NltPlugin;
	tableId: string;
}

export default function FocusProvider({ children, plugin, tableId }: Props) {
	const [isFocused, setFocus] = useState(false);

	function handleFocus() {
		if (DEBUG.FOCUS_PROVIDER) logFunc(COMPONENT_NAME, "handleFocus");
		setFocus(true);
		plugin.focusTable({
			tableId,
		});
	}

	function handleBlur() {
		if (DEBUG.FOCUS_PROVIDER) logFunc(COMPONENT_NAME, "handleBlur");
		setFocus(false);
		plugin.blurTable();
	}

	useEffect(() => {
		if (plugin.focused) {
			if (plugin.focused.tableId === tableId) {
				// setTimeout(() => {
				setFocus(true);
				// }, 1);
			}
		}
	}, []);

	useEffect(() => {
		//TODO possibly refactor?
		function handleMouseUp(e: MouseEvent) {
			if (e.target instanceof Element) {
				let el = e.target;
				let isFocused = false;

				while (el) {
					if (el.className === "view-content") break;
					//We need to check the type because the an svg
					//element has a className of SVGAnimatedString
					//See: https://stackoverflow.com/a/37949156
					if (typeof el.className === "string") {
						if (el.className.includes("NLT")) {
							isFocused = true;
							break;
						}
					}
					el = el.parentElement;
				}
				if (isFocused) {
					handleFocus();
				} else {
					handleBlur();
				}
			}
		}
		window.addEventListener("mouseup", handleMouseUp);
		return () => window.removeEventListener("mouseup", handleMouseUp);
	}, []);

	return (
		<div>
			<FocusContext.Provider value={isFocused}>
				{children}
			</FocusContext.Provider>
		</div>
	);
}
