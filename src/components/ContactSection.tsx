import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Globe, Instagram } from "lucide-react";

const contacts = [
  { icon: Mail, label: "Email", value: "bromine@ub.ac.id", href: "mailto:bromine@ub.ac.id" },
  { icon: Phone, label: "Phone", value: "+62 341 551611", href: "tel:+62341551611" },
  { icon: Globe, label: "Website", value: "bromine.ub.ac.id", href: "https://bromine.ub.ac.id" },
  { icon: Instagram, label: "Instagram", value: "@bromine_ub", href: "https://instagram.com/bromine_ub" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm mb-3">
            Get in Touch
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Contact &amp; Venue</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-display font-bold text-base mb-1">Conference Venue</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Faculty of Medicine, Universitas Brawijaya<br />
                    Jl. Veteran, Ketawanggede, Kec. Lowokwaru<br />
                    Kota Malang, Jawa Timur 65145, Indonesia
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contacts.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="glass rounded-xl p-4 flex items-center gap-3 group hover:border-primary/40 transition-colors"
                >
                  <c.icon className="text-primary shrink-0" size={18} />
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</p>
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {c.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-2xl overflow-hidden min-h-[350px]"
          >
            <iframe
              title="Venue Location - Faculty of Medicine, Universitas Brawijaya"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3441467498185!2d112.61293431477656!3d-7.963318794346637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629c21ddf4d9b%3A0x887d0e8bca8b0e9e!2sFakultas%20Kedokteran%20Universitas%20Brawijaya!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 350 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
