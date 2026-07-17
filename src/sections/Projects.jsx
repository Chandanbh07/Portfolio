import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Sentiment Analysis of Indian Political Tweets",
    description:
      "Built and evaluated NLP-based sentiment classification models using TF-IDF and LSTM/RNN, achieving 83% accuracy. Performed text preprocessing and model comparison to improve prediction reliability.",
    tags: ["Python", "NLP", "Deep Learning", "LSTM", "RNN"],
    github: "#",
    live: null,
  },
  {
    title: "CineStream — Mobile Movie Streaming App",
    description:
      "Developed a cross-platform mobile application using React Native and Expo with modular UI components. Implemented smooth navigation and optimized UI responsiveness across Android and iOS devices.",
    tags: ["React Native", "Expo", "JavaScript"],
    github: "#",
    live: null,
  },
  {
    title: "Learning Management System (LMS)",
    description:
      "Developed a full-stack LMS using the MERN stack with secure authentication and role-based access. Implemented backend functionality for course management and progress tracking.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    github: "#",
    live: null,
  },
];

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.42-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 6.003 0c2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.475 5.922.43.37.814 1.096.814 2.21 0 1.596-.015 2.883-.015 3.276 0 .319.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-16 max-w-2xl">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-white/60 text-sm uppercase tracking-[0.2em] font-medium mb-3"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="font-display text-4xl md:text-5xl text-white leading-tight mb-4"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-white/60 text-lg"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:bg-white/[0.07] hover:border-white/20 transition-colors"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-2xl text-white leading-snug pr-4">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={project.github}
              aria-label="GitHub repository"
              className="p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            >
              <GithubIcon width={16} height={16} />
            </a>
            {project.live && (
              <a
                href={project.live}
                aria-label="Live demo"
                className="p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              >
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="text-white/65 text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-white/80 bg-white/10 border border-white/10 rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative w-full bg-black py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          subtitle="A selection of projects I'm proud of — from side experiments to production apps."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}