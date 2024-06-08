import Link from "next/link";

export async function getArticle(articleId: string): Promise<Article> {
	const API_ARTICLES = "http://localhost:8080/articles/" + articleId;
	const response = await fetch(API_ARTICLES, { next: { revalidate: 10 } });
	const data: Article = await response.json();
	return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
	const article = await getArticle(params.slug)

	return (
		<>
			<header className="flex flex-col items-center justify-between p-10">
				<h1 className="text-2xl font-semibold"><Link href="/"> Baremetal.io</Link></h1>
			</header>
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<div>
					<p className="text-lg font-semibold">{article.title}</p>
				</div>
			</main >
		</>
	)
}