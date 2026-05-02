import { scenes } from '@/lib/content'
import Scene from '@/components/Scene'
import ProgressBar from '@/components/ProgressBar'
import SmoothScroll from '@/components/SmoothScroll'

export default function Home() {
  return (
    <SmoothScroll>
      <ProgressBar />
      <main>
        {scenes.map((scene) => (
          <Scene key={scene.id} scene={scene} />
        ))}
      </main>
    </SmoothScroll>
  )
}
