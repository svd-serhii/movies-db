import { useEffect } from "react";
import { Movie, moviesLoaded } from "../../reducers/movies";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../store";
import MovieCard from "./MovieCard";
import { client } from "../../api/tmdb";

import styles from "./Movies.module.scss";

interface Props {
	movies: Movie[];
}

function Movies({ movies }: Props) {
	const dispatch = useDispatch();

	useEffect(() => {
		async function loadData() {
			const config = await client.getConfiguration();
			const imageUrl = config.images.base_url;
			const results = await client.getNowPlaying();

			const mappedResults: Movie[] = results.map((m) => ({
				id: m.id,
				title: m.title,
				overview: m.overview,
				popularity: m.popularity,
				image: m.backdrop_path
					? `${imageUrl}w780${m.backdrop_path}`
					: undefined,
			}));

			dispatch(moviesLoaded(mappedResults));
		}

		loadData();
	}, [dispatch]);
	return (
		<section>
			<div className={styles.list}>
				{movies.map((m) => (
					<MovieCard
						key={m.id}
						id={m.id}
						title={m.title}
						overview={m.overview}
						popularity={m.popularity}
						image={m.image}
					/>
				))}
			</div>
		</section>
	);
}

const mapStateToProps = (state: RootState) => ({
	movies: state.movies.top,
});

const connector = connect(mapStateToProps);

export default connector(Movies);
