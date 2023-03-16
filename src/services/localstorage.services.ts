import {Entry} from '../domain/FeedTypes';
import {PodcastDetail} from '../domain/PodcastTypes';

const ZARA_TOP_PODCASTS = "ZARA_TOP_PODCASTS";
const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const ZARA_PODCAST_BY_ID = "ZARA_PODCAST_BY_ID";

export const saveCacheForTopPodcastList = (podCastList: Entry[]) => {

	const now = new Date();
	const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

	const item = {
		value: podCastList,
		expiry: now.getTime() + ONE_DAY_IN_MILLISECONDS,
	}
	localStorage.setItem(ZARA_TOP_PODCASTS, JSON.stringify(item))
}

export const getTopPodcastListFromCache = (): Entry[] => {
	const cacheValue = localStorage.getItem(ZARA_TOP_PODCASTS)
	return cacheValue ? JSON.parse(cacheValue).value : null;
}


export const saveCacheForPodcast = (podCast: PodcastDetail) => {

	const now = new Date();

	const item = {
		value: podCast,
		expiry: now.getTime() + ONE_DAY_IN_MILLISECONDS,
	}
	localStorage.setItem(`${ZARA_PODCAST_BY_ID}_${podCast.collectionId}`, JSON.stringify(item))
}

export const getPodcastFromCache = (podcastId: string): PodcastDetail => {
	const cacheValue = localStorage.getItem(`${ZARA_PODCAST_BY_ID}_${podcastId}`)
	return cacheValue ? JSON.parse(cacheValue).value : null;
}

