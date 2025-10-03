// src/components/RightStory.tsx
import Image from "next/image";

type RightStoryProps = {
  href: string;
  title: string;
  img?: string;
  kicker?: string;
};

export default function RightStory({ href, title, img, kicker }: RightStoryProps) {
  return (
    <a
      href={href}
      className="block border-b pb-2 hover:bg-gray-50 transition-colors"
    >
      {img && (
        <div className="mb-2">
          <Image
            src={img}
            alt={title}
            width={300}
            height={200}
            className="w-full h-auto object-cover rounded"
          />
        </div>
      )}
      {kicker && (
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">
          {kicker}
        </div>
      )}
      <h3 className="font-medium text-sm">{title}</h3>
    </a>
  );
}
