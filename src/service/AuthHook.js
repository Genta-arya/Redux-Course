// AuthHook.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const navigation = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3001/jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          console.log("auth not valid");

          navigation("/login");
        } else {
          navigation("/shop");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    fetchData();
  }, [navigation]);
};

export default useAuthCheck;
