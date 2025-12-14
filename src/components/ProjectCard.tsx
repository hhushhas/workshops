import React from 'react';
import { Project } from '../types';
import { Calendar, FileText, Edit2, Share2, Archive } from 'lucide-react';
import '../styles/hub.css';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  onEdit?: (project: Project) => void;
  onShare?: (project: Project) => void;
  onArchive?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onOpen, 
  onEdit, 
  onShare, 
  onArchive 
}) => {
  return (
    <div className="project-card" onClick={() => onOpen(project)}>
      <div 
        className="card-preview"
        style={{ background: project.thumbnailGradient }}
      >
        <div className="card-preview-overlay" />
        <div className="card-actions" onClick={e => e.stopPropagation()}>
          <button 
            className="action-btn" 
            title="Edit"
            onClick={() => onEdit?.(project)}
          >
            <Edit2 size={14} />
          </button>
          <button 
            className="action-btn" 
            title="Share"
            onClick={() => onShare?.(project)}
          >
            <Share2 size={14} />
          </button>
          <button 
            className="action-btn" 
            title="Archive"
            onClick={() => onArchive?.(project)}
          >
            <Archive size={14} />
          </button>
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        
        <div className="card-meta">
          <div className="meta-item">
            <Calendar size={14} />
            <span>{project.lastModified}</span>
          </div>
          <div className="meta-item">
            <FileText size={14} />
            <span>{project.slideCount} slides</span>
          </div>
        </div>
      </div>
    </div>
  );
};
