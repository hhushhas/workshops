import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { projects as initialProjects } from '../data/projects';
import { Plus, Search, Filter } from 'lucide-react';
import { NewProjectModal } from './NewProjectModal';
import { MarkdownEditor } from './MarkdownEditor';
import '../styles/hub.css';

interface ProjectHubProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectHub: React.FC<ProjectHubProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editorContent, setEditorContent] = useState('');

  // Load projects from localStorage on mount and merge with initial
  useEffect(() => {
    const saved = localStorage.getItem('slide-hub-projects');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge unique projects by ID
      const merged = [...initialProjects];
      parsed.forEach((p: Project) => {
        if (!merged.find(existing => existing.id === p.id)) {
          merged.push(p);
        }
      });
      setProjects(merged);
    }
  }, []);

  /* Existing logic */
  
  const handleCreateProject = async (title: string, description: string) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `${id}.md`;
    
    // Create new project object
    const newProject: Project = {
      id,
      title,
      description,
      path: `/slides/${filename}`,
      lastModified: new Date().toISOString().split('T')[0],
      slideCount: 1,
      tags: ['New'],
      thumbnailGradient: `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)} 0%, #${Math.floor(Math.random()*16777215).toString(16)} 100%)`
    };

    const initialContent = `# ${title}\n\n${description}\n\n---\n\n## Slide 1\n\nStart your presentation here.`;

    // Try to create the file via API
    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({ filename, content: initialContent })
      });

      if (!response.ok) {
         if (response.status === 409) throw new Error('Project with this name already exists');
         throw new Error('Failed to create file');
      }

      // Update state and localStorage
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      
      const newProjects = updatedProjects.filter(p => !initialProjects.find(ip => ip.id === p.id));
      localStorage.setItem('slide-hub-projects', JSON.stringify(newProjects));

    } catch (err) {
      console.error('File creation failed', err);
      alert((err as Error).message);
    }
  };

  const handleEditProject = async (project: Project) => {
    try {
      const response = await fetch(project.path);
      if (!response.ok) throw new Error('Failed to load project content');
      const text = await response.text();
      setEditingProject(project);
      setEditorContent(text);
      setIsEditorOpen(true);
    } catch (err) {
      alert('Could not load project for editing');
    }
  };

  const handleSaveEdit = async () => {
    if (!editingProject) return;
    
    
    try {
      // Extract filename from the actual path to ensure we update the correct file
      const filename = editingProject.path.split('/').pop() || editingProject.id + '.md';
      
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ filename, content: editorContent })
      });

      if (!response.ok) throw new Error('Failed to save changes');
      
      setIsEditorOpen(false);
      
      // Update basic metadata if needed (e.g. lastModified)
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, lastModified: new Date().toISOString().split('T')[0] } 
          : p
      );
      setProjects(updatedProjects);
      
      // Persist changes
      const customProjects = updatedProjects.filter(p => !initialProjects.find(ip => ip.id === p.id));
      localStorage.setItem('slide-hub-projects', JSON.stringify(customProjects));

    } catch (err) {
      alert('Failed to save changes');
    }
  };
  
  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="hub-container">
      {/* ... Header ... */}
      <div className="hub-header">
        <h1 className="hub-title">Project Workspace</h1>
        <p className="hub-subtitle">Manage and present your slide decks</p>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '2rem',
        alignItems: 'center'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          background: 'var(--bg-secondary)', 
          padding: '0.5rem 1rem', 
          borderRadius: '8px', 
          border: '1px solid var(--border)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <Search size={20} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              width: '100%',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            <Filter size={18} />
            <span>Sort & Filter</span>
          </button>
        </div>
      </div>

      <div className="projects-grid">
        <div 
          className="new-project-card" 
          style={{ cursor: 'pointer' }}
          onClick={() => setIsModalOpen(true)}
        >
          {/* ... New Card Content ... */}
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'var(--bg-secondary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '1rem',
            border: '1px solid var(--border)'
          }}>
            <Plus size={32} />
          </div>
          <h3>Create New Project</h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Start a new presentation</p>
        </div>

        {filteredProjects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onOpen={onSelectProject}
            onEdit={() => handleEditProject(project)}
            onShare={() => console.log('Share', project.id)}
            onArchive={() => console.log('Archive', project.id)}
          />
        ))}
      </div>
      
      <NewProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="editor-modal-overlay">
          <div className="editor-modal">
            <div className="editor-header">
              <h2>Editing: {editingProject?.title}</h2>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setIsEditorOpen(false)} className="cancel-btn">Cancel</button>
                <button onClick={handleSaveEdit} className="create-btn">Save Changes</button>
              </div>
            </div>
            <div className="editor-content">
              <MarkdownEditor 
                value={editorContent} 
                onChange={(val) => setEditorContent(val || '')} 
                height="70vh"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .editor-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .editor-modal {
          background: var(--bg-primary);
          width: 100%;
          max-width: 1200px;
          height: 90vh;
          border-radius: 12px;
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
        }
        .editor-header {
          padding: 1rem 2rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .editor-content {
          padding: 1rem;
          flex: 1;
          overflow: hidden; /* Let editor handle scroll */
        }
      `}</style>
    </div>
  );
};
