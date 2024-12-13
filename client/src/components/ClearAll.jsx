export default function ClearAll({ setFavorites }) {
  const handleClearAll = async () => {
    const response = await fetch("/api/all", {
      method: "DELETE",
    });

    console.log(response);

    setFavorites([]);
  };

  return (
    <button
      className="px-4 m-2 text-white rounded-md w-36 h-fit bg-zinc-600"
      onClick={handleClearAll}
    >
      Clear All
    </button>
  );
}
