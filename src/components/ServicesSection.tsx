"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { services } from "@/lib/services";
import ServiceCard from "@/components/ServiceCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ServicesSection() {
    return (
        <section
            id="servicios"
            className="py-20 bg-white overflow-hidden"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-4">
                        Nuestros Servicios Exclusivos
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Descubre una experiencia de belleza única con nuestros servicios
                        premium de diseño de uñas.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        className="pb-12"
                    >
                        {services.map((service) => (
                            <SwiperSlide key={service.id}>
                                <ServiceCard service={service} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* Custom Swiper Styles */}
                <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: #7f0030 !important;
            background: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 20px !important;
          }

          .swiper-pagination-bullet {
            background: #7f0030 !important;
            opacity: 0.3;
          }

          .swiper-pagination-bullet-active {
            opacity: 1;
            background: #ff93c7 !important;
          }
        `}</style>
            </div>
        </section>
    );
}
