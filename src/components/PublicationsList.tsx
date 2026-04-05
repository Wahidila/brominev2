import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, BookOpen } from "lucide-react";

const publications = [
  { name: "Heart Science (HS)", indexing: "SCOPUS Q4, SINTA 1", url: "https://heartscience.ub.ac.id/index.php/heartscience" },
  { name: "Malang Neurology Journal (MNJ)", indexing: "SINTA 2, DOAJ", url: "https://mnj.ub.ac.id/index.php/mnj" },
  { name: "Journal of Anaesthesia and Pain (JAP)", indexing: "SINTA 2, DOAJ", url: "https://jap.ub.ac.id/index.php/jap" },
  { name: "Majalah Kesehatan (MK)", indexing: "SINTA 2", url: "https://majalahfk.ub.ac.id/index.php/mkfkub" },
  { name: "Jurnal Kedokteran Brawijaya (JKB)", indexing: "SINTA 3", url: "https://jkb.ub.ac.id/index.php/jkb" },
  { name: "Pediatric Science Journal (PSJ)", indexing: "SINTA 3", url: "https://pedscij.id/index.php/pedscij" },
  { name: "Pharmaceutical Journal of Indonesia (PJI)", indexing: "SINTA 3", url: "https://pji.ub.ac.id/index.php/pji" },
  { name: "Clinical and Research Journal in Internal Medicine (CRJIM)", indexing: "SINTA 4, DOAJ", url: "https://crjim.ub.ac.id/index.php/crjim" },
  { name: "Journal of Issues in Midwifery (JOIM)", indexing: "SINTA 4", url: "https://joim.ub.ac.id/index.php/joim" },
  { name: "Brawijaya Journal of Urology (BJU)", indexing: "SINTA 4", url: "https://bjurology.org/index.php/bju" },
  { name: "Journal of Pain, Headache and Vertigo (JPHV)", indexing: "SINTA 5", url: "https://jphv.ub.ac.id/index.php/jphv" },
  { name: "Malang Respiratory Journal (MRJ)", indexing: "SINTA 5", url: "https://mrj.ub.ac.id/index.php/mrj" },
  { name: "Journal of Psychiatry Psychology and Behavioral Research (JPPBR)", indexing: "SINTA 5", url: "https://jppbr.ub.ac.id/index.php/jppbr" },
  { name: "Journal of Community Health and Preventive Medicine (JOCHAPM)", indexing: "—", url: "https://jochapm.ub.ac.id/index.php/jochapm" },
  { name: "International Journal of Radiology and Imaging (IJRI)", indexing: "—", url: "https://ijri.ub.ac.id/index.php/ijri" },
  { name: "Journal of Dermatology, Venereology And Aesthetic (JDVA)", indexing: "—", url: "https://jdva.ub.ac.id/index.php/jdva" },
];

const getBadgeClass = (indexing: string) => {
  if (indexing.includes("SCOPUS")) return "bg-primary/20 text-primary";
  if (indexing.includes("SINTA 2")) return "bg-primary/15 text-primary";
  if (indexing.includes("SINTA 3")) return "bg-secondary text-foreground";
  return "bg-secondary text-muted-foreground";
};

const PublicationsList = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? publications : publications.slice(0, 8);

  return (
    <section id="publications" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm mb-3">Journals</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Publication Outputs</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-sm md:text-base">
            All presented abstracts will be published as proceedings with ISSN. Selected papers will be published in the following indexed journals.
          </p>
        </motion.div>

        <div className="grid gap-3">
          {displayed.map((pub, i) => (
            <motion.a
              key={pub.name}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="glass rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3 min-w-0">
                <BookOpen size={18} className="text-primary shrink-0 mt-0.5 sm:mt-0" />
                <span className="font-medium text-sm leading-tight">{pub.name}</span>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3 pl-7 sm:pl-0">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${getBadgeClass(pub.indexing)}`}>
                  {pub.indexing}
                </span>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="text-primary font-semibold text-sm hover:underline"
            >
              Show all {publications.length} journals →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationsList;
