import fs from 'fs';
import path from 'path';

export default function Home({ articles }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Health & Fitness Blog</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <a href={`/articles/${article.slug}`}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const articlesDir = path.join(process.cwd(), 'content/articles');
  const files = fs.readdirSync(articlesDir);
  const articles = files.map((file) => {
    const slug = file.replace('.md', '');
    // Read title from MD file (simple parse)
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    const title = content.split('\n')[0].replace('# ', '');
    return { slug, title };
  });
  return { props: { articles } };
}