import { useEffect, useState, useRef } from "react";

const NFCRedirect = () => {
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false); 

  useEffect(() => {
    if (hasFetched.current) return;  
    hasFetched.current = true;

    const params = new URLSearchParams(window.location.search);
    const cardId = params.get("card_id");

    if (!cardId) {
      alert("Invalid NFC tap");
      setLoading(false);
      return;
    }

    fetch(`https://2afd-2405-201-e040-e8c7-9158-e58-2666-724e.ngrok-free.app/api/tapNFC`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          window.location.href = data.redirect_url; 
        } else {
          alert(data.message);
        }
      })
      .catch(() => alert("Error processing tap"))
      .finally(() => setLoading(false));
  }, []);

  return <h2>{loading ? "Loading..." : "Error occurred"}</h2>;
};

export default NFCRedirect;
