export const checkAuthStatus = async () => {
  try {
    const response = await fetch("/api/auth", {
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
