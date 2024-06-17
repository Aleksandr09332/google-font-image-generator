import { fonts } from '../config/fonts'

export interface IRecord {
	key: string;
	title: string;
}

export const fontsSource: IRecord[] = fonts.map((item) => {
	const name: string = item.family.split(':')[0];

	return {
		key: name,
		title: name,
	}
});

export const initialFonts: string[] = fontsSource.filter(() => Math.random()*10 < 5).map((item) => item.key);
