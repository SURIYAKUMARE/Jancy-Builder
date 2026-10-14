import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CANONICAL_PROJECTS, getProjectById, getRelatedProjects } from "@/data/projects-data";
import ProjectDetailClient from "./ProjectDetailClient";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return CANONICAL_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectById(params.id);
  if (!project) {
    return {
      title: "Project Not Found | Jancy Builders",
    };
  }

  return {
    title: `${project.name} (${project.location}) | Jancy Builders`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.name} | Jancy Builders`,
      description: project.description,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 800,
          alt: project.name,
        },
      ],
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectById(params.id);
  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.id, 3);

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} />;
}
