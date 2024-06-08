import Article from "./article";

export async function getArticles() {
	const API_ARTICLES = "http://localhost:8080/articles";
	const response = await fetch(API_ARTICLES, { next: { revalidate: 10 } });
	const data: Article[] | undefined = await response.json();
	return data;
}

export async function renderList() {
	let articlesList: Article[] | undefined = await getArticles();
	console.log(articlesList)
	if (articlesList){

		let list = articlesList.map(article => {
			return (
				<Article key={article.title} article={article} />	
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
