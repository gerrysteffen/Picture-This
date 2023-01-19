const root = "http://localhost:4000/";

export const refreshUser = async () => {
  try {
    const response = await fetch(root + "refresh", {
      method: "GET",
      headers: { "Content-Type": "application/json" },

      credentials: "include",
    });
    const loggedUser = await response.json();

    return loggedUser;
  } catch (error) {
    console.log(error);
  }
};
