// Maps icon_name strings from the API to Lucide React components
import {
    Send,
    FileText,
    CalendarCheck,
    Presentation,
    Mail,
    Phone,
    Globe,
    Instagram,
    Users,
    Award,
    Stethoscope,
    GraduationCap,
    MapPin,
    Twitter,
    Youtube,
    Facebook,
    type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    // Timeline
    Send,
    FileText,
    CalendarCheck,
    Presentation,
    // Contacts
    Mail,
    Phone,
    Globe,
    Instagram,
    MapPin,
    Twitter,
    Youtube,
    Facebook,
    // Stats
    Users,
    Award,
    // Fee
    Stethoscope,
    GraduationCap,
};

/**
 * Resolves an icon_name string to a Lucide component.
 * Falls back to Globe if the name is not recognised.
 */
export function getIcon(name: string): LucideIcon {
    return iconMap[name] ?? Globe;
}

export default iconMap;
