
import { Carousel } from "@material-tailwind/react";

export default function CarouselTransition() {
    return (
        <>
            <div className='absolute inset-0 bg-black opacity-40 z-10 w-full max-w-full h-screen'></div >
            <Carousel autoplay={true}
                loop={true}
                autoplayDelay={4000}
                transition={{ duration: 2 }}
                className="top-0 rounded-xl overflow-hidden w-full max-w-full h-1/2 z-0"

            >
                <img
                    src="https://source.unsplash.com/random/200X400/?pizza"
                    alt="image 1"
                    className="m-0 p-0 h-screen w-full max-w-full object-cover"
                />
                <img
                    src="https://source.unsplash.com/random/200X400/?burger"
                    alt="image 2"
                    className="m-0 p-0 h-screen w-full max-w-full object-cover"
                />
                <img
                    src="https://source.unsplash.com/random/200X400/?noodles"
                    alt="image 3"
                    className="m-0 p-0 h-screen w-full max-w-full object-cover"
                />
            </Carousel>
        </>

    );
}