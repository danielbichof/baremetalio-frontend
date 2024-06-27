interface Article {
	id: string
	title: string
	date: Date
	description: string
	author: string
	fileGzipUrl: string
	links: [{}]
};

interface ArticleBean {
	article: Article
	downloadLink: string
};