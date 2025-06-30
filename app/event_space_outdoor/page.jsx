import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import EventSpaceOutdoor from "@/components/sections/EventSpaceOutdoor";

export default function EventSpacePage() {
  return (
    <>
      <Navbar />
      <main>
        <EventSpaceOutdoor roomType="event space outdoor" />
      </main>
      <Footer />
    </>
  );
}
