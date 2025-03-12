'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProjectCard from '../../components/ProjectCard';

async function getGitHubRepos() {
  try {
    const res = await fetch('/api/projects');
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

function processRepos(repos) {
  return repos
    .map(repo => ({
      id: repo.id,
      title: repo.name
        .replace(/-/g, ' ')
        .replace(/(^|\s)\S/g, t => t.toUpperCase()),
      description: repo.description || "Web development project",
      techStack: repo.topics?.length > 0 ? repo.topics : ['Full Stack'],
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || '#',
      stats: {
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        updated: repo.pushed_at ? 
          new Date(repo.pushed_at).toLocaleDateString('en-GB') : 
          'Recently'
      },
      rawDate: repo.pushed_at ? new Date(repo.pushed_at) : new Date(0)
    }))
    .sort((a, b) => b.rawDate - a.rawDate); // Sort by newest first
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const repos = await getGitHubRepos();
        const processed = processRepos(repos);
        setProjects(processed);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-12">
            All Projects ({projects.length})
          </h1>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent rounded-full" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">
              Error loading projects. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}