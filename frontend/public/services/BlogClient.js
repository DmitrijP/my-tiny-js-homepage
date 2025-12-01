export const BlogClient = {
  baseUri: "http://localhost:3000/api/blog",
  getBlog: async () => {
    try {
      const url = `${BlogClient.baseUri}/api/blog`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
