import objectGet from 'object-get'

export const getRedditVideo = (post, data) => {
  // Only return media data if reddit GIF
  let isRedditVideo = objectGet(post, 'media.reddit_video')

  if (!isRedditVideo || !isRedditVideo.is_gif) return false

  data.embed = `
    <video preload="auto" autoplay="autoplay" loop="loop" muted>
      <source src="${post.media.reddit_video.fallback_url}" type="video/mp4">
    </video>
  `

  return data
}
