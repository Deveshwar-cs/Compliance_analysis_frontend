import {useEffect, useState} from "react";
import api from "../api/api";

import {
  Building2,
  Globe,
  Phone,
  MapPin,
  Mail,
  ArrowLeft,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";

export default function OrganizationsList() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrg, setSelectedOrg] = useState(null);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);

      const res = await api.get("/organization/get-companies");

      const data = res.data.data || [];

      setOrganizations(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // =========================
  // ORGANIZATION DETAILS PAGE
  // =========================
  if (selectedOrg) {
    return (
      <div className="space-y-6">
        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedOrg(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <span
            className={`px-4 py-2 rounded-full text-xs font-semibold ${
              selectedOrg.isActive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {selectedOrg.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* HEADER CARD */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-violet-100 text-violet-700 flex items-center justify-center">
                <Building2 size={36} />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {selectedOrg.legalName}
                </h1>

                <p className="text-slate-500 mt-1 text-lg">
                  {selectedOrg.dbaName}
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <BadgeCheck size={18} className="text-emerald-600" />

                  <span className="text-sm text-slate-600">
                    Verified Organization
                  </span>
                </div>
              </div>
            </div>

            {selectedOrg.website && (
              <a
                href={selectedOrg.website}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-all"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* CONTACT */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Contact Information
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 text-slate-500">
                    <Phone size={16} />
                    <span className="text-xs uppercase tracking-wide">
                      Phone
                    </span>
                  </div>

                  <p className="text-slate-900 font-medium">
                    {selectedOrg.phoneNumber || "N/A"}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 text-slate-500">
                    <Mail size={16} />
                    <span className="text-xs uppercase tracking-wide">
                      Email
                    </span>
                  </div>

                  <p className="text-slate-900 font-medium break-all">
                    {selectedOrg.primaryContact?.email || "N/A"}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 md:col-span-2">
                  <div className="flex items-center gap-2 mb-2 text-slate-500">
                    <MapPin size={16} />
                    <span className="text-xs uppercase tracking-wide">
                      Address
                    </span>
                  </div>

                  <p className="text-slate-900 font-medium">
                    {selectedOrg.address?.street || "N/A"}
                  </p>

                  <p className="text-slate-600 mt-1">
                    {selectedOrg.address?.city}, {selectedOrg.address?.state}
                  </p>

                  <p className="text-slate-500 text-sm mt-1">
                    {selectedOrg.address?.country}
                  </p>
                </div>
              </div>
            </div>

            {/* REGULATORY */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-700">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Regulatory & Corporate Identifiers
                  </h2>

                  <p className="text-sm text-slate-500">
                    Compliance & registration information
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    label: "FDA FEI",
                    value: selectedOrg.identifiers?.fdafei,
                  },
                  {
                    label: "Labeller Code",
                    value: selectedOrg.identifiers?.labellerCode,
                  },
                  {
                    label: "DUNS Number",
                    value: selectedOrg.identifiers?.dunsNumber,
                  },
                  {
                    label: "CIN",
                    value: selectedOrg.identifiers?.cin,
                  },
                  {
                    label: "GSTIN",
                    value: selectedOrg.identifiers?.gstin,
                  },
                  {
                    label: "PAN",
                    value: selectedOrg.identifiers?.pan,
                  },
                  {
                    label: "CDSCO",
                    value: selectedOrg.identifiers?.cdsco,
                  },
                  {
                    label: "Others",
                    value: selectedOrg.identifiers?.others,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50"
                  >
                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                      {item.label}
                    </p>

                    <p className="text-sm font-semibold text-slate-900 break-all">
                      {item.value || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* COMPANY SUMMARY */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-5">
                Company Summary
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                    UUID
                  </p>

                  <p className="text-sm text-slate-800 break-all">
                    {selectedOrg.uuid}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                    Created At
                  </p>

                  <p className="text-sm text-slate-800">
                    {new Date(selectedOrg.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                    Updated At
                  </p>

                  <p className="text-sm text-slate-800">
                    {new Date(selectedOrg.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                    Website
                  </p>

                  {selectedOrg.website ? (
                    <a
                      href={selectedOrg.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-violet-600 hover:underline text-sm break-all"
                    >
                      {selectedOrg.website}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-400">N/A</p>
                  )}
                </div>
              </div>
            </div>

            {/* PRIMARY CONTACT */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-5">
                Primary Contact
              </h2>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-lg">
                  {selectedOrg.primaryContact?.name?.charAt(0)?.toUpperCase() ||
                    "U"}
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {selectedOrg.primaryContact?.name || "Unknown"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {selectedOrg.primaryContact?.email || "No email"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // ORGANIZATION TABLE
  // =========================
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            All Organizations
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Total: {organizations.length}
          </p>
        </div>

        <button
          onClick={fetchOrganizations}
          className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-sm transition-all"
        >
          Refresh
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                Organization
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                Contact
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                Address
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                Website
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-16 text-slate-400">
                  Loading organizations...
                </td>
              </tr>
            ) : organizations.length > 0 ? (
              organizations.map((org) => (
                <tr
                  key={org._id}
                  onClick={() => setSelectedOrg(org)}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {/* ORGANIZATION */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-semibold">
                        {(org.dbaName || org.legalName)
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-slate-900">
                          {org.dbaName || "N/A"}
                        </p>

                        <p className="text-sm text-slate-500">
                          {org.legalName || "N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* CONTACT */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {org.primaryContact?.name || "N/A"}
                      </p>

                      <p className="text-xs text-slate-500">
                        {org.primaryContact?.email || "N/A"}
                      </p>
                    </div>
                  </td>

                  {/* ADDRESS */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-700">
                      <p>{org.address?.street || "N/A"}</p>

                      <p className="text-slate-500">
                        {org.address?.city}, {org.address?.state}
                      </p>
                    </div>
                  </td>

                  {/* WEBSITE */}
                  <td className="px-6 py-4">
                    {org.website ? (
                      <div className="flex items-center gap-2 text-violet-600 text-sm">
                        <Globe size={16} />
                        Website
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">—</span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        org.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {org.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-16 text-slate-400">
                  No organizations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
