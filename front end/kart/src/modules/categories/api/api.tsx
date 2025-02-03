export const fetchCategoriesData = async () => {
    try {
      const response = await fetch("http://192.168.1.12:3000/category"); // Ensure correct IP
      const data = await response.json();
      console.log("API Response:", data); // Debugging
      return data;
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw error;
    }
  };
  