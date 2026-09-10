import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
      <p className="text-sm text-[var(--muted)]">404</p>
      <h1 className="mt-3 text-3xl font-bold">
        페이지를 찾을 수 없습니다.
      </h1>
      <Link href="/" className="mt-6 text-sm font-medium underline underline-offset-4">
        홈으로 돌아가기
      </Link>
    </section>
  );
}
