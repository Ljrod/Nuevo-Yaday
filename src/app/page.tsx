import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";

export default function Home() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Header />

            <HeroSection />

            <ServicesSection />

            <AboutSection />

            <BookingSection />

            <Footer />
        </main>
    );
}
