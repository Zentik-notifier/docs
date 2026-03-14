import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import Carousel from '@/components/Carousel';
import MediaViewer from '@/components/MediaViewer';
import TwoColumnLayout from '@/components/TwoColumnLayout';
import ApiAuthMethods from '@/components/ApiAuthMethods';
import Mermaid from '@/components/Mermaid';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Carousel,
    MediaViewer,
    TwoColumnLayout,
    ApiAuthMethods,
    Mermaid,
    ...components,
  };
}
