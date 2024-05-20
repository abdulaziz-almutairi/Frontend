import React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"

export function Hero() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))
  return (
    <>
      <main>
        <Carousel
          plugins={[plugin.current]}
          className="-ml-2 md:-ml-4"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem>
              <img src="https://media.extra.com/i/aurora/iPadair6_availa_HS_E" alt="Ipad air" />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://media.extra.com/i/aurora/Apple_Watch_Campaign_HS_E"
                alt="Apple Watch"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://media.extra.com/i/aurora/Huawei_MateBook_XPro_Soon_HS_E"
                alt="Huawei MateBook XPro"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </main>
    </>
  )
}
