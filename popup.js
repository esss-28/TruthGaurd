document.getElementById("checkCredibilityButton").addEventListener("click", function () {
  console.log("Check Credibility button clicked");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url; // Get the current URL of the active tab
    console.log("Current URL:", currentUrl);

    chrome.runtime.sendMessage(
      { action: "checkCredibility", url: currentUrl },
      (response) => {
        console.log("Response received from background script:", response);

        if (response && response.credibility !== undefined) {
          document.getElementById("credibilityScore").textContent = `Credibility Score: ${response.credibility}`;
        } else {
          document.getElementById("credibilityScore").textContent = "Failed to fetch credibility score.";
        }
      }
    );
  });
});
