import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Crypto Analysis Dashboard
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Advanced cryptocurrency analysis and charting platform
      </p>
    </div>
  );
}
