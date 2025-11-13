/**
 * Video Catalog Utilities
 * 
 * Functions for loading and filtering educational video resources.
 */

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
}

interface VideoCatalog {
  videos: Video[];
}

let cachedCatalog: VideoCatalog | null = null;

/**
 * Loads the video catalog from the JSON file
 * 
 * @returns Promise resolving to the video catalog
 */
export async function loadVideoCatalog(): Promise<VideoCatalog> {
  if (cachedCatalog) {
    return cachedCatalog;
  }

  try {
    const response = await fetch('/data/video-catalog.json');
    if (!response.ok) {
      throw new Error('Failed to load video catalog');
    }
    
    cachedCatalog = await response.json();
    return cachedCatalog as VideoCatalog;
  } catch (error) {
    console.error('Error loading video catalog:', error);
    return { videos: [] };
  }
}

/**
 * Filters videos by experience level
 * 
 * @param videos - Array of videos to filter
 * @param level - Experience level to filter by
 * @returns Filtered array of videos
 */
export function filterVideosByLevel(
  videos: Video[], 
  level: 'beginner' | 'intermediate' | 'advanced'
): Video[] {
  return videos.filter(video => video.level === level);
}

/**
 * Filters videos by topics
 * 
 * @param videos - Array of videos to filter
 * @param topics - Array of topics to match
 * @returns Filtered array of videos that match any of the topics
 */
export function filterVideosByTopics(
  videos: Video[], 
  topics: string[]
): Video[] {
  if (topics.length === 0) {
    return videos;
  }

  return videos.filter(video => 
    video.topics.some(topic => 
      topics.some(searchTopic => 
        topic.toLowerCase().includes(searchTopic.toLowerCase())
      )
    )
  );
}

/**
 * Gets recommended videos based on user profile and topics
 * 
 * @param experienceLevel - User's experience level
 * @param topics - Optional array of topics to filter by
 * @param limit - Maximum number of videos to return
 * @returns Promise resolving to array of recommended videos
 */
export async function getRecommendedVideos(
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner',
  topics: string[] = [],
  limit: number = 3
): Promise<Video[]> {
  const catalog = await loadVideoCatalog();
  let filtered = filterVideosByLevel(catalog.videos, experienceLevel);
  
  if (topics.length > 0) {
    filtered = filterVideosByTopics(filtered, topics);
  }
  
  return filtered.slice(0, limit);
}

/**
 * Formats video recommendations as markdown text for AI responses
 * 
 * @param videos - Array of videos to format
 * @returns Markdown formatted string
 */
export function formatVideosAsMarkdown(videos: Video[]): string {
  if (videos.length === 0) {
    return '';
  }

  let markdown = '\n\n**Recommended Educational Videos:**\n\n';
  
  videos.forEach((video, index) => {
    markdown += `${index + 1}. **[${video.title}](${video.url})** (${video.duration})\n`;
    markdown += `   ${video.description}\n\n`;
  });

  return markdown;
}
