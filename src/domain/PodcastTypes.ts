import {EpisodeType} from './EpisodeTypes';

export interface PodcastDetailResponse {
	resultCount: number;
	results: PodcastDetail[];
}

export interface PodcastDetail {
	wrapperType: string;
	kind: string;
	collectionId: number;
	trackId: number;
	artistName: string;
	collectionName: string;
	trackName: string;
	collectionCensoredName: string;
	trackCensoredName: string;
	collectionViewUrl: string;
	feedUrl: string;
	trackViewUrl: string;
	artworkUrl30: string;
	artworkUrl60: string;
	artworkUrl100: string;
	collectionPrice: number;
	trackPrice: number;
	collectionHdPrice: number;
	releaseDate: Date;
	collectionExplicitness: string;
	trackExplicitness: string;
	trackCount: number;
	trackTimeMillis: number;
	country: string;
	currency: string;
	primaryGenreName: string;
	contentAdvisoryRating: string;
	artworkUrl600: string;
	genreIds: string[];
	genres: string[];
	description: string | null | undefined;
	episodes: EpisodeType[]
}
