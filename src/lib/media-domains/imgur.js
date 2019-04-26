const parseImgur = (post, data) => {
  // Imgur album, not supported
  if (post.url.includes('imgur.com/a/')) return false

  // Imgur gif
  if (post.url.includes('gifv')) {
    let mediaUrl = post.url.replace('gifv', 'mp4')

    data.embed = `
      <video preload="auto" autoplay="autoplay" loop="loop" muted>
        <source src="${mediaUrl}" type="video/mp4">
      </video>
    `

    return data
  }

  return false
}

export default parseImgur
