export interface News {
  author: string;
  content: string | null;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
  source: {
    id: any;
    name: string;
  };
}

export type Articles = News[];
