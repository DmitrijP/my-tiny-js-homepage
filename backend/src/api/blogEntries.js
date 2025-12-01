import { BlogEntryDTO } from "./BlogEntryDTO.js";

const rawBlogEntries = [
  {
    id: 1,
    title: "Artikel 1",
    body: "Lorem ipsum",
    thumbnail: "https://images.de/image123",
    tags: ["Tag A", "Tag B", "Tag C"],
  },
  {
    id: 2,
    title: "Artikel 2",
    body: "Lorem ipsum",
    thumbnail: "https://images.de/image223",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
  },
];

export const blogEntryMiddleware = (req, res) => {
  const entries = rawBlogEntries.map((item) => new BlogEntryDTO(item));
  res.json(entries);
};
