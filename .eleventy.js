const filters = require('./utils/filters.js')
const htmlMinTransform = require('./utils/transforms/html-min.js')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const site = require('./src/_data/site.json')

module.exports = function (config) {
  // Passthrough copy
  config.addPassthroughCopy('src/CNAME')
  config.addPassthroughCopy('src/images')
  config.addPassthroughCopy('src/js')
  config.addPassthroughCopy('src/projects')

  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName])
  })

  // Transforms
  // config.addTransform('htmlmin', htmlMinTransform)

  // Plugins
  config.addPlugin(syntaxHighlight)

  // Collections
  const livePosts = (post) => post.date <= new Date() && !post.data.draft

  config.addCollection('posts', (collection) => {
    return [
      ...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts),
    ].reverse()
  })

  config.addCollection('postFeed', (collection) => {
    return [...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)]
      .reverse()
      .slice(0, site.maxPostsPerPage)
  })

  return {
    pathPrefix: process.env.WEB_PATH_PREFIX || '',
    dir: { input: 'src', output: '_site' },
  }
}
