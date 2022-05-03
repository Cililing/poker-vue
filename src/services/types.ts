export interface NewsItem {
  title: string;
  url: string;
  img: string;
}

export interface NewsResponse {
  news: Array<NewsItem>;
}
