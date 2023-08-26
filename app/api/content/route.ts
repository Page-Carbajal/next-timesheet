import {NextResponse} from "next/server";


export async function GET() {
    return NextResponse.json(
        [
            {
                "title": "Titre de l'article 1",
                "content": "Contenu de l'article 1",
                "slug": "article-1",
                "date": "2023-05-19",
                "author": "Auteur 1"
            },
            {
                "title": "Titre de l'article 2",
                "content": "Contenu de l'article 2",
                "slug": "article-2",
                "date": "2023-05-18",
                "author": "Auteur 2"
            },
            {
                "title": "Titre de l'article 3",
                "content": "Contenu de l'article 3",
                "slug": "article-3",
                "date": "2023-05-17",
                "author": "Auteur 3"
            },
        ]
    );
}