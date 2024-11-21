import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

const config: Config = {content: ["./src/**/*.{html,js,svelte,ts}"],
	plugins: [
		typography,
		daisyui
	],
	daisyui: {
		themes: ["retro"]
	}
};

export default config;
