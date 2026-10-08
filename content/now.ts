export type Song = {
  id: number;
  title: string;
  artist: string;
  framedCover?: boolean;
  start?: number;
};

export const songs: Song[] = [
  { id: 6781076300, title: "Don’t Stop Me Now", artist: "Queen" },
  { id: 1479062292, title: "Virtual Insanity", artist: "Jamiroquai" },

  { id: 1555177261, title: "旅路", artist: "Fujii Kaze", start: 5.76 },
  { id: 878949805, title: "石神井川であいましょう", artist: "Nakayama Uri" },
  { id: 1739659142, title: "Birds of a Feather", artist: "Billie Eilish" },

  { id: 1317322831, title: "눈,코,입", artist: "TAEYANG" },
  { id: 1447959856, title: "Sau Tất Cả", artist: "ERIK" },

  {
    id: 1149899072,
    title: "heart beat",
    artist: "Kensuke Ushio",
    framedCover: true,
  },
  { id: 1462457539, title: "Nocturne", artist: "Bill Kiley" },
  { id: 1444739310, title: "晚安", artist: "Sir Deer" },
];

export const book = {
  title: "The Pragmatic Programmer",
  authors: "David Thomas and Andrew Hunt",
};
