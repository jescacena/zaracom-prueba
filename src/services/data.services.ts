import {EpisodeType} from '../domain/EpisodeTypes';
import {Entry} from '../domain/FeedTypes';
import {PodcastDetail} from '../domain/PodcastTypes';
import {getPodcastFromCache, getTopPodcastListFromCache, saveCacheForPodcast, saveCacheForTopPodcastList} from './localstorage.services';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com"

const TOP_PODCAST_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export const fetchTopPodcasts = async (): Promise<Entry[]> => {

	// First check cache
	const listFromCache = getTopPodcastListFromCache();
	if (listFromCache && listFromCache.length > 0) {
		console.log('TopPodcastList retrieved from Cache!');
		return listFromCache;
	}

	const response = await fetch(TOP_PODCAST_URL);
	const responseJson = await response.json();
	const result = responseJson.feed.entry.map((item: Entry) => {
		return {
			...item, viewData: getEntryViewData(item)
		}
	});

	saveCacheForTopPodcastList(result);
	return result;
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

	// First check cache
	const podcastFromCache = getPodcastFromCache(podcastId);
	if (podcastFromCache) {
		console.log(`Podcast ${podcastId} retrieved from Cache!`);
		return podcastFromCache;
	}

	const url = `${PODCAST_DETAIL_URL}${podcastId}`;
	const response = await fetch(url);
	const responseTxt = await response.text();
	const podcastDetail: PodcastDetail = JSON.parse(responseTxt).results[0];

	// Fetch rss episodes data
	const episodesRssData = await fetchEpisodesRssFeed(podcastDetail.feedUrl);

	const result = {
		...podcastDetail,
		description: extractDescriptionFromRss(episodesRssData),
		episodes: extractEpisodesFromRss(episodesRssData)
	};

	saveCacheForPodcast(result);
	return result;
}


const extractDescriptionFromRss = (rssData: Document): string | null | undefined => {

	let result;
	try {
		const items = rssData.querySelectorAll("channel");
		const descriptionNode = items[0].querySelector('description');
		result = descriptionNode?.childNodes[0].nodeValue;

	} catch (error) {
		console.log('Error on extract description', error);
	}
	return result;
}

const extractEpisodesFromRss = (rssData: Document): EpisodeType[] => {

	const items = rssData.querySelectorAll("item");

	let result: EpisodeType[] = [];

	items.forEach(item => {
		result.push({
			id: item.getElementsByTagName('itunes:episode')[0]?.innerHTML,
			title: item.querySelector('title') ? item.querySelector('title')?.innerHTML : undefined,
			description: item.querySelector('description') ? item.querySelector('description')?.textContent : undefined,
			pubDate: item.querySelector('pubDate') ? formatDateFromRss(item.querySelector('pubDate')?.innerHTML) : undefined,
			duration: formatDuration(item.getElementsByTagName('itunes:duration')[0]?.innerHTML),
			audioUrl: item.querySelector('enclosure')?.attributes.getNamedItem('url')?.value
		});
	});

	return result;

}

const formatDuration = (duration: string) => {
	if (!duration || duration.length < 3 || duration.indexOf(':') >= 0) {
		return duration;
	}
	const tokens = duration.split('');
	const minutes = tokens[tokens.length - 4] ? `${tokens[tokens.length - 4]}${tokens[tokens.length - 3]}` : `0${tokens[tokens.length - 3]}`;
	const seconds = `${tokens[tokens.length - 2]}${tokens[tokens.length - 1]}`;
	return `${minutes}:${seconds}`;
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


