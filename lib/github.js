// src/lib/github.js
export async function getGitHubRepos() {
    const response = await fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json'
      },
      next: { revalidate: 3600 } // Refresh every hour
    });
  
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
  
    return response.json();
  }