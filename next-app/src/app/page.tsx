import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/sample2.svg"
        alt="SVG sample"
        width={300}
        height={300}
        priority
      />
    </main>
  )
}
