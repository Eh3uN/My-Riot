export type TimelineMilestone = {
  date: string;
  title: string;
  description: string;
  kind?: "first" | "official" | "future";
};

export type Memory = {
  image: string;
  caption: string;
  date?: string;
};

// Edit, remove, or add milestones here.
export const timeline: TimelineMilestone[] = [
  {
    date: "27 April 2024",
    title: "The First Message",
    description: "The day I sent Hengameh our very first message — the quiet beginning of everything.",
    kind: "first",
  },
  {
    date: "27 July 2024",
    title: "We Became Us",
    description: "The day we officially chose each other and our story truly became ours.",
    kind: "official",
  },
  {
    date: "Our next chapter",
    title: "A Favorite Adventure",
    description: "A beautiful memory waiting for its date, its place, and the story only we can tell.",
    kind: "future",
  },
  {
    date: "Still to come",
    title: "Another Little Forever",
    description: "For the ordinary day that becomes unforgettable simply because we share it.",
    kind: "future",
  },
];

// Add photos to public/images, then set each image to a path such as
// "/images/our-first-photo.jpg". An empty or missing image shows a graceful placeholder.
export const memories: Memory[] = [
  {
    image: "/images/First-flower.jpg",
    caption: "The beginning of something beautiful",
    date: "Our first days",
  },
  {
    image: "/images/image.png",
    caption: "A moment I never want to forget",
    date: "A day with you",
  },
  {
    image: "/images/photo_2025-09-04_03-39-19.jpg",
    caption: "Everywhere feels like home with you",
  },
];

// Edit these reasons freely — the cards are created automatically.
export const loveReasons: string[] = [
  "Your smile",
  "Your kindness",
  "The way you make ordinary days special",
  "How safe the world feels beside you",
  "The warmth you bring into every room",
  "The little things that are so completely you",
];
