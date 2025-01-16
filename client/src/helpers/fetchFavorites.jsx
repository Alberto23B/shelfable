export const fetchFavorites = async () => {
  const url = import.meta.env.VITE_API_URL || "";

  try {
    const response = await fetch(`${url}api`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
