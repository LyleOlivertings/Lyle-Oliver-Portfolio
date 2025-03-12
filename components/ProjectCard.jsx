export default function ProjectCard({ project }) {
    const daysSinceUpdate = Math.floor(
        (new Date() - project.rawDate) / (1000 * 60 * 60 * 24)
      );
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all relative">
        {/* Freshness Badge */}
        {daysSinceUpdate <= 30 && (
          <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {daysSinceUpdate === 0 ? 'Updated today' : 
            `Updated ${daysSinceUpdate} day${daysSinceUpdate === 1 ? '' : 's'} ago`}
          </span>
        )}
        {/* Project Status Badges */}
        <div className="absolute top-2 right-2 flex gap-2">
          {project.isArchived && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              Archived
            </span>
          )}
          {project.isFork && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              Fork
            </span>
          )}
        </div>
  
        {/* Project Image */}
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">No preview available</span>
          )}
        </div>
  
        {/* Project Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                ★ {project.stats.stars}
              </span>
              <span className="text-sm text-gray-500">
                ⎇ {project.stats.forks}
              </span>
            </div>
          </div>
  
          <p className="text-gray-600 mb-4">{project.description}</p>
  
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
  
          {/* Project Links */}
          <div className="flex gap-4 mt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-1 flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Live Demo</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            <a
              href={project.githubUrl}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-1 flex-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Code</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </a>
          </div>
  
          {/* Last Updated */}
          <div className="mt-4 text-sm text-gray-500 text-right">
            Updated: {project.stats.updated}
          </div>
        </div>
      </div>
    );
  }