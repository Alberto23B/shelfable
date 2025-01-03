import library from "../img/library.png";
import Quote from "../components/Quote";

export default function Homepage() {
  return (
    <div className="flex flex-row items-center justify-center mx-5">
      <img src={library}></img>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl text-white">
          Book search enging built upon Google Books API
        </h2>
        <Quote />
        <div className="flex w-full">
          <button className="w-1/3 h-16 mx-auto bg-white border rounded-lg">
            Login
          </button>
          <button className="w-1/3 h-16 mx-auto bg-white border rounded-lg">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
