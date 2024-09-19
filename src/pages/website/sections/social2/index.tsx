import React from "react"
import { Image, Stack } from "react-bootstrap";
import TweetEmbed from 'react-tweet-embed'


const SectionSocial2 = () => { 
  return (
    <Stack id="social" className="section-social" direction="vertical" gap={2}>
      <h1 className="mb-3">What people are saying</h1>
      <div className="posts" data-theme="dark">
        <TweetEmbed tweetId={'1826674373887230021'} options={{ theme: 'dark', cards: 'hidden', conversation: "none" }} />
        <TweetEmbed tweetId={'1832042160260047029'} options={{ theme: 'dark', cards: 'hidden' }} />
        <TweetEmbed tweetId={'1834223428183679090'} options={{ theme: 'dark', cards: 'hidden' }} />

        <TweetEmbed tweetId={'1834534034463965397'} options={{ theme: 'dark', cards: 'hidden' }} />
        <TweetEmbed tweetId={'1834612839039803703'} options={{ theme: 'dark', cards: 'hidden' }} />
        <TweetEmbed tweetId={'1835989593918750799'} options={{ theme: 'dark', cards: 'hidden' }} />
      </div>
    </Stack>
  )
}

export default SectionSocial2;
