import { useRouter } from "next/router"

export default function game() {
    const router = useRouter()
    return (
      <main>
        <h1 className="text-white text-[50px]">Jogando na sala: {router.query.slug}</h1>
      </main>
    )
  }