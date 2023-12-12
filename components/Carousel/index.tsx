import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Styles from './index.module.scss';

export default function Carousel({ images, title }: { images: string[], title: string }) {
    SwiperCore.use([Navigation, Scrollbar, Autoplay]);
    return (
        <div className={Styles.swiperContainer}>
            <Swiper
                style={{
                    width: "100%",
                    position: "relative",
                    // overflow: "visible"
                }}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}

            >
                {images && images.map((imageUrl, index) => (
                    <SwiperSlide key={imageUrl}>
                        <img key={index} src={imageUrl} alt={title + '-' + index} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}