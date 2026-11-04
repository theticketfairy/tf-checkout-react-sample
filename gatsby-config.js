require('dotenv').config({ path: '.env.' + process.env.NODE_ENV })

/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: 'Ticket Fairy checkout sample',
    siteUrl: 'https://www.yourdomain.tld'
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'images', path: './src/images/' },
      __key: 'images'
    }
  ]
}
