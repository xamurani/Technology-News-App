// API Configuration
const API_URL = "https://content.guardianapis.com/search?q=technology&page-size=10&api-key=test";

// DOM Elements
const fetchNewsButton = document.getElementById("fetchNews");
const newsContainer = document.getElementById("newsContainer");

// Function to Fetch News
async function fetchNews() {
    try {
        // Clear previous news and display loading message
        newsContainer.innerHTML = "<p>Loading news...</p>";

        // Fetch data from API
        const response = await fetch(API_URL);
        const data = await response.json();

        // Check if data contains news articles
        if (!data.response || data.response.results.length === 0) {
            newsContainer.innerHTML = "<p>No news found.</p>";
            return;
        }

        // Render news articles
        renderNews(data.response.results);
    } catch (error) {
        newsContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        console.error("Error fetching news:", error);
    }
}

// Function to Render News
function renderNews(articles) {
    const newsHTML = articles.map(article => `
        <div class="news-card">
            <h3>${article.webTitle}</h3>
            <a href="${article.webUrl}" target="_blank">Read More</a>
        </div>
    `).join("");

    newsContainer.innerHTML = newsHTML;
}

// Event Listener
fetchNewsButton.addEventListener("click", fetchNews);
