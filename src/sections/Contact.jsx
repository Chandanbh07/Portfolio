import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.42-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 6.003 0c2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.475 5.922.43.37.814 1.096.814 2.21 0 1.596-.015 2.883-.015 3.276 0 .319.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contactInfo = [
  { icon: Mail, label: "Email", value: "chandanhiregoudra@gmail.com", href: "mailto:chandanhiregoudra@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 70193 08755", href: "tel:+917019308755" },
  { icon: MapPin, label: "Location", value: "Bangalore, India", href: null },
];

const socials = [
  { icon: GithubIcon, href: "#", label: "GitHub" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
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

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Replace with your actual form endpoint (Formspree, EmailJS, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full bg-black py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          subtitle="Have a project in mind or just want to connect? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide">{label}</p>
                  {href ? (
                    <a href={href} className="text-white text-sm font-medium hover:text-white/70 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 mt-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <Icon width={16} height={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4 bg-white/5 border border-white/10 rounded-2xl p-7"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>

            <textarea
              name="message"
              placeholder="Your message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center justify-center gap-2 bg-white text-black font-medium rounded-xl px-6 py-3 text-sm hover:bg-white/85 transition-colors disabled:opacity-50 mt-1"
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent!" : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>

            {status === "error" && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}