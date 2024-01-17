import Image from 'next/image'

export default function Home() {
  return (
    <Image
      src="/test.svg"
      alt="SVG sample"
      width={800}
      height={200}
      priority
    />
  )
}
