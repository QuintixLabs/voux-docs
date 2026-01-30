/** biome-ignore-all lint/a11y/noSvgWithoutTitle: OG image */
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import type { ReactElement } from 'react';

export const revalidate = false;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fontPath = join(__dirname, './Geist-Bold.woff');

const foreground = '#ffffff';
const mutedForeground = '#3b82f6';
const background = '#0f1115';

interface GenerateOptions {
  title: string;
  description?: string;
  siteUrl: string;
}

function generate({ title, description, siteUrl }: GenerateOptions): ReactElement {
  const logoUrl = new URL('/assets/logo.png', siteUrl).toString();

  return (
    <div
      style={{
        color: foreground,
        background,
      }}
      tw="flex flex-col w-full h-full p-12"
    >
      <div tw="flex flex-col justify-center">
        <div tw="flex flex-col rounded-2xl p-8">
          <p tw="font-bold text-7xl">{title}</p>
          {description ? (
            <p
              tw="text-4xl"
              style={{
                color: mutedForeground,
              }}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <div tw="flex flex-row justify-between items-center mt-auto p-8">
        <div tw="flex flex-row items-center">
          <svg
            width="58"
            height="58"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M255.999 354.595C331.71 354.595 397.406 306.398 430.114 277.362C443.292 265.662 443.292 246.113 430.114 234.413C397.406 205.377 331.71 157.18 255.999 157.18C180.287 157.18 114.592 205.377 81.8838 234.413C68.7054 246.113 68.7054 265.662 81.8838 277.362C114.592 306.398 180.287 354.595 255.999 354.595ZM255.999 324.753C294.241 324.753 325.241 293.921 325.241 255.887C325.241 217.854 294.241 187.022 255.999 187.022C217.758 187.022 186.757 217.854 186.757 255.887C186.757 293.921 217.758 324.753 255.999 324.753Z"
              fill={foreground}
            />
          </svg>
          <p tw="text-4xl font-medium pl-3">Voux</p>
        </div>
        <p tw="text-4xl font-medium" style={{ color: mutedForeground }}>
          Documentation
        </p>
      </div>
    </div>
  );
}

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/docs/[...slug]'>,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_DOCS_BASE_URL ||
    'http://localhost:3000';
  let fontData: ArrayBuffer | null = null;
  try {
    const file = await readFile(fontPath);
    fontData = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
  } catch (_) {
    fontData = null;
  }

  return new ImageResponse(
    generate({
      title: page.data.title,
      description: page.data.description,
      siteUrl,
    }),
    {
      width: 1200,
      height: 630,
      fonts: fontData
        ? [
            {
              name: 'Geist',
              data: fontData,
              weight: 700,
              style: 'normal',
            },
          ]
        : [],
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
