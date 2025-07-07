'use client';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { SkillsSection } from '@/components/SkillsSection';

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
  return repos.map(repo => ({
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
  }));
}

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const repos = await getGitHubRepos();
        const sortedRepos = repos.sort((a, b) => {
          const dateA = a.pushed_at ? new Date(a.pushed_at) : new Date(0);
          const dateB = b.pushed_at ? new Date(b.pushed_at) : new Date(0);
          return dateB - dateA;
        });
        const latestRepos = sortedRepos.slice(0, 3);
        const processed = processRepos(latestRepos);
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
    <>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <img 
              src="/profile.jpg"
              alt="Lyle Oliver"
              className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-white"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Lyle Oliver
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-600 mb-6">
                Full Stack Web Developer
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto md:mx-0">
                Building scalable web applications with modern technologies.
                Based in Cape Town, South Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-600 mb-12">
            Latest Projects
          </h2>

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
      </section>

      <SkillsSection />

      <Footer />
    </>
  );
}
