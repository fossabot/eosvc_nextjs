import { JSDOM } from "jsdom";

const getDownloads = async (ico) => {
  //const res = await fetch(`https://www.zivefirmy.cz/enttiva_f1620779?q=${ico}`);
  const res = await fetch(`https://rejstrik-firem.kurzy.cz/${ico}`);
  const text = await res.text();
  const dom = new JSDOM(text);
  const document = dom.window.document;
  const downloads = document.querySelector(".spojeni").textContent;
  return downloads;
};

export default async (req, res) => {
  const {
    query: { ico },
  } = req;

  const downloads = await getDownloads(ico);
  res.status(200).json({ downloads });
};
