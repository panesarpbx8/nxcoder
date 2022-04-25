export interface Blog {
  frontmatter: Frontmatter;
  file: string;
  url: string | undefined;
  content?: string;
  getHeaders(): Promise<{
      depth: number;
      slug: string;
      text: string;
  }[]>;
}

export interface Frontmatter {
  title: string;
  headline: string;
  hashtags: string[];
  createdAt: string;
  source: string;
  author: string;
  authorImage: string;
  authorLink: string;
  slug: string;
}

export function sortByDate(blogs: Blog[]): Blog[] {
  return blogs.sort((a, b) => {
    return new Date(b.frontmatter.createdAt).getTime() - new Date(a.frontmatter.createdAt).getTime();
  });
}