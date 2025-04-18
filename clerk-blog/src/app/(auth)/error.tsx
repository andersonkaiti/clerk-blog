"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <h1 className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
      <div
        role="alert"
        className="flex transform items-center rounded-lg border-l-4 border-red-700 bg-red-900 p-4 text-red-100 transition duration-300 ease-in-out hover:scale-105 hover:bg-red-800"
      >
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="mr-2 h-5 w-5 flex-shrink-0 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
        <p className="text-xl font-semibold">{error.message}</p>
      </div>
    </h1>
  );
}
