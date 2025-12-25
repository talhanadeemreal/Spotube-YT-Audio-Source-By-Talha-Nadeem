import { Source, SourceMatch, Track } from "@spotube-app/plugin";

export default class AudioSourceEndpoint extends Source {
  apiKey = "AIzaSyDQ8goZaggOX_jlStD_siYKOf4vyiav4so";
  baseUrl = "https://www.googleapis.com/youtube/v3/search";

  async fetch(track: Track): Promise<SourceMatch | null> {
    const query = `${track.artists[0].name} - ${track.name} audio`;
    const encodedQuery = encodeURIComponent(query);
    const url = `${this.baseUrl}?part=snippet&type=video&maxResults=5&q=${encodedQuery}&key=${this.apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) return null;

      const data = await response.json();
      const items = data.items;

      if (items && items.length > 0) {
        const video = items[0];
        // Ensure we return a valid SourceMatch
        return {
          id: video.id.videoId,
          source: "youtube",
          quality: "high",
          // You can map more fields if ISourceMatch defines them
        } as SourceMatch;
      }
    } catch (e) {
      console.error("YouTube API Error", e);
    }
    return null;
  }
}
