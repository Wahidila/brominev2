import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Download, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const GUIDEBOOK_URL = "https://s.ub.ac.id/guidebook-bromine2024";

const Guidebook = () => {
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 relative overflow-hidden" ref={heroRef}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                <div className="container mx-auto max-w-6xl px-4 relative">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm mb-3">
                            BMC 2026
                        </p>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                            <span className="text-primary">Guidebook</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Download the official BMC conference guidebook for detailed information about the event.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Download Section */}
            <section className="section-padding">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl shadow-primary/30"
                            >
                                <BookOpen size={48} className="text-primary-foreground" />
                            </motion.div>

                            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                                Download Guidebook
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                                Click the button or icon below to download the official BMC conference guidebook.
                            </p>

                            {/* Download Button */}
                            <motion.a
                                href={GUIDEBOOK_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300"
                            >
                                <Download size={24} />
                                <span>Download Guidebook</span>
                                <ExternalLink size={18} className="opacity-70" />
                            </motion.a>

                            {/* Link text */}
                            <div className="mt-6">
                                <a
                                    href={GUIDEBOOK_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                                >
                                    <span className="font-mono">{GUIDEBOOK_URL}</span>
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Additional info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-sm text-muted-foreground">
                            The guidebook contains important information about conference sessions, venue, and guidelines.
                        </p>
                    </motion.div>
                </div>
            </section>

            <FooterSection />
        </div>
    );
};

export default Guidebook;
