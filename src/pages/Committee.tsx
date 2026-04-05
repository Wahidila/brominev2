import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, UserCheck, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

interface CommitteeMember {
  name: string;
  role?: string;
}

const advisoryBoard: CommitteeMember[] = [
  { name: "Advisory Member xxx" },
  { name: "Advisory Member xxx" },
  { name: "Advisory Member xxx" },
  { name: "Advisory Member xxx" },
];

const organizingChairman: CommitteeMember = {
  name: "Chairman xxx",
  role: "Chairman",
};

const teamMembers: CommitteeMember[] = [
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
  { name: "Team Member xxx" },
];

const reviewers: CommitteeMember[] = [
  { name: "Reviewer xxx" },
  { name: "Reviewer xxx" },
  { name: "Reviewer xxx" },
];

const MemberCard = ({
  member,
  delay,
  icon: Icon,
}: {
  member: CommitteeMember;
  delay: number;
  icon?: React.ElementType;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="glass rounded-xl p-4 hover:border-primary/40 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Icon size={18} className="text-primary" />
          </div>
        )}
        <div>
          <p className="font-medium text-sm group-hover:text-primary transition-colors">
            {member.name}
          </p>
          {member.role && (
            <span className="text-xs text-primary font-semibold">{member.role}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SectionHeader = ({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 mb-8"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
        <Icon size={28} className="text-primary-foreground" />
      </div>
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

const Committee = () => {
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
              Committee & <span className="text-primary">Reviewer</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Meet the dedicated team of professionals organizing and reviewing for BMC 2026 International Conference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader
            icon={Award}
            title="Advisory Board"
            subtitle="Distinguished advisors guiding the conference"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advisoryBoard.map((member, i) => (
              <MemberCard key={member.name} member={member} delay={i * 0.1} icon={Award} />
            ))}
          </div>
        </div>
      </section>

      {/* Organizing Committee */}
      <section className="section-padding bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader
            icon={Users}
            title="Organizing Committee"
            subtitle="The team making BMC 2026 possible"
          />

          {/* Chairman */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
              Chairman
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-6 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent max-w-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
                  <Users size={28} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display font-bold text-lg">{organizingChairman.name}</p>
                  <span className="text-sm text-primary font-semibold">{organizingChairman.role}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Team Members */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
              Team Members
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member, i) => (
                <MemberCard key={member.name} member={member} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviewers */}
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl px-4">
          <SectionHeader
            icon={UserCheck}
            title="List of Reviewers"
            subtitle="Expert reviewers ensuring quality standards"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviewers.map((member, i) => (
              <MemberCard key={member.name} member={member} delay={i * 0.1} icon={UserCheck} />
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Committee;
