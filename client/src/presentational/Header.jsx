import shelfableDark from "../img/shelfable_dark.svg";

export default function Header() {
  return (
    <header className="mr-8 w-max md:w-fit md:mx-4 md:mr-0">
      <div className="w-full">
        <a href="/">
          <img
            src={shelfableDark}
            alt="site header"
            className="px-10 lg:px-2"
          />
        </a>
      </div>
    </header>
  );
}
