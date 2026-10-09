import Image from "next/image";
import type { Photo as PhotoT } from "@/content/types";

/** A Commons photo with its required attribution. */
export function Photo({
  photo,
  sizes,
  className = "",
  imgClassName = "",
  eager = false,
  caption = true,
  fill = false,
  reveal = false,
}: {
  photo: PhotoT;
  sizes: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  caption?: boolean;
  fill?: boolean;
  /** Wipe into view on scroll (components/chrome/Choreo). */
  reveal?: boolean;
}) {
  const img = (
    <Image
      src={photo.src}
      alt={photo.alt}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      {...(fill ? { fill: true } : { width: photo.width, height: photo.height })}
      className={imgClassName}
    />
  );

  return (
    <figure className={className}>
      {fill ? (
        <div data-img-reveal={reveal || undefined} className="relative size-full overflow-hidden">
          {img}
        </div>
      ) : reveal ? (
        <div data-img-reveal>{img}</div>
      ) : (
        img
      )}
      {caption && <PhotoCredit photo={photo} />}
    </figure>
  );
}

export function PhotoCredit({ photo, className = "" }: { photo: PhotoT; className?: string }) {
  return (
    <figcaption className={`mt-2 text-xs leading-snug text-muted ${className}`}>
      {photo.caption && <span>{photo.caption}{photo.year ? `, ${photo.year}` : ""}. </span>}
      Photo:{" "}
      <a href={photo.credit.sourceUrl} className="underline hover:text-accent">
        {photo.credit.author}
      </a>
      ,{" "}
      {photo.credit.licenseUrl ? (
        <a href={photo.credit.licenseUrl} className="underline hover:text-accent">
          {photo.credit.license}
        </a>
      ) : (
        photo.credit.license
      )}
      , via Wikimedia Commons
    </figcaption>
  );
}
