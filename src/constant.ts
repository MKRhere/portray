import type { Options } from "./types/types";
import { resolve } from "path";

type ignore = ["type", "language"];
type DefaultValues = Readonly<Required<Omit<Options, ignore[number]>>>;
export const defaultValues: DefaultValues = {
	fontPath: resolve("./resources/Firacode.ttf"),
	windowControl: 0,
	fontSize: 15,
	theme: "material",
	borderColor: "#ABB8C3",
	borderSize: 3,
	format: "png"
};

export const keywordTypes = <const>[
	"background",
	"text",
	"variable",
	"variable2",
	"attribute",
	"definition",
	"keyword",
	"operator",
	"property",
	"number",
	"string",
	"comment",
	"meta",
	"tag",
	"variable3"
];

export const supportedImageFormat = <const>["jpeg", "png"];
