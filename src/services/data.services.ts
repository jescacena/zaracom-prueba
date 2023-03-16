import {EntryType} from 'perf_hooks';
import {Entry, FeedType} from '../domain/FeedTypes';

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

export const getImageFromEntry = (podcast: Entry): string | undefined => {
	const targetImage = podcast['im:image'].find(item => item.attributes.height === "170");

	if (!targetImage) {
		console.log('ERROR no image found for podcast', podcast.title);
		return undefined;
	}
	return targetImage.label;
}