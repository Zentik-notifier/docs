'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

let mermaidInitialized = false;

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: '#e8e0ff',
          primaryBorderColor: '#7c3aed',
          primaryTextColor: '#1e1b4b',
          lineColor: '#7c3aed',
          secondaryColor: '#f0fdf4',
          tertiaryColor: '#fefce8',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          fontSize: '14px',
        },
        flowchart: {
          htmlLabels: true,
          curve: 'basis',
          padding: 16,
        },
      });
      mermaidInitialized = true;
    }

    const renderChart = async () => {
      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      const { svg: renderedSvg } = await mermaid.render(id, chart.trim());
      setSvg(renderedSvg);
    };

    renderChart();
  }, [chart]);

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto rounded-lg border border-fd-border bg-fd-card p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
