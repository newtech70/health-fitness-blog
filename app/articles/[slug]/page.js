import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export default function Article({ content, title }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </div>
  );
}

export async function getStaticPaths() {
  const articlesDir = path.join(process.cwd(), 'content/articles');
  const files = fs.readdirSync(articlesDir);
  const paths = files.map((file) => ({
    params: { slug: file.replace('.md', '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content/articles', `${params.slug}.md`);
  const content = fs.readFileSync(filePath, 'utf8');
  const title = content.split('\n')[0].replace('# ', '');
  return { props: { content, title } };
}