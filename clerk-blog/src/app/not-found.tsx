import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-screen-xl flex-col items-center justify-center space-y-4 px-4 py-8 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
          404
        </h1>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Página não encontrada
        </p>
        <Link
          href="/"
          className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-600 bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white hover:border-gray-600 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-700 focus:outline-none"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
