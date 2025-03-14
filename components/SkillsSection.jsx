'use client';
import { useState } from 'react';
import { skills } from '@/data/skills';
import { motion } from 'framer-motion';
import { Tooltip } from './Tooltip';

const categoryColors = {
  Frontend: 'bg-blue-500',
  Backend: 'bg-green-500',
  DevOps: 'bg-purple-500'
};

const SkillCard = ({ skill, category }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-4 mb-4">
      <span className="text-2xl">{skill.icon}</span>
      <h3 className="text-lg text-gray-600 font-semibold">{skill.name}</h3>
    </div>
    <div className="relative pt-2">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Proficiency</span>
        <span className={`text-sm text-gray-400 ${categoryColors[category].replace('bg', 'text')}`}>
          {skill.level}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full ${categoryColors[category]} rounded-full`}
        />
      </div>
    </div>
  </motion.div>
);

export const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...skills.map(s => s.category)];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category 
                  ? `${categoryColors[category] || 'bg-blue-500'} text-white`
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills
            .filter(({ category }) => 
              selectedCategory === 'All' || category === selectedCategory
            )
            .map(({ category, items }) => (
              <div 
                key={category}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  {category}
                </h3>
                <div className="grid gap-6">
                  {items.map((skill, index) => (
                    <SkillCard 
                      key={index}
                      skill={skill}
                      category={category}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};