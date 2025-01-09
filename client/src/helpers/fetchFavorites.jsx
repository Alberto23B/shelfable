export const fetchFavorites = async () => {
  try {
    const response = await fetch(`/api`, {
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
