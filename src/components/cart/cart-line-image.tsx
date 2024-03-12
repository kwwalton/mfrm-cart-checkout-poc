import Image from 'next/image'

interface ICartLineImageProps {
  src: string
}

  export default function CartLineImage({ src }: ICartLineImageProps) {
  const root =
    'https://images-us-prod.cms.commerce.dynamics.com/cms/api/czjhmjzmzc/imageFileData/search?fileName=/'
  const encodedSrc = encodeURIComponent(src)
  return (
    <div>
      <Image src={`${root}${encodedSrc}`} height={288} width={320} alt="product image" />
    </div>
  )
}
