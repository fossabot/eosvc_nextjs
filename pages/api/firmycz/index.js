import { JSDOM } from "jsdom";

const getDownloads = async () => {
  const res = await fetch("https://ifirmy.cz/firma/block33");
  const text = await res.text();
  const dom = new JSDOM(text);
  const document = dom.window.document;
  const downloads = document.querySelector(
    "ul.list-inline.captionItem"
  )?.textContent;
  return downloads;
};

export default async (req, res) => {
  const downloads = await getDownloads();
  res.status(200).json({ downloads });
};
