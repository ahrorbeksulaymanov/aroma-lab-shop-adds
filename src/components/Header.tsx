import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start p-y-2">
          <Image
            src="/images/logo.webp"
            alt="AromaLab Shop"
            width={100}
            height={100}
          />
        </div>
      </div>
    </header>
  );
}
