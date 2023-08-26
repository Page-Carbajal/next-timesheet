import Link from "next/link";

interface Post {
    title: string,
    author: string,
    content: string,
    slug: string,
    date: string
}


interface Props {
    params: { slug: string };
}


export const revalidate = 420;

// Incremental Static Regeneration
export async function generateStaticParams() {
    const posts: Post[] = await fetch('http://localhost:3000/api/content')
        .then(r => r.json());

    return posts.map(p => ({slug: p.slug}));
}


export default async function PostEntry({params}: Props) {

    const posts: Post[] = await fetch('http://localhost:3000/api/content')
        .then(r => r.json());
    const post = posts.find(p => p.slug == params.slug)!;

    return (
        <>
            <div>
                <Link href="./article-1">Article 1</Link>
                <Link href="./article-2">Article 2</Link>
            </div>
            <div>
                <h1>{post.title}</h1>
                <div>{post.content}</div>
            </div>
        </>
    );
}