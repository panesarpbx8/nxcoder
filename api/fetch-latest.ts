import { VercelRequest, VercelResponse } from '@vercel/node';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
	
  return await fn(req, res);
}

const handler = async (request: VercelRequest, response: VercelResponse) => {
	const url = 'https://nxcoder.vercel.app';

	let res = await fetch(url);
	let html = await res.text();
	
	let $ = cheerio.load(html);

	const latestBlogLink = $('.blog__block__info > a').attr('href');

	res = await fetch(latestBlogLink);
	html = await res.text();

	$ = cheerio.load(html);

	const getMetatag = (name) =>  
		$(`meta[property="og:${name}"]`).attr('content') ||  
		$(`meta[name="twitter:${name}"]`).attr('content') ||
		$(`meta[name=${name}]`).attr('content');

	const data = {
		url: latestBlogLink,
		title: getMetatag('title'),
		description: getMetatag('description'),
		image: getMetatag('image'),
		author: getMetatag('author'),
		authorLink: getMetatag('author-link'),
		authorImage: getMetatag('author-image'),
	}

	response.json(data);
}

module.exports = allowCors(handler);
