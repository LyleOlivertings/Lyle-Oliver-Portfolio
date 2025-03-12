function processRepos(repos) {
    return repos.map(repo => ({
      id: repo.id,
      title: repo.name
        .replace(/-/g, ' ')
        .replace(/(^|\s)\S/g, t => t.toUpperCase()),
      description: repo.description || "Web development project",
      techStack: repo.topics || ['Full Stack'], // Handle missing topics
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || '#', // Fallback for missing homepage
      stats: {
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        updated: repo.pushed_at ? 
          new Date(repo.pushed_at).toLocaleDateString('en-GB') : 
          'Recently'
      },
      isFork: repo.fork || false,
      isArchived: repo.archived || false
    }));
  }