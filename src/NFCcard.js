import { useEffect } from "react";

const NFCRedirect = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cardId = params.get("card_id");

    if (!cardId) {
      alert("Invalid NFC tap");
      return;
    }

    // Send request to backend to track tap
    fetch(`https://2afd-2405-201-e040-e8c7-9158-e58-2666-724e.ngrok-free.app/api/tapNFC`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          window.location.href = data.redirect_url; // Redirect to review page
        } else {
          alert(data.message);
        }
      })
      .catch(() => alert("Error processing tap"));
  }, []);

  return <h2>Loading...</h2>;
};

export default NFCRedirect;
