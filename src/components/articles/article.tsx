import Link from 'next/link'

export default function Article(props: { article: Article }) {
	console.log(props.article);
	const link = "/articles/" + props.article.idArticle
	return (
		<div className="article p-10 rounded-md border-2 m-5">
			<div><Link className="font-medium font-bold" href={link}>{props.article.title}</Link></div>
			<div className="font-light">
				{props.article.description}
			</div>
		</div>
	)
}