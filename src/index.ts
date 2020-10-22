import type { Readable } from "stream";

import { extname } from "path";
import { defaultValues } from "./constant";
import { generateHTML } from "./template/template";
import { getWindowControls } from "./template/windowControls";
import { Options } from "./types/types";
import { generateImage } from "./generateImage";
import { Themes } from "./template/cssTheme";
import {
	highlightCode,
	validateFontPath,
	accumulateBuffer,
	getImageFormat
} from "./helper";

export const generate = async (
	code: string,
	options: Options = {}
): Promise<Buffer | Readable> => {
	const fontPath = await validateFontPath(options.fontPath);
	const maxWidth = code
		.split("\n")
		.reduce((max, line) => (max > line.length ? max : line.length), 0);
	const imageFormat = getImageFormat(options.format);
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
	const css = Themes[options.theme ?? defaultValues.theme];
	const html = generateHTML(highlightedCode, css, templateOption);
	const image = generateImage(html, { format: imageFormat });
	return options.type === "stream" ? image : accumulateBuffer(image);
};
