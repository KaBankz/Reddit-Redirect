// ==UserScript==
// @name          Reddit Redirect
// @namespace     https://github.com/KaBankz/Reddit-Redirect
// @version       0.0.3
// @description   Redirect from new reddit to old reddit
// @match         https://*.reddit.com/*
// @author        KaBankz
// @copyright     2021 KaBankz
// @license       MIT
// @homepageURL   https://github.com/KaBankz/Reddit-Redirect
// @supportURL    https://github.com/KaBankz/Reddit-Redirect/issues
// @icon          https://github.com/KaBankz/Reddit-Redirect/raw/master/icon.png
// @updateURL     https://raw.githubusercontent.com/KaBankz/Reddit-Redirect/master/reddit-redirect.meta.js
// @downloadURL   https://raw.githubusercontent.com/KaBankz/Reddit-Redirect/master/reddit-redirect.user.js
// @run-at        document-start
// @grant         GM_registerMenuCommand
// @noframes
// ==/UserScript==

const originalUrl = new URL(window.location);
const oldRedditUrl = () => {
  const url = new URL(originalUrl.href.replace('www.reddit.com', 'old.reddit.com'));
  url.searchParams.set('old', 'true');
  return url;
};
const newRedditUrl = () => {
  const url = new URL(originalUrl.href.replace('old.reddit.com', 'www.reddit.com'));
  url.searchParams.set('old', 'false');
  return url;
};
const userPreference = () => {
  const old = originalUrl.searchParams.get('old');
  return old === 'true' ? 'old' : old === 'false' ? 'new' : 'old';
};

if (userPreference() === 'old') {
  GM_registerMenuCommand('Go to New Reddit', () => window.location.replace(newRedditUrl()));
  if (originalUrl.href !== oldRedditUrl().href) window.location.replace(oldRedditUrl());
} else {
  GM_registerMenuCommand('Go to Old Reddit', () => window.location.replace(oldRedditUrl()));
  if (originalUrl.href !== newRedditUrl().href) window.location.replace(newRedditUrl());
}
