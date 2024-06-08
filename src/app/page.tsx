import ArticleList from "../components/articles/articleList";

export default function Home() {
  return (
    <>
      <header className="flex flex-col items-center justify-between p-10">
        <h1 className="text-2xl font-semibold">Baremetal.io</h1>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="articles">
          <ArticleList/>
        </div>
      </main>
    </>
  );
}
