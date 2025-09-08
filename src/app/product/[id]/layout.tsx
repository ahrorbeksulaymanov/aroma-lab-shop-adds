import { Metadata } from 'next';
import { getProductById } from '@/data/products';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductById(params.id);
  
  if (!product) {
    return {
      title: 'AromaLab Shop - Mahsulot topilmadi',
      description: 'Kechirasiz, so\'ralgan mahsulot mavjud emas.',
    };
  }

  return {
    title: `AromaLab Shop - ${product.name}`,
    description: product.description,
    openGraph: {
      title: `${product.name} - AromaLab Shop`,
      description: product.description,
      images: [product.images[0] || '/images/louis-vuitton-myriad-1.webp'],
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
