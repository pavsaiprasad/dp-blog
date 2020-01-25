import React from 'react';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';
import config from '../website-config';
import Helmet from 'react-helmet';

const DisqusComments = (props: any) => {

  const post = props.post;
  let width = '';
  let height = '';
  if (post.frontmatter.image && post.frontmatter.image.childImageSharp) {
    width = post.frontmatter.image.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0];
    height = String(Number(width) / post.frontmatter.image.childImageSharp.fluid.aspectRatio);
  }

  let postTitle = post.frontmatter.title as string;
  let postURL = String(props.postURL) as string;
  let disqusConfig = {
    url: postTitle,
    identifier: postURL,
    title: postTitle
  }
  return (
    <>
      <meta name="description" content={post.excerpt} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={postURL} />
        {(post.frontmatter.image && post.frontmatter.image.childImageSharp) && (
          <meta property="og:image" content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`} />
        )}
        <meta property="article:published_time" content={post.frontmatter.date} />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post.frontmatter.tags && (
          <meta property="article:tag" content={post.frontmatter.tags[0]} />
        )}

        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.facebook && <meta property="article:author" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.frontmatter.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:url" content={postURL} />
        {(post.frontmatter.image && post.frontmatter.image.childImageSharp) && (
          <meta name="twitter:image" content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`} />
        )}
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post.frontmatter.author.id} />
        <meta name="twitter:label2" content="Filed under" />
        {post.frontmatter.tags && <meta name="twitter:data2" content={post.frontmatter.tags[0]} />}
        {config.twitter && <meta name="twitter:site" content={`@${config.twitter.split('https://twitter.com/')[1]}`} />}
        {config.twitter && <meta
          name="twitter:creator"
          content={`@${config.twitter.split('https://twitter.com/')[1]}`}
        />}
        {width && <meta property="og:image:width" content={width} />}
        {height && <meta property="og:image:height" content={height} />}
      <h1>{postTitle}</h1>
        <h2>{postURL}</h2>
      <CommentCount config={disqusConfig} placeholder={'...'} />
      /* Post Contents */
      <Disqus config={disqusConfig} />
    </>
  )
}

export default DisqusComments