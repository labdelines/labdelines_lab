import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import EventSpaceIndoor from "@/components/sections/EventSpaceIndoor";

export default function EventSpacePage() {
  return (
    <>
      <Navbar />
      <main>
        <EventSpaceIndoor roomType="event space indoor" />
      </main>
      <Footer />
    </>
  );
}
