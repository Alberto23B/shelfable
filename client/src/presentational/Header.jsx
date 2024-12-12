import { useContext } from "react";
import { SelectInputContext } from "../context/SelectInputContext";

export default function Header() {
  const isInputSelected = useContext(SelectInputContext);

  const selectedClass = {
    selected:
      "mb-8 font-semibold text-3xl m:text-8xl font-lcd md:animate-resizeTitle",
    notSelected: "mb-8 font-semibold text-3xl md:text-8xl font-lcd ",
  };

  return (
    <header className="flex w-5/6 mx-auto mt-4 text-center">
      <div className="w-full">
        <a href="/">
          <h1
            className={
              isInputSelected
                ? selectedClass.selected
                : selectedClass.notSelected
            }
          >
            The Good Reads
          </h1>
        </a>
      </div>
    </header>
  );
}
