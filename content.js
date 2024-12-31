const pageUrl = window.location.href;

chrome.runtime.sendMessage(
  { action: "checkCredibility", url: pageUrl },
  (response) => {
    console.log("Received response from background script:", response);

    if (response && response.credibility !== undefined) {
      alert("This source has a credibility score of: " + response.credibility);
    } else {
      alert("Failed to fetch credibility score. Please try again later.");
    }
  }
);
