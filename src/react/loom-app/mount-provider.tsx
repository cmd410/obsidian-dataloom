import { TFile, WorkspaceLeaf } from "obsidian";
import React from "react";

interface ContextProps {
	mountLeaf: WorkspaceLeaf;
	appId: string;
	loomFile: TFile;
	isMarkdownView: boolean;
}

const MountContext = React.createContext<ContextProps | null>(null);

export const useMountState = () => {
	const value = React.useContext(MountContext);
	if (value === null) {
		throw new Error(
			"useMountState() called without a <MountProvider /> in the tree."
		);
	}

	return value;
};

interface Props extends ContextProps {
	children: React.ReactNode;
}

export default function MountProvider({
	appId,
	mountLeaf,
	loomFile,
	isMarkdownView,
	children,
}: Props) {
	return (
		<MountContext.Provider
			value={{ appId, mountLeaf, loomFile, isMarkdownView }}
		>
			{children}
		</MountContext.Provider>
	);
}
