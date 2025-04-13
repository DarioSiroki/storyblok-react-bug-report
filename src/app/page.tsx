import { StoryblokClient } from "@storyblok/react";
import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok"; // Remember to import from the local file
import { DynamicServerError } from "next/dist/client/components/hooks-server-context";

export default async function Home() {
  const { data } = await fetchData();

  return (
    <div>
      <StoryblokStory story={data.story} />
    </div>
  );
}

async function fetchData() {
  const storyblokApi: StoryblokClient = getStoryblokApi();

  const response = storyblokApi.get(
    `cdn/stories/home`,
    {
      version: "draft",
    },
    {
      // In reality, you would probably conditionally cache for production builds and
      // not cache for preview environment or when NextJS's draft mode is enabled
      cache: "no-store",
    }
  );

  return response;
}

// WORKING VERSION BELOW

// async function fetchData() {
//   try {
//     const storyblokApi: StoryblokClient = getStoryblokApi();

//     const response = await storyblokApi.get(
//       `cdn/stories/home`,
//       {
//         version: "draft",
//       },
//       {
//         cache: "no-store",
//       }
//     );

//     return response;
//   } catch (error) {
//     // Handle dynamic server usage error because the library is transforming it and NextJS doesn't recognize it
//     if (
//       typeof error === "object" &&
//       error !== null &&
//       "message" in error &&
//       typeof error.message === "object" &&
//       error.message !== null &&
//       "digest" in error.message &&
//       typeof error.message.digest === "string" &&
//       error.message.digest.includes("DYNAMIC_SERVER_USAGE")
//     ) {
//       console.log("caught");
//       throw new DynamicServerError("Dynamic server usage detected");
//     } else {
//       console.log("not caught");
//       throw error;
//     }
//   }
// }
