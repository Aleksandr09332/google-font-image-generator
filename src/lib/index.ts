import opentype from 'opentype.js';
import { fonts } from '../config/fonts'

export const calculatePositionY = (index: number, fontSize: number, padding: number) => index * (fontSize + padding) + padding;

export const calculateFontStyles = (fontClassNames: string[], fontSize: number, padding: number) => {
	return fontClassNames.map((className, index) => {
		const y = calculatePositionY(index, fontSize, padding);

		return `.${className} { background-position: 0 -${y}px }`;
	}).join('\n');
}

export interface IRecord {
	key: string;
	title: string;
}

export const fontsSource: IRecord[] = fonts.map((item) => ({
	key: item.family,
	title: item.family,
}));

export const initialFonts: string[] = fontsSource.filter(() => Math.random()*10 < 3).map((item) => item.key);

export const getFontClassNames = (fontNames: string[]) => fontNames.map(
	(fontName) => fontName.toLowerCase().split(' ').join('-')
);

export interface IFontBuffer {
	family: string;
	arrayBuffer: ArrayBuffer;
}

export interface IGetFontSvgParam {
	array: IFontBuffer[];
	fontSize: number;
	padding: number;
	indent: number;
}

export const getFontSvg = ({ array, fontSize, padding, indent }: IGetFontSvgParam) => {
	const data = array.map(({ arrayBuffer, family }, index) => {
		const openFont = opentype.parse(arrayBuffer);
		const y = calculatePositionY(index, fontSize, padding);
		const path = openFont.getPath(family, indent, y, fontSize);

		return path.toSVG(1);
	})
	return data.join(' ');
}

interface IRunQueueParams<T, R> {
	array: T[];
	size: number;
	delay: number;
	callback: (array: T[]) => Promise<R[]>;
}

export const fnDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const runQueue = async <T = unknown, R = unknown>(params: IRunQueueParams<T, R>) => {
	const { array, size, delay, callback } = params;
	const result = [];
	const matrix: any[][] = [];
	let matrixIndex = 0;

	for (let i = 0; i < array.length; i++) {
		if (i % size === 0) {
			if (i !== 0) {
				matrixIndex++;
			}

			matrix[matrixIndex] = [];
		}

		matrix[matrixIndex].push(array[i])
	}

	for (let i = 0; i < matrix.length; i++) {
		const array = matrix[i];

		if (i !== 0) {
			await fnDelay(delay);
		}

		const dataArray = await callback(array);

		result.push(...dataArray);
	}

	return result;
}
