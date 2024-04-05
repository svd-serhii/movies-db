import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
	id: number;
	title: string;
	overview: string;
	popularity: number;
}

function MovieCard({ id, title, overview, popularity }: MovieCardProps) {
	return (
		<div className="Movies-card">
			<Link to={`/movies/${id}`}>{title}</Link>
			<div className="Movies-card-overview">{overview}</div>
			<div className="Movies-card-popularity">{popularity}</div>
		</div>
	);
}

export default MovieCard;
