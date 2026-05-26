import {useEffect, useMemo, useState} from "react";
import api from "../api/api";

import {
  Rule,
  Search,
  ChevronRight,
  Info,
  ArrowBack,
  Shield,
  Language,
} from "@mui/icons-material";

export default function RuleAndPolicies() {
  const [view, setView] = useState("list");

  const [selectedFramework, setSelectedFramework] = useState(null);

  const [frameworks, setFrameworks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchFrameworks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/framework/get-frameworks");

      setFrameworks(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFrameworks();
  }, []);

  const filteredFrameworks = useMemo(() => {
    return frameworks.filter((f) => {
      const q = search.toLowerCase();

      return (
        f.name?.toLowerCase().includes(q) ||
        f.shortCode?.toLowerCase().includes(q) ||
        f.authority?.toLowerCase().includes(q)
      );
    });
  }, [frameworks, search]);

  // =========================
  // DETAIL VIEW
  // =========================

  if (view === "detail") {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#111827] text-gray-900 dark:text-white px-4 md:px-6 py-6">
        {/* Back Button */}
        <button
          onClick={() => setView("list")}
          className="
            flex items-center gap-2
            text-sm font-medium
            mb-8
            px-5 py-3
            rounded-2xl
            bg-white/70
            dark:bg-slate-900/60
            backdrop-blur-xl
            border border-white/20 dark:border-slate-700/50
            shadow-lg
            hover:shadow-xl
            hover:-translate-y-0.5
            transition-all
          "
        >
          <ArrowBack fontSize="small" />
          Back
        </button>

        {/* Main Detail Card */}
        <div
          className="
            bg-white/70
            dark:bg-slate-900/60
            backdrop-blur-xl
            rounded-4xl
            shadow-2xl
            p-6 md:p-10
            border
            border-white/20
            dark:border-slate-700/50
          "
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-10">
            <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl text-white">
              <Shield sx={{fontSize: 42}} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                  v{selectedFramework.version}
                </span>

                <span className="px-4 py-1.5 rounded-full text-sm bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
                  {selectedFramework.industry}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-3">
                {selectedFramework.name}
              </h1>

              <p className="text-xl text-blue-600 dark:text-blue-300 font-semibold mb-3">
                {selectedFramework.shortCode}
              </p>

              <p className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
                <Language sx={{fontSize: 18}} />
                {selectedFramework.authority} • {selectedFramework.country}
              </p>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Framework Overview</h2>

            <p className="text-gray-600 dark:text-slate-300 leading-8 text-lg">
              {selectedFramework.description}
            </p>
          </div>

          {/* Controls Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold">Regulatory Controls</h2>

            <span className="px-5 py-2 rounded-2xl bg-white dark:bg-slate-800 shadow text-sm font-medium">
              {selectedFramework.controls?.length || 0} Controls
            </span>
          </div>

          {/* Controls Grid */}
          <div className="grid gap-6">
            {selectedFramework.controls?.map((control, idx) => (
              <div
                key={idx}
                className="
                  rounded-3xl
                  border
                  border-white/20
                  dark:border-slate-700/50
                  bg-white/70
                  dark:bg-slate-900/60
                  backdrop-blur-xl
                  p-6
                  shadow-md
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                {/* Top */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                  <span className="font-semibold text-blue-600 dark:text-blue-300">
                    {control.controlId}
                  </span>

                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium w-fit
                    ${
                      control.riskLevel === "high"
                        ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                        : control.riskLevel === "medium"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                          : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                    }`}
                  >
                    {control.riskLevel} risk
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3">{control.title}</h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-slate-300 leading-7 mb-6">
                  {control.description}
                </p>

                {/* Requirement */}
                <div className="rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-5 mb-5">
                  <h4 className="font-semibold mb-3">Compliance Requirement</h4>

                  <p className="text-gray-600 dark:text-slate-300 leading-7">
                    {control.requirementText}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {control.mandatory && (
                    <span className="px-4 py-1.5 rounded-full text-sm bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300">
                      Mandatory
                    </span>
                  )}

                  {control.tags?.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-4 py-1.5 rounded-full text-sm bg-gray-200 dark:bg-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // LIST VIEW
  // =========================

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#111827] text-gray-900 dark:text-white px-4 md:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <h1 className="text-5xl font-bold mb-3">
            Regulatory Rules & Policies
          </h1>

          <p className="text-lg text-gray-500 dark:text-slate-400">
            Explore international compliance frameworks and standards.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-10">
        <div className="relative max-w-2xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search frameworks, authority, or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pl-14
              pr-5
              py-4
              rounded-3xl
              border
              border-white/20
              bg-white/70
              dark:bg-slate-900/60
              backdrop-blur-xl
              shadow-lg
              dark:border-slate-700/50
              outline-none
              text-base
              focus:ring-4
              focus:ring-blue-500/20
              transition
            "
          />
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-72">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-5"></div>

          <p className="text-lg font-medium text-gray-500 dark:text-slate-400">
            Loading frameworks...
          </p>
        </div>
      ) : filteredFrameworks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-72 text-center">
          <Info sx={{fontSize: 70, opacity: 0.3}} />

          <h3 className="text-3xl font-bold mt-5">No Frameworks Found</h3>

          <p className="text-gray-500 dark:text-slate-400 mt-3">
            Try another keyword.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
          {filteredFrameworks.map((framework) => (
            <div
              key={framework._id}
              onClick={() => {
                setSelectedFramework(framework);
                setView("detail");
              }}
              className="
                group
                relative
                overflow-hidden
                cursor-pointer
                rounded-[28px]
                border
                border-white/20
                dark:border-slate-700/50
                bg-white/70
                dark:bg-slate-900/60
                backdrop-blur-xl
                p-6
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-blue-500/10 to-purple-500/10"></div>

              {/* Header */}
              <div className="relative flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg">
                  <Rule />
                </div>

                <span className="px-4 py-1.5 text-sm rounded-full bg-slate-100 dark:bg-slate-800 font-medium">
                  v{framework.version}
                </span>
              </div>

              {/* Content */}
              <div className="relative mb-8">
                <h2 className="text-2xl font-bold mb-3 leading-tight">
                  {framework.name}
                </h2>

                <p className="text-blue-600 dark:text-blue-300 font-semibold text-lg">
                  {framework.shortCode}
                </p>

                <p className="text-sm text-gray-500 dark:text-slate-400 mt-3 line-clamp-2">
                  {framework.authority}
                </p>
              </div>

              {/* Footer */}
              <div className="relative flex items-center justify-between pt-5 border-t border-gray-200/70 dark:border-slate-700/70">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                  <span>{framework.controls?.length || 0} Controls</span>

                  <span>•</span>

                  <span>{framework.country}</span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center group-hover:translate-x-1 transition">
                  <ChevronRight className="text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
