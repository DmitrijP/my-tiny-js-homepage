export class BlogEntryDTO {
  constructor({ id, title, body, thumbnail, tags }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.thumbnail = thumbnail;
    this.tags = tags;
  }
}
