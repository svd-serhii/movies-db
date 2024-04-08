import configuration from "../configuration";

async function get<TBody>(relativeUrl: string): Promise<TBody> {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${configuration.apiToken}`,
		},
	};

	const response = await fetch(
		`${configuration.apiUrl}/3${relativeUrl}`,
		options
	);
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
	total_pages: number;
	total_results: number;
}

interface Configuration {
	images: {
		base_url: string;
	};
}

interface ITmbdClient {
	getConfiguration: () => Promise<Configuration>;
	getNowPlaying: () => Promise<MovieDetails[]>;
}

export const client: ITmbdClient = {
	getConfiguration: async () => {
		const response = await get<Configuration>("/configuration");
		return response;
	},

	async getNowPlaying(): Promise<MovieDetails[]> {
		const response = await get<PageResponse<MovieDetails>>(
			"/movie/now_playing?"
		);
		return response.results;
	},
};
