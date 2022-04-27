import { VercelRequest, VercelResponse } from '@vercel/node';
import * as cheerio from 'cheerio';

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

  const baseUrl = `https://nxcoder.vercel.app`;

  let url = `${baseUrl}/blogs`;

  let res = await fetch(url);
  let html = await res.text();

  let $ = cheerio.load(html);
  let blogContainer = $('.blogs > .blog')[0];

  let s = cheerio.load(blogContainer);
  let href = s('.blog__cover > a').attr('href');

  let res2 = await fetch(baseUrl + href);
  let html2 = await res2.text();

  let $$ = cheerio.load(html2);
  
  const getMetatag = (name) =>  
    $$(`meta[property="og:${name}"]`).attr('content') ||  
    $$(`meta[name="twitter:${name}"]`).attr('content') ||
    $$(`meta[name=${name}]`).attr('content');
  
  const data = {
    url: getMetatag('url'),
    title: getMetatag('title'),
    description: getMetatag('description'),
    image: getMetatag('image'),
    author: getMetatag('author'),
    authorLink: getMetatag('author-link'),
    authorImage: getMetatag('author-image'),
  }
  
	response.json(data);
}

module.exports = handler;
