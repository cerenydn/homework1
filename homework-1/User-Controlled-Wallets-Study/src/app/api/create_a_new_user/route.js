import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const create_a_new_user = async () => {
  const userId = uuidv4();

  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/users",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    data: { userId: userId },
  };

  try {
    const response = await axios.request(options);
    return {
      userId: userId,
      status: response.status, // Yanıtın durum kodu
    };
  } catch (error) {
    console.error("API Call Error:", error.response ? error.response.data : error.message);
    return {
      userId: "Error: User ID not found",
      status: error.response ? error.response.status : "unknown error"
    };
  }
};
