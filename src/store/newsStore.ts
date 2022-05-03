import { defineStore } from "pinia";
import { backendService } from "@/services/backend";
import { NewsItem } from "@/types/news";

export type NewsStore = {
  news: NewsItem[];
  error: Error | null;
};

export const useNewsStore = defineStore("news_store", {
  state: (): NewsStore => ({
    news: [],
    error: null,
  }),

  getters: {
    getError(): string {
      if (this.error != null) {
        return this.error.message;
      } else {
        return "no err";
      }
    },
  },

  actions: {
    async fetchNews() {
      const [response, err] = await backendService.getNews();
      if (err != null) {
        this.$state = {
          news: [],
          error: err,
        };
        return;
      }

      this.$state = {
        news: response!.news,
        error: err,
      };
    },
  },
});

