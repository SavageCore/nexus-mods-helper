declare const GM: {
	setClipboard: (data: string) => void;
	getValue: <T>(key: string, defaultValue: T) => Promise<T>;
	setValue: <T>(key: string, value: T) => Promise<void>;
	registerMenuCommand: (name: string, command: () => void | Promise<void>) => void;
};

let testedGameVersion = "7.03.1";

GM.getValue("testedGameVersion", testedGameVersion).then((savedVersion) => {
	testedGameVersion = savedVersion;
});

GM.registerMenuCommand("Set tested game version", async () => {
	const version = window.prompt("Tested game version", testedGameVersion)?.trim();
	if (version) {
		testedGameVersion = version;
		await GM.setValue("testedGameVersion", version);
	}
});

// If we're on a mods page
// if (window.location.href.includes("mods")) {
// Get the mod name
const modName = document.querySelector("#pagetitle > h1")?.textContent;
console.log(`modName: ${modName}`);
// If we have a mod name
if (modName) {
		// Create a new button as below
		// <li id="action-manual">
		// 	<a
		// 		class="btn inline-flex popup-btn-ajax"
		// 		href="/Core/Libs/Common/Widgets/ModRequirementsPopUp?id=8763&amp;game_id=2531"
		// 		tabindex="0"
		// 	>
		// 		<svg title="" class="icon icon-manual">
		// 			<use xlink:href="https://www.nexusmods.com/assets/images/icons/icons.svg#icon-manual"></use>
		// 		</svg>{" "}
		// 		<span class="flex-label">Manual</span>
		// 	</a>
		// </li>;
		// Create the button
		const button = document.createElement("li");
		// Set the button ID
		button.id = "action-modinfo";
		const action = document.createElement("a");
		action.className = "btn inline-flex download-open-tab";
		action.style.cssText = "background-color: var(--theme-primary); cursor: pointer;";
		action.href = "";
		action.tabIndex = 0;
		action.innerHTML = '<span class="flex-label">&#x2B07; Mod Info</span>';
		button.appendChild(action);
		// Get the download button list item
		const buttonList = document
			.querySelector('mod-download-modal[placement="mod_page"][trigger="compact"]')
			?.closest("li");
		// If we have a download button list item
		if (buttonList) {
			console.log(`buttonList: ${buttonList}`);
			// Insert the new button before the existing button
			buttonList.after(button);
			// Add an event listener to the button
			button.addEventListener("click", (e) => {
				e.preventDefault();
				const getText = (selector: string) =>
					document.querySelector(selector)?.textContent?.trim().replace(/\s+/g, " ") ?? "";
				const author = document.querySelector<HTMLAnchorElement>(
					".sideitem a[href*='/users/']"
				);
				const authorName = author?.textContent?.trim() ?? "";
				const authorLink = author
					? `=HYPERLINK("${author.href}","${authorName.replace(/"/g, '""')}")`
					: "";
				const row = [
					getText("#pagetitle > h1"),
					"",
					testedGameVersion,
					window.location.href,
					authorLink,
				].join("\t");

				GM.setClipboard(row);
			});
		}
}
// }
