interface TopHeadlinesQueries {
  country?: string;
  category?: string;
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
}

interface EverythingQueries {
  q: string;
  qInTitle?: string;
  sources?: string;
  domains?: string;
  excludeDomains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: string;
  pageSize?: number;
  page?: number;
}

const baseURL: string = "newsapi.org";
const version: string = "v2";

const API_URL = (payload: string, queryParam: string): string =>{
  const apiUrl:string=`https://${baseURL}/${version}/${payload}?apiKey=${process.env.NEXT_PUBLIC_API_KEY}${queryParam}`;
  // console.log(apiUrl);
  return apiUrl
}

const topHeadlines = (query: TopHeadlinesQueries): string => {
  const q: string = query.q ? `&q=${query.q}` : "";
  const country: string = query.country ? `&country=${query.country}` : "";
  const category: string = query.category ? `&category=${query.category}` : "";
  const sources: string = query.sources ? `&sources=${query.sources}` : "";
  const pageSize: string = query.pageSize ? `&pageSize=${query.pageSize}` : "";
  const page: string = query.page ? `&page=${query.page}` : "";

  const queryParam: string = q + country + category + sources + page + pageSize;

  return API_URL("top-headlines", queryParam);
};

const everything = (query: EverythingQueries): string => {
  const q: string = query.q ? `&q=${query.q}` : "";
  const qInTitle: string = query.qInTitle ? `&qInTitle=${query.qInTitle}` : "";
  const sources: string = query.sources ? `&sources=${query.sources}` : "";
  const domains: string = query.domains ? `&domains=${query.domains}` : "";
  const excludeDomains: string = query.excludeDomains? `&excludeDomains=${query.excludeDomains}`: "";
  const from: string = query.from ? `&from=${query.from}` : "";
  const to: string = query.to ? `&to=${query.to}` : "";
  const language: string = query.language ? `&language=${query.language}` : "";
  const sortBy: string = query.sortBy ? `&sortBy=${query.sortBy}` : "";
  const pageSize: string = query.pageSize ? `&pageSize=${query.pageSize}` : "";
  const page: string = query.page ? `&page=${query.page}` : "";

  const queryParam: string = q + qInTitle + domains + excludeDomains + sources + page + pageSize + from + to + language + sortBy;

  return API_URL("everything", queryParam);
};

const newsAPI = () => { return {topHeadlines,everything,}; };

export default newsAPI;
