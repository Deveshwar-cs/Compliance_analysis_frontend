import {
  Pill,
  Stethoscope,
  Cpu,
  Star,
  Microscope,
  HelpCircle,
  FileEdit,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const MONO = {
  fontFamily: "'JetBrains Mono', monospace",
};

export const SANS = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

export const PRODUCT_TYPE_META = {
  drug: {
    label: "Drug",
    icon: Pill,
    bg: "#fce7f3",
    fg: "#9d174d",
  },
  medical_device: {
    label: "Medical Device",
    icon: Stethoscope,
    bg: "#e0f2fe",
    fg: "#0369a1",
  },
  software: {
    label: "Software",
    icon: Cpu,
    bg: "#ede9fe",
    fg: "#6d28d9",
  },
  ai_system: {
    label: "AI System",
    icon: Star,
    bg: "#f0fdf4",
    fg: "#15803d",
  },
  diagonistic: {
    label: "Diagnostic",
    icon: Microscope,
    bg: "#fef9c3",
    fg: "#a16207",
  },
  other: {
    label: "Other",
    icon: HelpCircle,
    bg: "#f1f5f9",
    fg: "#475569",
  },
};

export const COMPLIANCE_META = {
  draft: {
    label: "Draft",
    icon: FileEdit,
    bg: "#f1f5f9",
    fg: "#475569",
  },
  under_review: {
    label: "Under Review",
    icon: Clock,
    bg: "#fef3c7",
    fg: "#b45309",
  },
  compliant: {
    label: "Compliant",
    icon: CheckCircle2,
    bg: "#dcfce7",
    fg: "#15803d",
  },
  non_compliant: {
    label: "Non-Compliant",
    icon: AlertCircle,
    bg: "#fee2e2",
    fg: "#b91c1c",
  },
};

export const RISK_META = {
  low: {label: "Low", color: "#15803d", bg: "#dcfce7"},
  medium: {label: "Medium", color: "#b45309", bg: "#fef3c7"},
  high: {label: "High", color: "#b91c1c", bg: "#fee2e2"},
  critical: {label: "Critical", color: "#7c2d12", bg: "#ffedd5"},
};

export const getTypeMeta = (type) =>
  PRODUCT_TYPE_META[type] || PRODUCT_TYPE_META.other;
export const getComplianceMeta = (status) =>
  COMPLIANCE_META[status] || COMPLIANCE_META.draft;
export const getRiskMeta = (risk) => RISK_META[risk] || null;
