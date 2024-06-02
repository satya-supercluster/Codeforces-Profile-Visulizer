import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";

export default function App() {
  return (
    <>
      <div className="py-5 px-3 sm:px-5 backdrop-blur-sm min-h-screen gap-5">
        <Navbar />
        <SearchBox/>
      </div>
    </>
  );
}
