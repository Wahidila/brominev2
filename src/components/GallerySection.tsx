import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
    { id: 1, src: "https://picsum.photos/seed/bromine1/600/400", alt: "Conference Opening" },
    { id: 2, src: "https://picsum.photos/seed/bromine2/600/800", alt: "Keynote Session" },
    { id: 3, src: "https://picsum.photos/seed/bromine3/600/500", alt: "Networking Session" },
    { id: 4, src: "https://picsum.photos/seed/bromine4/600/700", alt: "Panel Discussion" },
    { id: 5, src: "https://picsum.photos/seed/bromine5/600/450", alt: "Award Ceremony" },
    { id: 6, src: "https://picsum.photos/seed/bromine6/600/600", alt: "Poster Presentation" },
];

const GallerySection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <section id="gallery" className="section-padding" ref={ref}>
            <div className="container mx-auto max-w-6xl px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm mb-3">
                        Moments
                    </p>
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Conference Gallery</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                        Explore highlights from our previous BMC conferences
                    </p>
                </motion.div>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {galleryImages.map((image, i) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.05 * i }}
                            className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-xl"
                            onClick={() => setSelectedImage(image.id)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                                        <ZoomIn size={24} className="text-primary" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="font-medium text-sm">{image.alt}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Lightbox Modal */}
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="max-w-4xl max-h-[85vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {(() => {
                                const image = galleryImages.find((img) => img.id === selectedImage);
                                return image ? (
                                    <>
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="max-w-full max-h-[80vh] rounded-xl object-contain"
                                        />
                                        <div className="mt-4 text-center">
                                            <p className="font-display font-bold text-lg">{image.alt}</p>
                                        </div>
                                    </>
                                ) : null;
                            })()}
                        </motion.div>

                        {/* Navigation Arrows */}
                        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage);
                                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
                                    setSelectedImage(galleryImages[prevIndex].id);
                                }}
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors pointer-events-auto"
                            >
                                ←
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage);
                                    const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
                                    setSelectedImage(galleryImages[nextIndex].id);
                                }}
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors pointer-events-auto"
                            >
                                →
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default GallerySection;
