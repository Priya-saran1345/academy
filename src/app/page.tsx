import React from 'react'
import HomeCom from '@/components/Home'
import { fetchMeta } from "@/app/action";
import { Metadata } from 'next';
import { Suspense } from 'react'
import { BASE_URL } from '@/utils/api'
import { GetServerSideProps } from 'next'

interface DynamicPageProps {
  data: string
}
async function SchemaScript() {
  const metaData = await fetchMeta("/")
  const schemaData = metaData?.scripts[0].content
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaData ? JSON.stringify(schemaData) :'' }}
    />
  )
}
async function getData() {
  const res = await fetch(`${BASE_URL}home/`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
export default async function Home() {
  const data = await getData()
  const homeComContent = <HomeCom data={data} />
  return (
    <>
      <Suspense fallback={null}>
      <SchemaScript />
      </Suspense>
      {homeComContent}
    </>
  )
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const metaData = await fetchMeta("/");
    console.log('home page meta data')
    return {
      title: metaData?.title || 'Academy.w3era® ',
      description: metaData?.description || ' and Web development. Schedule a free marketing consultation today.',
      keywords: metaData?.keywords ||'',
      openGraph: metaData?.openGraph
        ? {
            type: metaData.openGraph.type,
            title: metaData.openGraph.title,
            description: metaData.openGraph.description,
            url: metaData.openGraph.url,
            siteName: metaData.openGraph.siteName,
            images: metaData.openGraph.images?.map((image: any) => ({
              url: image?.url,
              width: parseInt(image?.width),
              height: parseInt(image?.height),
              alt: image?.alt,
            })),
            locale: metaData.openGraph.locale,
            authors: metaData.openGraph.authors || [], 
            publishedTime: metaData.openGraph.publishedTime || '',
          }
        : undefined,
      robots: {
        index: metaData?.robots?.index ?? false,
        follow: metaData?.robots?.follow ?? false,
      },
      icons: metaData?.icons
        ? {
            icon: metaData.icons.icon,
            shortcut: metaData.icons.shortcut,
            apple: metaData.icons.apple,
          }
        : undefined,
      twitter: metaData?.twitter
        ? {
            card: metaData.twitter.card,
            title: metaData.twitter.title,
            description: metaData.twitter.description,
            creator: metaData.twitter.creator,
            images: metaData.twitter.images,
          }
        : undefined,
    };
  } 
  
  catch (error) {
    console.error('Error fetching meta data:', error);
    return {
      title: 'W3era® | Performance Driven Digital Marketing Company',
      description: 'A premier Digital Marketing Company, W3era® offer comprehensive services like SEO, PPC, and Web development. Schedule a free marketing consultation today.',
    };
  }
}
