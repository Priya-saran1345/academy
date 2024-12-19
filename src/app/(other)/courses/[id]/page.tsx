

import React from 'react'
import InnerPage from '@/components/CoursesInnerPage'
import { fetchMeta } from "@/app/action";
import { Suspense } from 'react'
import { BASE_URL } from '@/utils/api';
async function SchemaScript({ params}:any) {
  const  slug  = params?.id;
  const metaData = await fetchMeta(`courses/${slug}`);
  const schemaData = metaData?.scripts[0].content
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
const Page = async({params}: any) => {
  return (
    <div>
        <Suspense fallback={null}>
        <SchemaScript />
      </Suspense>
    <InnerPage/>
    </div>
  )
}
export default Page
  export async function generateMetadata({ params  }: any) {
    const  slug  = params?.id;
    try {
      const metaData = await fetchMeta(`courses/${slug}`);
      return {
        title: metaData?.title || '',
        description: metaData?.description || '',
        keywords: metaData?.keywords ||'',
        openGraph: metaData?.openGraph
          ? {
              type: metaData.openGraph.type || '',
              title: metaData.openGraph.title || '',
              description: metaData.openGraph.description || '',
              url: metaData.openGraph.url || '',
              siteName: metaData.openGraph.siteName || '',
              images: metaData.openGraph.images?.map((image:any) => ({
                url: image?.url || '',
                width: parseInt(image?.width) || '',
                height: parseInt(image?.height) || '',
                alt: image?.alt || '',
              })) || [],
              locale: metaData.openGraph.locale || '',
              authors: metaData.openGraph.authors || [], 
              publishedTime: metaData.openGraph.publishedTime || '',
            }
          : undefined,
        robots: {
          index: metaData?.robots?.index ?? false, // Default to true if not provided
          follow: metaData?.robots?.follow ?? false,
        },
        icons: metaData?.icons
          ? {
              icon: metaData.icons.icon || '',
              shortcut: metaData.icons.shortcut || '',
              apple: metaData.icons.apple || '',
            }
          : undefined,
        twitter: metaData?.twitter
          ? {
              card: metaData.twitter.card || '',
              title: metaData.twitter.title || '',
              description: metaData.twitter.description || '',
              creator: metaData.twitter.creator || '',
              images: metaData.twitter.images || '',
            }
          : undefined,
        // alternates: {
        //   canonical: metaData?.openGraph?.url || '',
        // },
      };
    } catch (error) {
      console.error('Error fetching meta data:', error);
      return {
        title: 'W3era® | Performance Driven Digital Marketing Company',
        description: 'A premier Digital Marketing Company, W3era® offer comprehensive services like SEO, PPC, and Web development. Schedule a free marketing consultation today.',
      };
    }
  }
  