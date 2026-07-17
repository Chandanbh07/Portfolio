import { motion } from "motion/react";

const experiences = [
  {
    role: "Academic & Project Experience",
    company: "KLE Technological University",
    location: "Hubli, India",
    period: "Nov 2022 — Present",
    points: [
      "Developed academic and self-driven projects involving full-stack web development, mobile applications, and machine learning.",
      "Collaborated in team-based projects by following SDLC principles and Agile-style workflows.",
      "Utilized Git for version control, debugging, and iterative feature development across multiple project cycles.",
    ],
    tags: ["React", "Node.js", "MongoDB", "React Native", "Python", "Git"],
  },
];

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

function ExperienceCard({ exp, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Timeline rail */}
      <div className="flex flex-col items-center shrink-0">
        <span className="w-3 h-3 rounded-full bg-white mt-2" />
        {!isLast && <span className="w-px flex-1 bg-white/15 mt-2" />}
      </div>

      {/* Content */}
      <div className="pb-16 flex-1">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
          <div>
            <h3 className="font-display text-2xl text-white leading-snug">{exp.role}</h3>
            <p className="text-white/70 text-sm mt-1">
              {exp.company} {exp.location && `· ${exp.location}`}
            </p>
          </div>
          <p className="text-white/50 text-sm shrink-0">{exp.period}</p>
        </div>

        <ul className="flex flex-col gap-2 mb-5">
          {exp.points.map((point, i) => (
            <li key={i} className="text-white/65 text-sm leading-relaxed flex gap-2">
              <span className="text-white/40 mt-1">—</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-white/80 bg-white/10 border border-white/10 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative w-full bg-black py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've grown"
          subtitle="Academic projects and hands-on work that shaped my skills as a developer."
        />

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.role}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}