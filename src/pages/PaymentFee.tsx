import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Banknote, Globe, User, Users, Copy, Check } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

interface FeeCard {
    title: string;
    icon: React.ElementType;
    fees: { label: string; price: string }[];
    highlight?: boolean;
}

const presenterFees: FeeCard[] = [
    {
        title: "Indonesian Presenter",
        icon: User,
        fees: [
            { label: "Early-bird", price: "750,000 IDR" },
            { label: "Regular", price: "850,000 IDR" },
        ],
        highlight: true,
    },
    {
        title: "International Presenter",
        icon: Globe,
        fees: [
            { label: "Early-bird", price: "$75 USD" },
            { label: "Regular", price: "$90 USD" },
        ],
    },
];

const nonPresenterFees: FeeCard[] = [
    {
        title: "Indonesian Non-Presenter",
        icon: Users,
        fees: [
            { label: "On-site", price: "350,000 IDR" },
            { label: "Online", price: "100,000 IDR" },
        ],
    },
    {
        title: "International Non-Presenter",
        icon: Globe,
        fees: [
            { label: "On-site", price: "$35 USD" },
            { label: "Online", price: "$15 USD" },
        ],
    },
];

const indonesianPayment = {
    bank: "BNI",
    bankCode: "009",
    accountNumber: "1821043068",
    accountName: "Maratul Fauziyah",
    transferNews: "BMC_Name of Presenter",
};

const internationalPayment = {
    bank: "BNI",
    branch: "Surabaya",
    bankAddress: "Kampus ITS, Keputih, Surabaya",
    postalCode: "60111",
    accountNumber: "1821043068",
    swiftCode: "BNINIDJAXXX",
    accountName: "Maratul Fauziyah",
    transferNews: "BMC_Name of Presenter",
};

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
            title="Copy to clipboard"
        >
            {copied ? (
                <Check size={14} className="text-green-500" />
            ) : (
                <Copy size={14} className="text-muted-foreground" />
            )}
        </button>
    );
};

const FeeCardComponent = ({ card, delay }: { card: FeeCard; delay: number }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const Icon = card.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay }}
            className={`glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 ${card.highlight ? "border-primary/30 bg-gradient-to-br from-primary/5 to-transparent" : ""
                }`}
        >
            <div className="flex items-center gap-3 mb-6">
                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.highlight
                        ? "bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/30"
                        : "bg-primary/10"
                        }`}
                >
                    <Icon size={24} className={card.highlight ? "text-primary-foreground" : "text-primary"} />
                </div>
                <h3 className="font-display font-bold text-lg">{card.title}</h3>
            </div>

            <div className="space-y-3">
                {card.fees.map((fee) => (
                    <div
                        key={fee.label}
                        className="flex items-center justify-between p-3 rounded-xl bg-background/50"
                    >
                        <span className="text-sm text-muted-foreground">{fee.label}</span>
                        <span className="font-mono font-bold text-primary">{fee.price}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const PaymentInfoRow = ({
    label,
    value,
    showCopy = true,
}: {
    label: string;
    value: string;
    showCopy?: boolean;
}) => (
    <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{value}</span>
            {showCopy && <CopyButton text={value} />}
        </div>
    </div>
);

const PaymentFee = () => {
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
                            Registration <span className="text-primary">Fee</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Choose your registration category and complete your payment to secure your spot at BMC 2026.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Registration Fees - Presenters */}
            <section className="section-padding">
                <div className="container mx-auto max-w-6xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                            <CreditCard size={28} className="text-primary-foreground" />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold">Presenter Fees</h2>
                            <p className="text-muted-foreground text-sm mt-1">For paper presenters</p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {presenterFees.map((card, i) => (
                            <FeeCardComponent key={card.title} card={card} delay={i * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration Fees - Non-Presenters */}
            <section className="section-padding bg-gradient-to-b from-transparent via-primary/5 to-transparent">
                <div className="container mx-auto max-w-6xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                            <Users size={28} className="text-primary-foreground" />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold">Non-Presenter Fees</h2>
                            <p className="text-muted-foreground text-sm mt-1">For attendees without paper presentation</p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {nonPresenterFees.map((card, i) => (
                            <FeeCardComponent key={card.title} card={card} delay={i * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Payment Information */}
            <section className="section-padding">
                <div className="container mx-auto max-w-6xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                            <Banknote size={28} className="text-primary-foreground" />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold">Payment Information</h2>
                            <p className="text-muted-foreground text-sm mt-1">Bank transfer details</p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Indonesian Payment */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass rounded-2xl overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 border-b border-border flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <User size={20} className="text-primary" />
                                </div>
                                <h3 className="font-display font-bold text-lg">Indonesian Participant</h3>
                            </div>
                            <div className="p-5">
                                <PaymentInfoRow label="Bank" value={indonesianPayment.bank} showCopy={false} />
                                <PaymentInfoRow label="Bank Code" value={indonesianPayment.bankCode} />
                                <PaymentInfoRow label="Account Number" value={indonesianPayment.accountNumber} />
                                <PaymentInfoRow label="Account Name" value={indonesianPayment.accountName} />
                                <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
                                    <p className="text-xs text-muted-foreground mb-1">Transfer News Format:</p>
                                    <p className="font-mono text-sm font-semibold text-primary">
                                        {indonesianPayment.transferNews}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* International Payment */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="glass rounded-2xl overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 border-b border-border flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <Globe size={20} className="text-primary" />
                                </div>
                                <h3 className="font-display font-bold text-lg">International Participant</h3>
                            </div>
                            <div className="p-5">
                                <PaymentInfoRow label="Bank" value={internationalPayment.bank} showCopy={false} />
                                <PaymentInfoRow label="Branch" value={internationalPayment.branch} showCopy={false} />
                                <PaymentInfoRow label="Bank Address" value={internationalPayment.bankAddress} showCopy={false} />
                                <PaymentInfoRow label="Postal Code" value={internationalPayment.postalCode} />
                                <PaymentInfoRow label="Account Number" value={internationalPayment.accountNumber} />
                                <PaymentInfoRow label="SWIFT Code" value={internationalPayment.swiftCode} />
                                <PaymentInfoRow label="Account Name (Beneficiary)" value={internationalPayment.accountName} />
                                <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
                                    <p className="text-xs text-muted-foreground mb-1">Transfer News Format:</p>
                                    <p className="font-mono text-sm font-semibold text-primary">
                                        {internationalPayment.transferNews}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <FooterSection />
        </div>
    );
};

export default PaymentFee;
