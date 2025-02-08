export interface NewsArticle {
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    source: {
      name: string;
    };
  }
  
  export interface AIResponse {
    text: string;
    language: string;
  }