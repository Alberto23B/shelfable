import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginForm() {
  return (
    <div className="absolute hidden w-full top-1/4">
      <div className="flex items-center justify-center bg-no-repeat bg-cover w-ful">
        <div className="px-16 py-10 bg-gray-800 bg-opacity-50 shadow-lg rounded-xl backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="flex flex-col items-center mb-8">
              <FontAwesomeIcon icon={faBook} size="xl" />
              <h1 className="mb-2 text-2xl">shelfable</h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
            <form action="#">
              <div className="mb-4 text-lg">
                <input
                  className="px-6 py-2 text-center bg-black bg-opacity-50 border-none shadow-lg outline-none rounded-3xl text-inherit placeholder-slate-400 backdrop-blur-md"
                  type="text"
                  name="name"
                  placeholder="id@email.com"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="px-6 py-2 text-center bg-black bg-opacity-50 border-none shadow-lg outline-none rounded-3xl text-inherit placeholder-slate-400 backdrop-blur-md"
                  type="Password"
                  name="name"
                  placeholder="*********"
                />
              </div>
              <div className="flex justify-center mt-8 text-lg text-black">
                <button
                  type="submit"
                  className="px-10 py-2 text-white transition-colors duration-300 bg-[#2faeb7] bg-opacity-50 shadow-xl rounded-3xl backdrop-blur-md hover:bg-yellow-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
