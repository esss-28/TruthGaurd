async function fetchCredibilityScore(url) {
  console.log("Fetching credibility score for:", url);
  try {
    const response = await fetch("http://localhost:3000/check-credibility", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Credibility score fetched:", data.score);
    return data.score;
  } catch (error) {
    console.error("Error fetching credibility score:", error);
    return null;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background script:", message);

  if (message.action === "checkCredibility") {
    fetchCredibilityScore(message.url)
      .then((score) => {
        console.log("Sending response to popup:", { credibility: score });
        sendResponse({ credibility: score });
      })
      .catch((error) => {
        console.error("Error in fetchCredibilityScore:", error);
        sendResponse({ error: "Failed to fetch credibility score." });
      });
    return true; // Keeps the message channel open for async response
  }
});
