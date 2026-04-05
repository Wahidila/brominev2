import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Copy, Check, Building2, CreditCard, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const subTopics = [
    "Biomolecular", "Tuberculosis", "Infectious Diseases", "Degenerative Diseases",
    "Internal Medicine", "Pediatrics", "Surgery", "Obstetrics & Gynecology",
    "Neuroscience", "Ophthalmology", "Skin & Venereology", "Cardiovascular Disease",
    "Radiology", "Clinical Pathology", "Anatomical Pathology", "Psychiatry",
    "Orthopedics & Traumatology", "Urology", "Clinical Microbiology", "Emergency Medicine",
    "Family Medicine", "Anesthesiology & Intensive Care", "Pulmonology & Respiratory Medicine",
    "Otorhinolaryngology, Head & Neck Surgery", "Plastic, Reconstructive & Aesthetic Surgery",
    "Physical Medicine & Rehabilitation",
];

const participantTypes = [
    "Presenter",
    "Non-Presenter",
];

const presenceOptions = ["Offline", "Online"];

const nationalities = [
    "Indonesian",
    "Non-Indonesian",
];

const infoSources = [
    "Social Media (Instagram, Twitter, etc.)",
    "Website",
    "Email",
    "Friend / Colleague",
    "University / Institution",
    "Previous BMC Event",
    "Other",
];

const domesticPayment = {
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
    const copy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={copy} className="ml-2 text-primary hover:text-primary/80 transition-colors" title="Copy">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
    );
};

