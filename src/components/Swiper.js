import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './Swiper.scss'

class Comp extends React.Component{
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
        return (
            <div className={ styles['swiper'] }>
                <Swiper
                    className={ styles['swiper-component']}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.next',
                        prevEl: '.prev',
                    }}
                    pagination={{
                        el: '.swiper-pagination',
                        bulletClass: 'swiper-pagination-item',
                        bulletActiveClass: 'swiper-pagination-item-active'
                    }}
                    loop={ true }
                    autoplay={{
                        delay: 3000
                    }}
                >
                    <SwiperSlide className={ styles['slide-item'] }><img src="/images/logo.jpeg" alt="" /></SwiperSlide>
                    <SwiperSlide className={ styles['slide-item'] }><img src="/images/logo.jpeg" alt="" /></SwiperSlide>
                    <SwiperSlide className={ styles['slide-item'] }><img src="/images/logo.jpeg" alt="" /></SwiperSlide>
                    <SwiperSlide className={ styles['slide-item'] }><img src="/images/logo.jpeg" alt="" /></SwiperSlide>
                </Swiper>
                <div className="swiper-pagination"></div>
                <div className="swiper-navigation prev iconfont icon-left-2"></div>
                <div className="swiper-navigation next iconfont icon-right-2"></div>
            </div>
        )
    }
}

export default Comp