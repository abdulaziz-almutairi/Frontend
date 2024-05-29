import { Button } from "./ui/button"
import video from "@/assets/videos/1.mp4"

export function Hero() {
  return (
    <>
      <section className="bg-gray-100 py-12 md:py-24">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="position:relative; w-100%; h-100%; padding-bottom:56.410%">
            {/* <iframe
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              // src="https://v1.pinimg.com/videos/mc/720p/9c/e6/91/9ce69111f4d96bebf5eb8a3dec560d79.mp4?autoplay=1&muted=1"
              src="https://streamable.com/e/lwj0u4?autoplay=1"
              className="w-full aspect-video"
              allowFullScreen
            ></iframe> */}
            <video src={video} loop autoPlay muted className="w-750 h-500" controls></video>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Discover the Latest Electronics</h1>
            <p className="text-gray-600">
              Shop our wide selection of electronics and accessories for all your needs.
            </p>
            <Button size="lg" variant="outline">
              Shop Now
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
