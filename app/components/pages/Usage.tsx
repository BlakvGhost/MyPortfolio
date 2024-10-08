import { PortableText } from "@portabletext/react";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { CustomPortableTextFavicon } from "../shared/CustomPortableTextFavicon";
import { sanityFetch } from "@/lib/sanity.client";

export default async function Usage() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <section className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-bold tracking-tight">Usage</h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
        Outils, technologies et gadgets que j&apos;utilise au quotidien mais sans s&apos;y limiter.
        </p>
      </div>
      {profile.map((textBlock, id) => (
        <PortableText
          key={id}
          value={textBlock.usage}
          components={CustomPortableTextFavicon}
        />
      ))}
    </section>
  );
}
