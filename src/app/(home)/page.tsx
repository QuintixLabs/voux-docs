import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <Image
        src="/assets/logo-text-2.png"
        alt="Voux"
        width={400}
        height={86}
        priority
        className="-mt-10 dark:hidden"
      />
      <Image
        src="/assets/logo-text.png"
        alt="Voux"
        width={400}
        height={86}
        priority
        className="-mt-10 hidden dark:block"
      />
      <p className="-mt-5 max-w-2xl text-base text-fd-muted-foreground">
        Everything you need to get started and use Voux.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs"
          className="inline-flex items-center justify-center rounded-full border border-fd-primary/20 bg-fd-primary/10 px-5 py-2 text-sm font-semibold text-fd-foreground transition hover:border-fd-primary/30 hover:bg-fd-primary/15"
        >
          Read Documentation
        </Link>
      </div>
    </div>
  );
}
