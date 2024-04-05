import { Action, Reducer } from "redux";

export interface Movie {
	id: number;
	title: string;
	popularity: number;
	overview: string;
}

interface MovieState {
	top: Movie[];
}

const initialState: MovieState = {
	top: [
		{ id: 1, title: "Inception", popularity: 98, overview: "Dreams..." },
		{ id: 2, title: "The Godfather", popularity: 97, overview: "Godfather..." },
		{
			id: 3,
			title: "The Dark Knight",
			popularity: 96.5,
			overview: "Batman...",
		},
		{
			id: 4,
			title: "The Godfather Part II",
			popularity: 96,
			overview: "part II...",
		},
		{
			id: 5,
			title: "The Godfather Part III",
			popularity: 98,
			overview: "part III...",
		},
	],
};

const moviesReducer: Reducer<MovieState, Action> = (state, action) => {
	return initialState;
};

export default moviesReducer;