const Register = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    const [paymentFile, setPaymentFile] = useState<File | null>(null);
    const [abstractFile, setAbstractFile] = useState<File | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Add files
        if (paymentFile) formData.append('payment_proof', paymentFile);
        if (abstractFile) formData.append('abstract_file', abstractFile);

        try {
            const apiBase = import.meta.env.VITE_API_URL || '/api';
            const res = await fetch(`${apiBase}/register.php`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setSubmitStatus('success');
                setSubmitMessage(data.message || 'Registration submitted successfully!');
                form.reset();
                setPaymentFile(null);
                setAbstractFile(null);
            } else {
                setSubmitStatus('error');
                setSubmitMessage(data.error || 'Submission failed. Please try again.');
            }
        } catch {
            setSubmitStatus('error');
            setSubmitMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        "w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm";
    const selectClass =
        "w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm appearance-none";
    const labelClass = "block text-sm font-medium text-foreground mb-1.5";

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            {/* Header */}
            <div className="relative overflow-hidden bg-card border-b border-border">
                <div className="absolute inset-0 opacity-10" style={{ background: "var(--gradient-primary)" }} />
                <div className="container mx-auto max-w-7xl px-4 py-16 md:py-20 relative">
                    <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline text-sm mb-6">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-primary font-display font-semibold tracking-[0.2em] uppercase text-sm mb-3">
                            BMC 2026
                        </p>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                            Register <span className="text-primary">Now</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Complete the submission form below to register for BMC 2026 International Conference.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16" ref={ref}>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form - 2 columns */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="glass rounded-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Upload className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-display text-xl font-bold">Submission Form</h2>
                                    <p className="text-muted-foreground text-sm">Submission Detail</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name Row */}
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelClass}>First Name <span className="text-red-400">*</span></label>
                                        <input type="text" name="first_name" placeholder="First Name" required className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Last Name</label>
                                        <input type="text" name="last_name" placeholder="Last Name" className={inputClass} />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className={labelClass}>Email <span className="text-red-400">*</span></label>
                                    <input type="email" name="email" placeholder="Your Email" required className={inputClass} />
                                </div>

                                {/* WhatsApp */}
                                <div>
                                    <label className={labelClass}>Whatsapp Number <span className="text-red-400">*</span></label>
                                    <input type="tel" name="whatsapp" placeholder="62XXXXXXXXXXXXX" required className={inputClass} />
                                    <p className="text-xs text-muted-foreground mt-1">Indicate Your Country</p>
                                </div>

                                {/* Institution */}
                                <div>
                                    <label className={labelClass}>Institution <span className="text-red-400">*</span></label>
                                    <input type="text" name="institution" placeholder="Institution" required className={inputClass} />
                                </div>

                                {/* Participant Type */}
                                <div>
                                    <label className={labelClass}>Participant Type <span className="text-red-400">*</span></label>
                                    <select name="participant_type" required className={selectClass} defaultValue="">
                                        <option value="" disabled>Please Select Option</option>
                                        {participantTypes.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Nationality */}
                                <div>
                                    <label className={labelClass}>Participant Nationality <span className="text-red-400">*</span></label>
                                    <select name="nationality" required className={selectClass} defaultValue="">
                                        <option value="" disabled>Please Select Nationality</option>
                                        {nationalities.map((n) => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Country */}
                                <div>
                                    <label className={labelClass}>Country <span className="text-red-400">*</span></label>
                                    <input type="text" name="country" placeholder="Country" required className={inputClass} />
                                </div>

                                {/* Sub-Topic */}
                                <div>
                                    <label className={labelClass}>Sub-Topic <span className="text-red-400">*</span></label>
                                    <select name="sub_topic" required className={selectClass} defaultValue="">
                                        <option value="" disabled>Please Select Option</option>
                                        {subTopics.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Presence */}
                                <div>
                                    <label className={labelClass}>Presence <span className="text-red-400">*</span></label>
                                    <select name="presence" required className={selectClass} defaultValue="">
                                        <option value="" disabled>Please Select Option</option>
                                        {presenceOptions.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Payment Proof Upload */}
                                <div>
                                    <label className={labelClass}>Payment Proof <span className="text-red-400">*</span></label>
                                    <p className="text-xs text-muted-foreground mb-2">JPG, JPEG, PNG, PDF</p>
                                    <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors bg-background">
                                        <Upload className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {paymentFile ? paymentFile.name : "No file chosen"}
                                        </span>
                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            required
                                            className="hidden"
                                            onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
                                        />
                                    </label>
                                </div>

                                {/* Abstract Upload */}
                                <div>
                                    <label className={labelClass}>Abstract <span className="text-red-400">*</span></label>
                                    <p className="text-xs text-muted-foreground mb-2">PDF, DOC, DOCX — For non-Presenter participants, upload your transfer proof in this slot</p>
                                    <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors bg-background">
                                        <Upload className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {abstractFile ? abstractFile.name : "No file chosen"}
                                        </span>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            required
                                            className="hidden"
                                            onChange={(e) => setAbstractFile(e.target.files?.[0] || null)}
                                        />
                                    </label>
                                </div>

                                {/* Info Source */}
                                <div>
                                    <label className={labelClass}>How do you get information about this event? <span className="text-red-400">*</span></label>
                                    <select name="info_source" required className={selectClass} defaultValue="">
                                        <option value="" disabled>Please Select Option</option>
                                        {infoSources.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status Message */}
                                {submitStatus === 'success' && (
                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                                        ✅ {submitMessage}
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                        ❌ {submitMessage}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Payment Sidebar - 1 column */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="glass rounded-2xl p-6 sticky top-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-display text-lg font-bold">Payment</h3>
                            </div>

                            {/* Indonesia */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Building2 className="w-4 h-4 text-primary" />
                                    <h4 className="font-semibold text-sm">Indonesia Participant</h4>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Bank</span>
                                        <span className="font-medium">{domesticPayment.bank}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Bank Code</span>
                                        <span className="font-medium flex items-center">
                                            {domesticPayment.bankCode}
                                            <CopyButton text={domesticPayment.bankCode} />
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Account Number</span>
                                        <span className="font-medium flex items-center">
                                            {domesticPayment.accountNumber}
                                            <CopyButton text={domesticPayment.accountNumber} />
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Account Name</span>
                                        <span className="font-medium">{domesticPayment.accountName}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Transfer News</span>
                                        <span className="font-medium text-primary text-xs">{domesticPayment.transferNews}</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-border my-5" />

                            {/* International */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Globe className="w-4 h-4 text-primary" />
                                    <h4 className="font-semibold text-sm">International Participant</h4>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Bank</span>
                                        <span className="font-medium">{internationalPayment.bank}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Branch</span>
                                        <span className="font-medium">{internationalPayment.branch}</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-muted-foreground">Bank Address</span>
                                        <span className="font-medium text-right text-xs max-w-[140px]">{internationalPayment.bankAddress}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Postal Code</span>
                                        <span className="font-medium">{internationalPayment.postalCode}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Account Number</span>
                                        <span className="font-medium flex items-center">
                                            {internationalPayment.accountNumber}
                                            <CopyButton text={internationalPayment.accountNumber} />
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Swift Code</span>
                                        <span className="font-medium flex items-center">
                                            {internationalPayment.swiftCode}
                                            <CopyButton text={internationalPayment.swiftCode} />
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Account Name</span>
                                        <span className="font-medium">{internationalPayment.accountName}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Transfer News</span>
                                        <span className="font-medium text-primary text-xs">{internationalPayment.transferNews}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <FooterSection />
        </div>
    );
};

export default Register;
