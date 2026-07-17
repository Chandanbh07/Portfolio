import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "Chandangouda was a reliable teammate during our academic project — always ready to debug, iterate, and push the LMS forward under tight deadlines.",
    name: "Teammate",
    role: "Project Collaborator, KLE Technological University",
  },
  {
    quote:
      "Working with him on the mobile app project, I noticed his attention to detail with UI responsiveness and how quickly he picked up React Native.",
    name: "Project Partner",
    role: "Fellow Student Developer",
  },
  {
    quote:
      "His research paper on sentiment analysis showed real depth in NLP and deep learning — solid grasp of both theory and implementation.",
    name: "Faculty Mentor",
    role: "Department of CSE",
  },
];

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-16 max-w-2xl mx-auto text-center">
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

function TestimonialCard({ testimonial, index }) {
  const initial = testimonial.name.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col justify-between h-full hover:bg-white/[0.07] hover:border-white/20 transition-colors"
    >
      <p className="text-white/75 text-sm leading-relaxed mb-6">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white font-semibold text-sm">
          {initial}
        </div>
        <div>
          <p className="text-white text-sm font-medium">{testimonial.name}</p>
          <p className="text-white/50 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full bg-black py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say"
          subtitle="Feedback from collaborators, mentors, and teammates I've worked with."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}