export interface IFields {
	color: string;
	fontSize: number;
	padding: number;
}

export interface IFontStyleProps {
	fields: IFields;
	onChange: (name: string, value: string|number) => void;
}
