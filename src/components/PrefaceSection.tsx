import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Users, Award } from "lucide-react";

const stats = [
  { icon: Globe, value: "30+", label: "Countries" },
  { icon: Users, value: "500+", label: "Participants" },
  { icon: Award, value: "4th", label: "Edition" },
];

const PrefaceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="preface" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm mb-3">About</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            The Conference
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto text-base md:text-lg">
            According to the latest data from the QS World University Rankings by Subject 2025/2026, the Faculty of Medicine, Universitas Brawijaya (FKUB) continues to strengthen its position as one of the top medical education institutions in Indonesia and globally. The Brawijaya Medical Conference (BMC) is an annual international conference organized by the Faculty of Medicine, Brawijaya University (FKUB). This conference is one of the most prestigious medical scientific forums in Indonesia, bringing together researchers, clinicians, academics, and medical students from around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="glass rounded-2xl p-8 text-center hover:border-primary/40 transition-colors"
            >
              <stat.icon className="mx-auto text-primary mb-4" size={32} />
              <p className="font-display text-4xl font-bold mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrefaceSection;
