import Article from "./article";

export async function getArticles() {
	const API_ARTICLES = process.env.HOST_API + "/articles" || "http://localhost:8080/api/articles";
	const response = await fetch(API_ARTICLES, { next: { revalidate: 10 } })
	if (response.status != 200) {
		return undefined
	}
	const data: Article[] | undefined = await response.json();
	return data;
}

export async function renderList() {
	let articlesList: Article[] | undefined = await getArticles()

	if (articlesList) {
		let list = articlesList.map(articleData => {
			console.log(articleData)
			return (
				<Article key={articleData.title} article={articleData} />
			)
		});
		return <>{list}</>;
	}
	return null;
}

export default function ArticleList() {
	return (
		<div className="m-5 p-5">
			{renderList()}
		</div>);
}
