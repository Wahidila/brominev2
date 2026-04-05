import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const scopes = [
  "Biomolecular", "Tuberculosis", "Infectious Diseases", "Degenerative Diseases",
  "Internal Medicine", "Pediatrics", "Surgery", "Obstetrics & Gynecology",
  "Neuroscience", "Ophthalmology", "Skin & Venereology", "Cardiovascular Disease",
  "Radiology", "Clinical Pathology", "Anatomical Pathology", "Psychiatry",
  "Orthopedics & Traumatology", "Urology", "Clinical Microbiology", "Emergency Medicine",
  "Family Medicine", "Anesthesiology & Intensive Care", "Pulmonology & Respiratory Medicine",
  "Otorhinolaryngology, Head & Neck Surgery", "Plastic, Reconstructive & Aesthetic Surgery",
  "Physical Medicine & Rehabilitation",
];

const posterTypes = ["Original Research", "Case Report", "Review / Meta-analysis"];

const ScopeGrid = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? scopes : scopes.slice(0, 12);

  return (
    <section id="scope" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm mb-3">Topics</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Conference Scope</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayed.map((scope, i) => (
            <motion.div
              key={scope}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.03 * i }}
              className={`glass rounded-xl p-4 text-center text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default ${scope === "Tuberculosis" ? "border-primary/40 bg-primary/10 text-primary" : "text-foreground"
                }`}
            >
              {scope}
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="text-primary font-semibold text-sm hover:underline"
            >
              Show all {scopes.length} topics →
            </button>
          </div>
        )}

        {/* Poster types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm mb-4">Poster Categories</p>
          <div className="flex flex-wrap justify-center gap-3">
            {posterTypes.map((type) => (
              <span key={type} className="px-5 py-2.5 rounded-full border border-primary/30 text-sm font-medium text-primary">
                {type}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScopeGrid;
