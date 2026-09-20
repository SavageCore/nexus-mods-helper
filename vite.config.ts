import { defineConfig } from "vite";
import Userscript from "vite-userscript-plugin";
import { name, version } from "./package.json";

export default defineConfig((config) => {
	return {
		plugins: [
			Userscript({
				entry: "src/index.ts",
				header: {
					name,
					namespace: "https://savagecore.uk",
					version,
					description: "Helper for nexus mods",
					author: "SavageCore",
					match: ["https://www.nexusmods.com/*/mods/*"],
					grant: ["GM.setClipboard", "GM_setClipboard"],
					require: [
						"https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js",
					],
					"run-at": "document-idle",
				},
				server: {
					port: 2000,
				},
			}),
		],
	};
});
