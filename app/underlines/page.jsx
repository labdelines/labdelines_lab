import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Underlines from "@/components/sections/Underlines";

export default function UnderlinesPage() {
  return (
    <>
      <Navbar />
      <main>
        <Underlines roomType="underlines" />
      </main>
      <Footer />
    </>
  );
}
