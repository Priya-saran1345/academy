'use server';

import { BASE_URL } from "@/utils/api";
export const fetchMeta = async (slug: string) => {
  try {
    const formattedSlug = slug.replace(/^\/+|\/+$/g, '') || '/';
    const res = await fetch(`${BASE_URL}metadata/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug: formattedSlug }),
        });

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      return data.data;
    } else {
    }
  } catch (error) {
    console.error("Error fetching meta data:", error);
    
  }
};
