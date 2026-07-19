import { BlogPost, Game, TeamMember } from "@/types";

/** Games catalog. Use status: "coming-soon" for unreleased titles. */
export const games: Game[] = [
  {
    id: "1",
    slug: "space-shooter",
    title: "Space Shooter",
    tagline: "Just for a start",
    description: "A very simple space shooter game.",
    longDescription:
      "A very simple space shooter game that lets you play with your friends.",
    genre: ["Playable Game", "2D", "Multiplayer"],
    platforms: ["PC"],
    releaseYear: 2027,
    rating: 0,
    coverImage: "/images/VERT_space-shooter.webp",
    screenshots: [],
    features: [
      "Easy Mode if you are new",
      "Hard Mode if you are a gamer",
      "Multiplayer if you are committed",
    ],
    story: "Just as a game.",
    status: "coming-soon",
    systemRequirements: {
      minimum: {
        OS: "Any",
        Processor: "Any x86-64 or Arm 800MHz",
        Memory: "256 MB",
        Graphics: "None",
        Storage: "80 MB",
      },
      recommended: {
        OS: "Linux 6.12",
        Processor: "AMD Athlon 3000G or equivalent",
        Memory: "4 GB",
        Graphics: "Intel UHD 600 or equivalent",
        Storage: "80 MB",
      },
    },
    links: {
      github: "https://github.com/inizh/space_shooter",
    },
    awards: ["Waste of time - Parents"],
  },
  {
    id: "2",
    slug: "love-games",
    title: "Love Games",
    tagline: "Only for committed people",
    description:
      "Super-fast love games optimised to play with your life partner.",
    longDescription:
      "Super-fast love games optimised to find your life partner.",
    genre: ["Enjoyable Game", "2D", "Multiplayer"],
    platforms: ["PC"],
    releaseYear: 2026,
    rating: 0,
    coverImage: "",
    screenshots: [],
    features: [
      "FLAMES for verification",
      "Private chatbot but you can talk to only one person forever",
    ],
    story: "Since we are single and unemployed we made this.",
    status: "coming-soon",
    systemRequirements: {
      minimum: {
        OS: "Any",
        Processor: "Any x86-64 or Arm 800MHz",
        Memory: "1 GB",
        Graphics: "None",
        Storage: "2 GB",
      },
      recommended: {
        OS: "Linux 6.12",
        Processor: "AMD Athlon 3000G or equivalent",
        Memory: "4 GB",
        Graphics: "Intel UHD 600 or equivalent",
        Storage: "2 GB",
      },
    },
    links: {
      github: "https://github.com/inizh/Love_Games",
    },
    awards: ["Suspicion - Parents"],
  },
  {
    id: "3",
    slug: "yoi-yurei",
    title: "Yoi-Yurei",
    tagline: "Until I Die",
    description: "TBD",
    longDescription: "TBD",
    genre: ["2D", "Metroidvania", "Multiplayer"],
    platforms: ["PC"],
    releaseYear: 0,
    rating: 0,
    coverImage: "/images/VERT_red-girl-xhigh-denoise.webp",
    screenshots: [],
    features: ["You can fight", "You can win", "You can lose"],
    story: "What if Indians made a game",
    status: "coming-soon",
    systemRequirements: {
      minimum: {
        OS: "Any",
        Processor: "Any x86-64 or Arm 1GHz",
        Memory: "2 GB",
        Graphics: "None",
        Storage: "3 GB",
      },
      recommended: {
        OS: "Linux 6.12+",
        Processor: "AMD Ryzen 3 1200 or equivalent",
        Memory: "4 GB",
        Graphics: "AMD Vega 3 or equivalent",
        Storage: "3 GB",
      },
    },
    links: {
      github: "https://github.com/inizh/Yoi_Yurei",
    },
    awards: [],
  },
];

/** Real blog posts will be added here when ready. Empty = “Coming soon” UI. */
export const blogPosts: BlogPost[] = [];

/**
 * Team members. Avatars use GitHub profile images:
 * https://github.com/{username}.png
 */
export const team: TeamMember[] = [
  {
    id: "1",
    name: "JC Kawin",
    tagname: "jckawin",
    role: "Game Designer",
    github: "https://github.com/JCKawin",
    image: "https://github.com/JCKawin.png?size=400",
  },
  {
    id: "2",
    name: "Jai Suriyaa",
    tagname: "Cre@tor",
    role: "2D Artist",
    github: "https://github.com/jaisuriyaa2007",
    image: "https://github.com/jaisuriyaa2007.png?size=400",
  },
  {
    id: "3",
    name: "Joseph Daniel",
    tagname: "JD",
    role: "Musician",
    github: "https://github.com/JD-2572007",
    image: "https://github.com/JD-2572007.png?size=400",
  },
  {
    id: "4",
    name: "Aadi Vibhuti",
    tagname: "TON-618",
    role: "Game Developer",
    github: "https://github.com/Aadi-Vibhuti",
    image: "https://github.com/Aadi-Vibhuti.png?size=400",
  },
  {
    id: "5",
    name: "Gunit Kumar",
    tagname: "fexa",
    role: "Game programmer",
    github: "https://github.com/Fexaop",
    image: "https://github.com/Fexaop.png?size=400",
  },
];

/** Social / community links. Use "#" until real URLs are provided. */
export const socialLinks: Record<
  "discord" | "twitter" | "youtube" | "instagram" | "steam",
  string
> = {
  discord: "https://discord.gg/DhCdCTt5T",
  twitter: "#",
  youtube: "#",
  instagram: "#",
  steam: "#",
};

export type SocialPlatform = keyof typeof socialLinks;
