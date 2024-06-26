import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

const ArticleFileViewer: React.FC<{ articleId: string }> = ({ articleId }) => {
	const [content, setContent] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFile = async () => {
			try {
				const response = await fetch(`/api/articles/${articleId}/file`, {
					method: 'GET',
				});

				if (!response.ok) {
					throw new Error(`Failed to fetch file: ${response.statusText}`);
				}
				const body = response.body;
				if (!body) {
					throw new Error('Response body is null or undefined');
				}

				const gzipStream = await body.getReader();
				const textDecoder = new TextDecoder('utf-8');
				const { value, done } = await gzipStream.read();
				if (done || !value) {
					throw new Error('Failed to decode gzip');
				}

				const text = textDecoder.decode(value);
				setContent(text);
			} catch (error) {
				setError('Error fetching file');
				console.error('Error fetching file:', error);
			}
		};

		fetchFile();
	}, [articleId]);

	if (error) {
		return <div>{error}</div>;
	}

	if (!content) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<ReactMarkdown>{content}</ReactMarkdown>
		</div>
	);
};

export default ArticleFileViewer;
