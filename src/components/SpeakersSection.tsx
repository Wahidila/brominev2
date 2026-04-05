import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, Presentation } from "lucide-react";
import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";
import speaker4 from "@/assets/speaker-4.jpg";

const keynoteSpeakers = [
  {
    id: 1,
    name: "Speaker xxx",
    institution: "Institution xxx",
    topic: "Topic TBA",
    image: speaker1,
  },
  {
    id: 2,
    name: "Speaker xxx",
    institution: "Institution xxx",
    topic: "Topic TBA",
    image: speaker2,
  },
  {
    id: 3,
    name: "Speaker xxx",
    institution: "Institution xxx",
    topic: "Topic TBA",
    image: speaker3,
  },
  {
    id: 4,
    name: "Speaker xxx",
    institution: "Institution xxx",
    topic: "Topic TBA",
    image: speaker4,
  },
];

const plenarySpeakers = [
  { id: 1, name: "Speaker xxx", institution: "Institution xxx" },
  { id: 2, name: "Speaker xxx", institution: "Institution xxx" },
  { id: 3, name: "Speaker xxx", institution: "Institution xxx" },
  { id: 4, name: "Speaker xxx", institution: "Institution xxx" },
  { id: 5, name: "Speaker xxx", institution: "Institution xxx" },
];

const SpeakersSection = () => {
  const ref = useRef(null);
  const plenaryRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const plenaryInView = useInView(plenaryRef, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<typeof keynoteSpeakers[0] | null>(null);

  return (
    <section id="speakers" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl px-4">
        {/* Keynote & Invited Speakers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm mb-3">
            Speakers
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Keynote &amp; Invited Speakers</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keynoteSpeakers.map((speaker, i) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/40 transition-colors"
              onClick={() => setSelected(speaker)}
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-2">
                    Keynote Speaker
                  </span>
                  <h3 className="font-display font-bold text-sm leading-tight">{speaker.name}</h3>
                </div>
              </div>
              <div className="p-4 pt-2">
                <p className="text-xs text-muted-foreground mb-2">{speaker.institution}</p>
                <p className="text-xs text-primary font-medium leading-snug">"{speaker.topic}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plenary Speakers */}
        <div ref={plenaryRef} className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={plenaryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm mb-3">
              Plenary Sessions
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">Plenary Speakers</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plenarySpeakers.map((speaker, i) => (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={plenaryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="glass rounded-xl p-5 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
                    <Presentation size={24} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                      {speaker.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">{speaker.institution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Speaker Modal */}
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass rounded-2xl max-w-lg w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex gap-5 items-start">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-24 h-24 rounded-xl object-cover shrink-0"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">
                    Keynote Speaker
                  </span>
                  <h3 className="font-display font-bold text-lg mt-1">{selected.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{selected.institution}</p>
                </div>
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm text-primary font-semibold">"{selected.topic}"</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SpeakersSection;
