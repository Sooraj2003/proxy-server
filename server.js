import express from 'express'; // Use 'import' instead of 'require'
import fetch from 'node-fetch'; // Import node-fetch
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

app.get('/api/youtube-search-suggestions', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  const YOUTUBE_SEARCH_SUGGESTION_API = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(YOUTUBE_SEARCH_SUGGESTION_API);
    const suggestions = await response.json();

    return res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error fetching YouTube suggestions:", error);
    return res.status(500).json({ error: "Failed to fetch YouTube suggestions" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
