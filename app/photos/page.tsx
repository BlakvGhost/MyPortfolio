import { Slide } from "../animation/Slide";
import Image from "next/image";
import { Metadata } from "next";
import PageHeading from "@/app/components/shared/PageHeading";
import { youtubeApiKey, youtubeChannelId } from "@/lib/env.api";
import { YoutubeWidget } from '../components/widgets/YoutubeWidget';
import YoutubeIframe from "../components/shared/YoutubeIframe";
import Social from "../components/shared/Social";

export const metadata: Metadata = {
  title: "YouTube Vidéos | Kabirou ALASSANE",
  metadataBase: new URL("https://username-blakvghost.com/photos"),
  description: "Explore youtube videos published by Kabirou ALASSANE",
  openGraph: {
    title: "YouTube Vidéos | Kabirou ALASSANE",
    url: "https://username-blakvghost.com/photos",
    description: "Explore youtube videos published by Kabirou ALASSANE",
    images:
      "https://res.cloudinary.com/dgtzqvecw/image/upload/fl_preserve_transparency/v1727365323/bannier-test_wn6z9m.jpg",
  },
};

export default async function Photos() {

  async function fetchVideos() {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&channelId=${youtubeChannelId}&part=snippet,id&order=date&maxResults=100`
      );
      const data = await response.json();
      const videoItems = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
      }));

      return videoItems;

    } catch (error) {
      // console.error("Erreur lors de la récupération des vidéos : ", error);
    }
  }

  const videos: { thumbnail: string, title: string, id: string }[] = await fetchVideos();

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <header className="mb-10">
        <Slide>
          <h1 className="max-w-3xl font-incognito font-semibold tracking-tight sm:text-5xl text-3xl mb-6 lg:leading-[3.7rem]">
            Vidéos YouTube
          </h1>
          <p className="max-w-2xl text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
            Liste des vidéos YouTube que j&lsquo;ai déjà publiées sur ma chaine
          </p>
          <Social type="youtube" />
        </Slide>
      </header>
      <figure className="my-6">
        <Slide className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
          {videos?.length > 0 ? (
            videos?.map((video) => (
              <div
                key={video.id}
              >
                <YoutubeIframe videoId={video.id} />
              </div>
            ))
          ) : (
            <p>Chargement des vidéos...</p>
          )}
        </Slide>
      </figure>
    </main>
  );
}
