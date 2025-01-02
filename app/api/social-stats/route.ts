import { NextResponse } from 'next/server';

// You'll need to add these to your environment variables
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const TIKTOK_API_KEY = process.env.TIKTOK_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;

async function getYouTubeStats() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=YOUR_CHANNEL_ID&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    return data.items[0].statistics.subscriberCount;
  } catch (error) {
    console.error('YouTube API Error:', error);
    return null;
  }
}

async function getTwitterStats() {
  try {
    const response = await fetch(
      'https://api.twitter.com/2/users/YOUR_USER_ID?user.fields=public_metrics',
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return data.data.public_metrics.followers_count;
  } catch (error) {
    console.error('Twitter API Error:', error);
    return null;
  }
}

async function getGitHubStats() {
  try {
    const response = await fetch('https://api.github.com/users/kalanpeace', {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    return {
      followers: data.followers,
      publicRepos: data.public_repos,
    };
  } catch (error) {
    console.error('GitHub API Error:', error);
    return null;
  }
}

export async function GET() {
  const [youtubeStats, twitterStats, githubStats] = await Promise.all([
    getYouTubeStats(),
    getTwitterStats(),
    getGitHubStats(),
  ]);

  return NextResponse.json({
    youtube: youtubeStats,
    twitter: twitterStats,
    github: githubStats,
  });
} 