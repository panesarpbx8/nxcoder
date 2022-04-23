import { VercelRequest, VercelResponse } from '@vercel/node';

export function hello(request: VercelRequest, response: VercelResponse) {
  response.json({ message: 'hello' });
}

