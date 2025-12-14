export interface Slide {
  id: number;
  title: string;
  content: string;
  notes: string;
}

export function parseMarkdownSlides(markdown: string): Slide[] {
  if (!markdown || typeof markdown !== 'string') {
    return [];
  }

  // Split slides by --- (horizontal rule) or ## headers
  const slideBlocks = markdown.split(/\n---\n|\n(?=## )/g).filter(block => block.trim());

  return slideBlocks.map((block, index) => {
    // Extract speaker notes from <!-- notes: ... --> or :::notes ... :::
    const notesMatch = block.match(/<!--\s*notes:\s*([\s\S]*?)-->|:::notes\s*([\s\S]*?):::/i);
    const notes = notesMatch ? (notesMatch[1] || notesMatch[2] || '').trim() : '';

    // Remove notes from content
    let content = block
      .replace(/<!--\s*notes:\s*[\s\S]*?-->/gi, '')
      .replace(/:::notes\s*[\s\S]*?:::/gi, '')
      .trim();

    // Extract title from first heading
    const titleMatch = content.match(/^#\s+(.+)$|^##\s+(.+)$/m);
    const title = titleMatch ? (titleMatch[1] || titleMatch[2] || `Slide ${index + 1}`) : `Slide ${index + 1}`;

    return {
      id: index,
      title,
      content,
      notes,
    };
  });
}

export function extractSlideTitle(content: string): string {
  const match = content.match(/^#+\s+(.+)$/m);
  return match ? match[1] : 'Untitled Slide';
}
