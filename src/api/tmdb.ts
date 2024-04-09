import configuration from "../configuration";

const apiBasePath = configuration.apiUrl;
const apiToken = configuration.apiToken;

async function get<TBody>(relativeUrl: string): Promise<TBody> {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${apiToken}`,
		},
	};

	const response = await fetch(`${apiBasePath}/3${relativeUrl}`, options);
	const json: TBody = await response.json();

	return json;
}

export interface MovieDetails {
	id: number;
	title: string;
	popularity: number;
	overview: string;
	backdrop_path?: string | null;
}

interface PageResponse<TResult> {
	page: number;
	results: TResult[];
	// total_pages: number;
	// total_results: number;
}

interface Configuration {
	images: {
		base_url: string;
	};
}

// interface ITmbdClient {
// 	getConfiguration: () => Promise<Configuration>;
// 	getNowPlaying: () => Promise<MovieDetails[]>;
// }

export const client = {
	async getConfiguration() {
		return get<Configuration>("/configuration");
	},

	async getNowPlaying(): Promise<MovieDetails[]> {
		const response = await get<PageResponse<MovieDetails>>(
			"/movie/now_playing?language=en-US&page=1"
		);
		return response.results;
	},
};
