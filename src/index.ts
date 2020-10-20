import type { Readable } from "stream";

import { extname } from "path";
import { defaultValues } from "./constant";
import { highlightCode, validateFontPath, accumulateBuffer } from "./helper";
import { generateHTML } from "./template/template";
import { getWindowControls } from "./template/windowControls";
import { Options } from "./types/types";
import { generateImage } from "./generateImage";
import { Themes } from "./template/cssTheme";

export default async (
	code: string,
	options: Options = {}
): Promise<Buffer | Readable> => {
	const fontPath = await validateFontPath(options.fontPath);
	const maxWidth = code
		.split("\n")
		.reduce((max, cur) => (max > cur.length ? max : cur.length), 0);
	const templateOption = {
		fontSize: options.fontSize ?? defaultValues.fontSize,
		windowControl: getWindowControls(options.windowControl),
		borderColor: options.borderColor ?? defaultValues.borderColor,
		borderSize: options.borderSize ?? defaultValues.borderSize,
		fontFormat: extname(fontPath).slice(1),
		fontPath,
		maxWidth
	};
	const highlightedCode = highlightCode(code, options.language);
	const css = options.theme
		? Themes[options.theme]
		: Themes[defaultValues.theme];
	const returnType = options.type;
	const html = generateHTML(highlightedCode, css, templateOption);
	const image = generateImage(html, {});
	return returnType === "stream" ? image : accumulateBuffer(image);
};
