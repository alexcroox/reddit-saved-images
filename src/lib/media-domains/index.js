import getImgur from './imgur'
import { getRedditVideo } from './reddit'

// Given a post object from reddit, can we determine
// if the post is an image or animated gif in the form of a video...
const getMedia = post => {
  // Comment not post
  if (post.parent_id) return false

  let data = {
    image: null,
    embed: null
  }

  // Plain image? Lets just return the data immediately
  if (
    !post.url.includes('.gifv') &&
    (post.url.includes('.jpg') ||
      post.url.includes('.png') ||
      post.url.includes('.gif'))
  ) {
    data.image = post.url
    return data
  }

  if (post.domain.includes('imgur.com')) return getImgur(post, data)

  if (post.domain.includes('v.redd.it')) return getRedditVideo(post, data)

  return false
}

export default getMedia
