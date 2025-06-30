import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import FocusCapsule from "@/components/sections/FocusCapsule";

export default function SharedHivesPage() {
  return (
    <>
      <Navbar />
      <main>
        <FocusCapsule roomType="focus capsule" />
      </main>
      <Footer />
    </>
  );
}
