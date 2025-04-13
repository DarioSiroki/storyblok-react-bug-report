import Page from "@/components/Page";
import Teaser from "@/components/Teaser";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_SB_TOKEN,
  use: [apiPlugin],
  components: {
    teaser: Teaser,
    page: Page,
  },
});
