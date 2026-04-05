import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CalendarCheck, FileText, Presentation, Send } from "lucide-react";

const events = [
  {
    icon: Send,
    date: "May 31, 2026",
    title: "Early-Bird Abstract Deadline",
    description: "Submit your abstract early for reduced registration fees.",
    highlight: true,
  },
  {
    icon: FileText,
    date: "June 30, 2026",
    title: "Regular Abstract Deadline",
    description: "Final deadline for abstract submissions.",
  },
  {
    icon: CalendarCheck,
    date: "September 4, 2026",
    title: "Workshop Day",
    description: "Hands-on workshops and pre-conference sessions.",
  },
  {
    icon: Presentation,
    date: "September 5–6, 2026",
    title: "Conference & Poster Presentation",
    description: "Main conference sessions, keynotes, and poster presentations.",
    highlight: true,
  },
  {
    icon: FileText,
    date: "September 30, 2026",
    title: "Paper Submission Deadline",
    description: "Submit full papers for journal publication.",
  },
];

const TimelineSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dates" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm mb-3">Schedule</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Important Dates</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className={`relative flex items-start mb-10 md:mb-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary z-10 mt-5" />

                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div
                    className={`glass rounded-xl p-5 hover:border-primary/40 transition-colors ${event.highlight ? "border-primary/30 animate-pulse-glow" : ""
                      }`}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                      <event.icon className="text-primary" size={18} />
                      <span className="text-primary font-semibold text-sm">{event.date}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg mb-1">{event.title}</h3>
                    <p className="text-muted-foreground text-sm">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
