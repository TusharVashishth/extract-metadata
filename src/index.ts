import { JSDOM } from "jsdom";
import axios from "axios";
interface MetadataResponse {
  message: string;
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
}

export const getMetaData = async (url: string): Promise<MetadataResponse> => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        Referer: url,
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        DNT: "1",
      },
    });

    const dom = new JSDOM(data);
    const title = dom.window.document.querySelector("title")?.textContent;
    const descriptionMeta = dom.window.document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;
    const description = descriptionMeta ? descriptionMeta?.content ?? "" : null;
    const imageMeta = dom.window.document.querySelector(
      'meta[property="og:image"]'
    ) as HTMLMetaElement;
    let image = imageMeta ? imageMeta.content : null;

    const payload: MetadataResponse = {
      message: "Metadata fetched successfully",
      url: url,
      title: title ?? null,
      description: description ?? null,
      image: image ?? null,
    };

    return payload;
  } catch (error) {
    return {
      message: "Something went wrong.while fetching metadata",
      url: url,
      title: null,
      description: null,
      image: null,
    };
  }
};
