export async function GET() {
    console.log('[API] Starting GitHub API request...');
    
    try {
      const username = 'LyleOlivertings'; // Hardcode for testing
      const res = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json'
        }
      });
  
      console.log(`[API] GitHub API status: ${res.status}`);
      
      if (!res.ok) {
        const errorBody = await res.text();
        console.error('[API] GitHub API error:', errorBody);
        return new Response(JSON.stringify({ error: 'GitHub API failed' }), { status: 502 });
      }
  
      const repos = await res.json();
      console.log('[API] Received repos:', repos.length);
      return new Response(JSON.stringify(repos));
  
    } catch (error) {
      console.error('[API] Server error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }