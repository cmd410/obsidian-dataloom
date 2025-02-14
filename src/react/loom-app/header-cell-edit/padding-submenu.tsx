import MenuItem from "src/react/shared/menu-item";
import Submenu from "./submenu";
import { PaddingSize } from "src/shared/types";

interface Props {
	title: string;
	value: PaddingSize;
	onValueClick: (value: PaddingSize) => void;
	onBackClick: () => void;
}

export default function PaddingSubmenu({
	title,
	value,
	onValueClick,
	onBackClick,
}: Props) {
	return (
		<Submenu title={title} onBackClick={onBackClick}>
			{Object.values(PaddingSize).map((size) => (
				<MenuItem
					key={size}
					name={size}
					onClick={() => onValueClick(size)}
					isSelected={size === value}
				/>
			))}
		</Submenu>
	);
}
