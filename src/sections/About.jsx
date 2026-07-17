import { motion } from "motion/react";

const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "200+", label: "GitHub Commits" },
  { value: "15+", label: "Technologies Learned" },
  { value: "100%", label: "Passion for Learning" },
];

const skills = {
  Frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "React Native", "Tailwind CSS", "Bootstrap", "shadcn/ui"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Google OAuth", "Redis"],
  "Database & ORM": ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Supabase", "Prisma ORM", "Neon Postgres", "Upstash Redis"],
  "Tools & Platforms": ["Git", "GitHub", "Docker", "Postman", "VS Code", "Vercel", "Render", "npm"],
};

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-10">
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
        className="font-display text-4xl md:text-5xl text-white leading-tight"
      >
        {title}
      </motion.h2>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative w-full bg-black py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="About Me" title="Passionate about building great things" />

        {/* Intro paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white/75 text-lg md:text-xl leading-relaxed max-w-3xl mb-16 flex flex-col gap-5"
        >
          <p>
            Hi, I'm Chandangouda — a passionate Full Stack Developer based in India. I enjoy
            building modern, responsive, and scalable web applications that deliver seamless
            user experiences.
          </p>
          <p>
            My primary tech stack includes React, Next.js, TypeScript, Node.js, Express.js, and
            MongoDB. I focus on writing clean, maintainable code while emphasizing performance,
            accessibility, and intuitive UI design.
          </p>
          <p>
            I'm constantly learning new technologies, exploring modern development practices,
            and building projects that strengthen my skills. I'm currently seeking opportunities
            where I can contribute, grow as a software engineer, and solve real-world problems
            through technology.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <p className="font-display text-3xl md:text-4xl text-white mb-1">{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <h3 className="font-display text-2xl md:text-3xl text-white mb-8">
          Skills & Technologies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h4 className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-4">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm text-white bg-white/10 border border-white/10 rounded-full px-3 py-1.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}