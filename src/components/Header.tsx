import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start md:py-2 py-1">
          <Image
            src="/images/aroma_logo.png"
            alt="AromaLab Shop"
            width={200}
            height={100}
            className="md:w-[100px] w-[80px]"
          />
        </div>
      </div>
    </header>
  );
}
