import Image from 'next/image'

interface ICartLineImageProps {
  src: string
}

  export default function CartLineImage({ src }: ICartLineImageProps) {

  const root =  'https://images-us-prod.cms.commerce.dynamics.com/cms/api/czjhmjzmzc/imageFileData/search?fileName=/'
    //'https://images-us-prod.cms.dynamics365commerce.ms/cms/api/cncgmclkfv/imageFileData/search?fileName=/'
  const encodedSrc = src && `${root}${encodeURIComponent(src)}`
  return (
    <p>
      <img src={encodedSrc} height={288} width={320} alt="product image" />
    </p>
  )
}
