import {useEffect, useState} from "react";

import api from "../api/api";

import {AutoAwesome, Science, Shield} from "@mui/icons-material";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ComplianceEngine() {
  const [products, setProducts] = useState([]);

  const [frameworks, setFrameworks] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState("");

  const [selectedFramework, setSelectedFramework] = useState("");

  const [loading, setLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  const [report, setReport] = useState(null);

  const fetchData = async () => {
    try {
      setInitialLoading(true);

      const [productRes, frameworkRes] = await Promise.all([
        api.get("/product/get-products"),
        api.get("/framework/get-frameworks"),
      ]);

      setProducts(productRes.data?.data || []);

      setFrameworks(frameworkRes.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAnalyze = async () => {
    if (!selectedProduct || !selectedFramework) {
      return alert("Please select both Product and Framework");
    }

    try {
      setLoading(true);

      setReport(null);

      const response = await api.post("/compliance/analyze", {
        productId: selectedProduct,
        frameworkId: selectedFramework,
      });

      setReport(response.data?.data);
    } catch (err) {
      console.log(err);

      alert("Failed to generate compliance report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white p-6">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
            <AutoAwesome className="text-blue-600 dark:text-blue-300" />
          </div>

          <div>
            <h1 className="text-4xl font-bold">Compliance Engine</h1>

            <p className="text-gray-500 dark:text-slate-400 mt-1">
              AI-powered RAG compliance analysis system.
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-[380px_1fr] gap-6">
        {/* Sidebar */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm h-fit sticky top-6">
          <div className="flex items-center gap-2 mb-6">
            <Science className="text-blue-600 dark:text-blue-300" />

            <h2 className="text-xl font-semibold">Analysis Parameters</h2>
          </div>

          {/* Product Select */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
              Select Product
            </label>

            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose Product</option>

              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.productName}
                </option>
              ))}
            </select>
          </div>

          {/* Framework Select */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">
              Select Framework
            </label>

            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose Framework</option>

              {frameworks.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.name} ({f.shortCode})
                </option>
              ))}
            </select>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || !selectedProduct || !selectedFramework}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-2xl font-semibold transition"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <AutoAwesome />
                Analyze Compliance
              </>
            )}
          </button>
        </div>

        {/* Report Section */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm min-h-[600px]">
          {initialLoading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

              <p className="text-gray-500 dark:text-slate-400">
                Loading data...
              </p>
            </div>
          ) : !report?.reportMarkdown && !loading ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center mb-6">
                <Shield
                  sx={{fontSize: 50}}
                  className="text-blue-600 dark:text-blue-300"
                />
              </div>

              <h2 className="text-2xl font-bold mb-3">Ready For Analysis</h2>

              <p className="max-w-md text-gray-500 dark:text-slate-400 leading-7">
                Configure your product and regulatory framework from the left
                panel and run the AI-powered compliance engine.
              </p>
            </div>
          ) : loading ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>

              <h2 className="text-2xl font-bold mb-2">Running AI Analysis</h2>

              <p className="text-gray-500 dark:text-slate-400">
                Querying vector database and generating compliance insights...
              </p>
            </div>
          ) : (
            <div>
              {/* Report Header */}
              <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-slate-700 pb-5">
                <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                  <Shield className="text-green-600 dark:text-green-300" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold">Compliance Report</h2>

                  <p className="text-gray-500 dark:text-slate-400">
                    AI Generated Regulatory Analysis
                  </p>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-5 border border-gray-200 dark:border-slate-700">
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">
                    Compliance Score
                  </p>

                  <h3 className="text-3xl font-bold text-green-600">
                    {report?.complianceScore || 0}%
                  </h3>
                </div>

                <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-5 border border-gray-200 dark:border-slate-700">
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">
                    Recommendations
                  </p>

                  <h3 className="text-3xl font-bold text-blue-600">
                    {report?.recommendations?.length || 0}
                  </h3>
                </div>

                <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-5 border border-gray-200 dark:border-slate-700">
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">
                    Controls Analyzed
                  </p>

                  <h3 className="text-3xl font-bold text-purple-600">
                    {report?.analysis?.length || 0}
                  </h3>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="mb-8 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-300">
                  Executive Summary
                </h3>

                <p className="leading-7 text-gray-700 dark:text-slate-300">
                  {report?.summary}
                </p>
              </div>

              {/* Recommendations */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-5">Recommendations</h3>

                <div className="space-y-3">
                  {report?.recommendations?.map((rec, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4"
                    >
                      <p className="text-gray-700 dark:text-slate-300">
                        • {rec}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-5">Control Analysis</h3>

                <div className="space-y-4">
                  {report?.analysis?.map((control, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-slate-700 rounded-2xl p-5 bg-gray-50 dark:bg-slate-800"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h4 className="font-bold text-lg">
                            {control.controlId} - {control.title}
                          </h4>

                          <p className="text-gray-600 dark:text-slate-400 mt-2">
                            {control.reason}
                          </p>
                        </div>

                        <div className="text-right">
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-semibold inline-block
                            ${
                              control.status === "pass"
                                ? "bg-green-100 text-green-700"
                                : control.status === "partial"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {control.status.toUpperCase()}
                          </div>

                          <p className="mt-3 font-bold text-xl">
                            {control.score}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Markdown Report */}
              <div
                className="
                prose
                prose-lg
                dark:prose-invert
                max-w-none
                prose-headings:font-bold
                prose-p:text-gray-700
                dark:prose-p:text-slate-300
                prose-li:text-gray-700
                dark:prose-li:text-slate-300
                prose-strong:text-black
                dark:prose-strong:text-white
                prose-headings:text-blue-700
                dark:prose-headings:text-blue-300
              "
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {report?.reportMarkdown || ""}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
