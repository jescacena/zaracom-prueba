import {EpisodeType} from '../domain/EpisodeTypes';
import {Entry} from '../domain/FeedTypes';
import {PodcastDetail} from '../domain/PodcastTypes';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com"

const TOP_PODCAST_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export const fetchTopPodcasts = async (): Promise<Entry[]> => {
	const response = await fetch(TOP_PODCAST_URL);
	const responseJson = await response.json();
	return responseJson.feed.entry.map((item: Entry) => {
		return {
			...item, viewData: getEntryViewData(item)
		}
	});
}

const getEntryViewData = (entry: Entry) => {
	return {
		id: entry.id.attributes['im:id'],
		image: getImageFromEntry(entry),
		author: entry['im:name'].label,
		title: entry.title.label
	}
}

const getImageFromEntry = (podcast: Entry): string | undefined => {
	const targetImage = podcast['im:image'].find(item => item.attributes.height === "170");

	if (!targetImage) {
		console.log('ERROR no image found for podcast', podcast.title);
		return undefined;
	}
	return targetImage.label;
}


////////////////////

const PODCAST_DETAIL_URL = `${CORS_PROXY}/https://itunes.apple.com/lookup?id=`;

export const fetchPodcastDetail = async (podcastId: string): Promise<PodcastDetail> => {
	const url = `${PODCAST_DETAIL_URL}${podcastId}`;
	const response = await fetch(url);
	const responseTxt = await response.text();
	const podcastDetail: PodcastDetail = JSON.parse(responseTxt).results[0];

	// Fetch rss episodes data
	const episodesRssData = await fetchEpisodesRssFeed(podcastDetail.feedUrl);

	return {
		...podcastDetail,
		description: extractDescriptionFromRss(episodesRssData),
		episodes: extractEpisodesFromRss(episodesRssData)
	};
}


const extractDescriptionFromRss = (rssData: Document): string | null | undefined => {
	const items = rssData.querySelectorAll("channel");
	const descriptionNode = items[0].querySelector('description');
	return descriptionNode?.childNodes[0].nodeValue;
}

const extractEpisodesFromRss = (rssData: Document): EpisodeType[] => {

	const items = rssData.querySelectorAll("item");

	let result: EpisodeType[] = [];

	items.forEach(item => {
		result.push({
			title: item.querySelector('title') ? item.querySelector('title')?.innerHTML : undefined,
			description: item.querySelector('description') ? item.querySelector('description')?.textContent : undefined,
			pubDate: item.querySelector('pubDate') ? formatDateFromRss(item.querySelector('pubDate')?.innerHTML) : undefined,
			duration: item.getElementsByTagName('itunes:duration')[0]?.innerHTML,
			audioUrl: item.querySelector('enclosure')?.attributes.getNamedItem('url')?.value
		});
	});

	return result;

}

const formatDateFromRss = (dateFromRss: string | undefined) => {

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	let tokens: string[] | undefined;
	let year;
	let day;
	let monthNumber;

	try {
		tokens = dateFromRss?.split(' ');
		if (!tokens || tokens.length < 3) {
			throw new Error("Error on parsing date");
		}
		year = tokens[3];
		day = parseInt(tokens[1]);
		monthNumber = months.indexOf(tokens[2]) >= 0 ? months.indexOf(tokens[2]) + 1 : null;

	} catch (error) {
		console.log('Error formatting date from rss: ', dateFromRss, error);
		return "0/0/0";
	}

	return `${day}/${monthNumber}/${year}`;

}

export const getDatesDifferenceInDays = (date1: Date, date2: Date) => {
	let difference = date1.getTime() - date2.getTime();
	return Math.ceil(difference / (1000 * 3600 * 24));
}

export const fetchEpisodesRssFeed = async (feedUrl: string): Promise<Document> => {
	const url = `${CORS_PROXY}/${feedUrl}`;
	const response = await fetch(url);
	const responseTxt = await response.text();
	return await new window.DOMParser().parseFromString(responseTxt, "text/xml");
}


