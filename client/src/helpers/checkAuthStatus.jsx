export const checkAuthStatus = async () => {
  const url = import.meta.env.VITE_API_URL || "http://localhost:5050/";

  try {
    const response = await fetch(`${url}api/auth`, {
      credentials: "include",
    });

    if (!response.ok)
      throw new Error("Error during authentication state check");

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return { loggedIn: false };
  }
};
