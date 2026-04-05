import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Coffee, Mic, Users, Award, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

interface ScheduleItem {
    time: string;
    agenda: string;
    details?: string;
    icon?: React.ElementType;
}

interface SessionGroup {
    session: string;
    icon: React.ElementType;
    items: ScheduleItem[];
}

const day1Schedule: SessionGroup[] = [
    {
        session: "Opening Ceremony",
        icon: Award,
        items: [
            { time: "07:45 - 08:00", agenda: "Registration" },
            { time: "08:00 - 08:15", agenda: "Opening Ceremony, MC" },
            { time: "08:15 - 08:20", agenda: "Indonesian National Anthem" },
            { time: "08:20 - 08:25", agenda: "Committee report of the 1st BMC", details: "xxx" },
            { time: "08:25 - 08:35", agenda: "Warm Greeting from Head of Chemical Engineering Department", details: "xxx" },
            { time: "08:35 - 08:40", agenda: "Warm Greeting from Dean of Faculty of Engineering", details: "xxx" },
            { time: "08:40 - 08:45", agenda: "Opening Speech from Rector of Universitas Brawijaya", details: "xxx" },
            { time: "08:45 - 08:50", agenda: "Photo Session" },
            { time: "08:50 - 09:00", agenda: "Traditional Dance Performance, Universitas Brawijaya" },
        ],
    },
    {
        session: "Break Session",
        icon: Coffee,
        items: [{ time: "09:00 - 09:15", agenda: "Coffee Break" }],
    },
    {
        session: "Keynote Speech",
        icon: Mic,
        items: [
            {
                time: "09:15 - 10:45",
                agenda: "Keynote Speakers",
                details: `1. Speaker xxx
2. Speaker xxx
3. Speaker xxx

Moderator: xxx`,
            },
        ],
    },
    {
        session: "Plenary Session",
        icon: BookOpen,
        items: [
            {
                time: "10:45 - 12:15",
                agenda: "Plenary Speaker",
                details: `Speaker xxx

Moderator: xxx`,
            },
        ],
    },
    {
        session: "Break Session",
        icon: Coffee,
        items: [{ time: "12:15 - 13:00", agenda: "Lunch and Prayer Break" }],
    },
    {
        session: "Parallel Session",
        icon: Users,
        items: [{ time: "13:00 - 15:00", agenda: "Parallel Session" }],
    },
    {
        session: "Break Session",
        icon: Coffee,
        items: [{ time: "15:00 - 15:15", agenda: "Coffee Break" }],
    },
    {
        session: "Plenary Session",
        icon: BookOpen,
        items: [
            {
                time: "15:15 - 16:15",
                agenda: "Plenary Speakers",
                details: `1. Speaker xxx
2. Speaker xxx

Moderator: xxx`,
            },
        ],
    },
];

const day2Schedule: SessionGroup[] = [
    {
        session: "Registration",
        icon: Calendar,
        items: [{ time: "07:45 - 08:00", agenda: "Registration" }],
    },
    {
        session: "Plenary Session",
        icon: BookOpen,
        items: [
            {
                time: "08:30 - 09:30",
                agenda: "Plenary Speakers",
                details: `1. Speaker xxx
2. Speaker xxx

Moderator: xxx`,
            },
        ],
    },
    {
        session: "Break Session",
        icon: Coffee,
        items: [{ time: "09:30 - 09:45", agenda: "Coffee Break" }],
    },
    {
        session: "Parallel Session",
        icon: Users,
        items: [{ time: "09:45 - 12:00", agenda: "Parallel Session" }],
    },
    {
        session: "Break Session",
        icon: Coffee,
        items: [{ time: "12:00 - 13:00", agenda: "Lunch and Prayer Break" }],
    },
    {
        session: "Parallel Session",
        icon: Users,
        items: [{ time: "13:00 - 15:00", agenda: "Parallel Session" }],
    },
    {
        session: "Closing Ceremony",
        icon: Award,
        items: [
            { time: "15:00 - 16:00", agenda: "Announcement of Best Presenters" },
            { time: "", agenda: "Closing Remarks" },
        ],
    },
];

const ScheduleCard = ({
    group,
    delay,
}: {
    group: SessionGroup;
    delay: number;
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const Icon = group.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay }}
            className="glass rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300"
        >
            {/* Session Header */}
            <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg">{group.session}</h3>
            </div>

            {/* Items */}
            <div className="divide-y divide-border/50">
                {group.items.map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-primary/5 transition-colors">
                        <div className="flex gap-4">
                            {item.time && (
                                <div className="shrink-0 w-28">
                                    <div className="flex items-center gap-2 text-primary font-mono text-sm font-semibold">
                                        <Clock size={14} />
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            )}
                            <div className="flex-1">
                                <p className="font-medium text-sm">{item.agenda}</p>
                                {item.details && (
                                    <p className="text-xs text-muted-foreground mt-2 whitespace-pre-line leading-relaxed">
                                        {item.details}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const Schedule = () => {
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const [activeDay, setActiveDay] = useState<1 | 2>(1);

    const currentSchedule = activeDay === 1 ? day1Schedule : day2Schedule;

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
                            Event <span className="text-primary">Schedule</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Here is our event schedule for the 2-day BMC 2026 International Conference.
                        </p>
                    </motion.div>

                    {/* Day Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex gap-4 mt-10"
                    >
                        <button
                            onClick={() => setActiveDay(1)}
                            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${activeDay === 1
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                                : "glass hover:border-primary/40"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <Calendar size={18} />
                                Day 1
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveDay(2)}
                            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${activeDay === 2
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                                : "glass hover:border-primary/40"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <Calendar size={18} />
                                Day 2
                            </span>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Schedule Content */}
            <section className="section-padding">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.div
                        key={activeDay}
                        initial={{ opacity: 0, x: activeDay === 1 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        {currentSchedule.map((group, i) => (
                            <ScheduleCard key={`${activeDay}-${group.session}-${i}`} group={group} delay={i * 0.08} />
                        ))}
                    </motion.div>

                    {/* Timezone Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground">
                            <Clock size={16} className="text-primary" />
                            <span>All times are in GMT+7 (Western Indonesia Time)</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <FooterSection />
        </div>
    );
};

export default Schedule;
