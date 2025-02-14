import { css } from "@emotion/react";
import { getEmbedCellContent } from "src/shared/cell-content/embed-cell-content";
import { AspectRatio, PaddingSize } from "src/shared/types";

import Embed from "./embed";

interface Props {
	isExternalLink: boolean;
	markdown: string;
	aspectRatio: AspectRatio;
	horizontalPadding: PaddingSize;
	verticalPadding: PaddingSize;
}

export default function EmbedCell({
	isExternalLink,
	markdown,
	aspectRatio,
	horizontalPadding,
	verticalPadding,
}: Props) {
	const content = getEmbedCellContent(markdown, {
		shouldRenderMarkdown: true,
		isExternalLink,
	});
	return (
		<div
			className="DataLoom__embed-cell"
			css={css`
				width: 100%;
				height: 100%;
				overflow: hidden;
			`}
		>
			<Embed
				isExternalLink={isExternalLink}
				content={content}
				aspectRatio={aspectRatio}
				horizontalPadding={horizontalPadding}
				verticalPadding={verticalPadding}
			/>
		</div>
	);
}
