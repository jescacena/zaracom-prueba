export interface EpisodeType {
	title: Array<EpisodeAuthor | string>;
	description: string;
	encoded: Encoded;
	episodeType: EpisodeAuthor;
	season: EpisodeAuthor;
	EpisodeAuthor: EpisodeAuthor;
	image: EpisodeImage;
	content: Content[];
	guid: GUID;
	clipId: EpisodeAuthor;
	pubDate: string;
	duration: EpisodeAuthor;
	enclosure: Enclosure;
	link: string;
}

export interface EpisodeAuthor {
	__prefix: string;
	__text: string;
}

export interface Content {
	player?: Player;
	_url: string;
	_type: string;
	__prefix: string;
}

export interface Player {
	_url: string;
	__prefix: string;
}

export interface Enclosure {
	_url: string;
	_length: string;
	_type: string;
}

export interface Encoded {
	__prefix: string;
	__cdata: string;
}

export interface GUID {
	_isPermaLink: string;
	__text: string;
}

export interface EpisodeImage {
	_href: string;
	__prefix: string;
}
