import Hero from "../components/Home/Hero"
import RecentTransaction from "../components/Home/RecentTransaction"

const Home = () => {
  return (
    <main className="p-(--pad-phone) md:p-(--pad-desk) pb-(--footer-space) sm:pb-(--footer-space-desk) bg-(--clr-bg-off) w-full">
      <Hero/>
      <RecentTransaction/>
    </main>
  )
}

export default Home