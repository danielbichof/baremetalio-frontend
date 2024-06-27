'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import styles from './styles/page.module.css';
import Header from '@/components/header/header';

async function getArticle(articleId: string): Promise<Article> {
	const API_ARTICLES = `/api/articles/${articleId}`;
	const response = await fetch(API_ARTICLES);
	if (!response.ok) {
		throw new Error(`Failed to fetch article: ${response.statusText}`);
	}
	const data: Article = await response.json();
	return data;
}

async function getArticleContent(articleId: string): Promise<string> {
	const API_ARTICLES = `/api/articles/${articleId}/file`;
	console.log(API_ARTICLES);
	const response = await fetch(API_ARTICLES);
	if (!response.ok) {
		throw new Error(`Failed to fetch article content: ${response.statusText}`);
	}
	const compressedData = await response.arrayBuffer();
	const decompressedData = await decompressGzip(compressedData);
	return decompressedData;
}

async function decompressGzip(buffer: ArrayBuffer): Promise<string> {
	// Lógica para descomprimir o buffer gzip para texto
	const uint8Array = new Uint8Array(buffer);
	const textDecoder = new TextDecoder('utf-8');
	const decompressedText = textDecoder.decode(uint8Array);
	return decompressedText;
}

interface PageProps {
	params: { slug: string };
}

const Page: React.FC<PageProps> = ({ params }) => {
	const [article, setArticle] = useState<Article | null>(null);
	const [articleContent, setArticleContent] = useState<string | null>(null);

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const fetchedArticle = await getArticle(params.slug);
				setArticle(fetchedArticle);
			} catch (error) {
				console.error('Error fetching article:', error);
			}
		};

		const fetchArticleContent = async () => {
			try {
				const content = await getArticleContent(params.slug);
				setArticleContent(content);
			} catch (error) {
				console.error('Error fetching article content:', error);
			}
		};

		fetchArticle();
		fetchArticleContent();
	}, [params.slug]);

	if (!article || !articleContent) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Header />
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<div>
					<p className="text-lg font-semibold">{article.title}</p>
					<div className="content">
						<ReactMarkdown>{articleContent}</ReactMarkdown>
					</div>
				</div>
			</main>
		</>
	);
};

export default Page;
