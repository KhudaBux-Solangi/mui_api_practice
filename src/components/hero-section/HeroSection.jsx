import { Swiper, SwiperSlide } from 'swiper/react'; // Correct import, only once
// Import Swiper styles
import 'swiper/swiper-bundle.min.css'; 

// Import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper'; // Correct module import from 'swiper'

// Import your images
import Imgslider1 from "../assets/slideimg1.jpg";
import Imgslider2 from "../assets/slideimg2.jpg";
import Imgslider3 from "../assets/slideimg3.jpg";
import Imgslider4 from "../assets/slideimg4.jpg";
import Imgslider5 from "../assets/slideimg5.jpg";
import Imgslider6 from "../assets/slideimg6.jpg";
import Imgslider7 from "../assets/slideimg7.jpg";
import Imgslider8 from "../assets/slideimg8.jpg";
import Imgslider9 from "../assets/slideimg9.jpg";
import Imgslider10 from "../assets/slideimg10.jpg";
import Imgslider11 from "../assets/slideimg11.jpg";

import { Box } from '@mui/material'; // Box from MUI

export default () => {
  return (
    <>
      <Box className="mt-5 pt-5">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 500,
            stretch: 60,
            depth: 1000,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          autoplay={{
            delay: 1500, // Auto transition time in ms
            disableOnInteraction: false, // Autoplay continues even after interaction
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]} // Using modules
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={Imgslider1} className="img-fluid" alt="Image 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Imgslider2} className="img-fluid" alt="Image 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Imgslider3} className="img-fluid" alt="Image 3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Imgslider4} className="img-fluid" alt="Image 4" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Imgslider5} className="img-fluid" alt="Image 5" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Imgslider6} className="img-fluid" alt="Image 6" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Imgslider7} className="img-fluid" alt="Image 7" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Imgslider8} className="img-fluid" alt="Image 8" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Imgslider9} className="img-fluid" alt="Image 9" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Imgslider10} className="img-fluid" alt="Image 10" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Imgslider11} className="img-fluid" alt="Image 11" />
          </SwiperSlide>
        </Swiper>
      </Box>
    </>
  );
};
