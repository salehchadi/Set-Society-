import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LogOut,
  RefreshCw,
  Save,
  Eye,
  EyeOff,
  Lock,
  Package,
  AlertCircle,
  CheckCircle,
  Download,
  Copy,
  Settings,
  ExternalLink,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { PRODUCTS } from "../assets/constants";

// Google Sheets published CSV URL (read-only)
const DEFAULT_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTIbX6lpqS0JdTJe2_BCjP89vtZG-TW0kOBBlUPOniPHUp7scB99AbO0FFrrOj5iSqYiPQu7q7Vsnv-/pub?output=csv";

const STORAGE_KEYS = {
  APPS_SCRIPT_URL: "setsociety_apps_script_url",
  SHEET_EDIT_URL: "setsociety_sheet_edit_url",
};

interface StockRow {
  productId: string;
  productName: string;
  size: string;
  stockCount: number;
  price: number;
  realPrice: number | null;
}

interface Toast {
  type: "success" | "error" | "info";
  message: string;
}

// ─── Login Screen ───────────────────────────────────────────────────
function LoginScreen() {
  const { login } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const success = login(username.trim(), password);
      if (!success) {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo / Branding */}
        <div className="text-center mb-10">
          <h1 className="font-logo text-4xl text-primary mb-2">Set Society</h1>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-on-surface-variant font-semibold">
            Inventory & Store Management
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container p-8 md:p-10 shadow-sm border border-primary/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
              <Lock size={18} className="text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-primary">Admin Sign In</h2>
              <p className="text-[0.6rem] text-on-surface-variant uppercase tracking-widest">
                Authorized Personnel Only
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[0.65rem] uppercase tracking-widest text-primary/70 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-surface border border-primary/20 p-3 text-sm focus:outline-none focus:border-primary transition-colors text-primary"
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[0.65rem] uppercase tracking-widest text-primary/70 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface border border-primary/20 p-3 text-sm focus:outline-none focus:border-primary transition-colors text-primary pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs"
              >
                <AlertCircle size={14} />
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary text-white py-4 text-xs uppercase tracking-[0.2em] font-medium transition-opacity ${
                isLoading ? "opacity-60 cursor-wait" : "hover:bg-primary/90"
              }`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Admin Dashboard ────────────────────────────────────────────────
function Dashboard() {
  const { logout } = useAdmin();
  const [stockData, setStockData] = useState<StockRow[]>([]);
  const [editedData, setEditedData] = useState<StockRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOutOfStockOnly, setFilterOutOfStockOnly] = useState(false);

  // Editable configuration URLs stored in localStorage
  const [appsScriptUrl, setAppsScriptUrl] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.APPS_SCRIPT_URL) || "";
  });
  const [sheetEditUrl, setSheetEditUrl] = useState<string>(() => {
    return (
      localStorage.getItem(STORAGE_KEYS.SHEET_EDIT_URL) ||
      "https://docs.google.com/spreadsheets"
    );
  });

  const showToast = useCallback((type: Toast["type"], message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const getProductName = (productId: string): string => {
    const product = PRODUCTS.find((p) => p.id === productId);
    return product ? `${product.name} (${product.color})` : `Product #${productId}`;
  };

  const fetchStock = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(DEFAULT_CSV_URL);
      if (!response.ok) throw new Error("Failed to fetch inventory data from Google Sheets");

      const csvText = await response.text();
      const lines = csvText.split("\n");
      const rows: StockRow[] = [];

      if (lines.length > 0) {
        const headerCols = lines[0]
          .split(",")
          .map((h) => h.trim().toLowerCase().replace(/[\r\n"']/g, ""));

        const pIdx = headerCols.findIndex((h) => h.includes("product") || h === "id");
        const sIdx = headerCols.findIndex((h) => h === "size");
        const stIdx = headerCols.findIndex((h) => h.includes("stock"));
        const prIdx = headerCols.findIndex((h) => h === "price");
        const rPrIdx = headerCols.findIndex(
          (h) => h.includes("real") || h.includes("original") || h.includes("old")
        );

        const productIdCol = pIdx >= 0 ? pIdx : 0;
        const sizeCol = sIdx >= 0 ? sIdx : 1;
        const stockCol = stIdx >= 0 ? stIdx : 2;
        const priceCol = prIdx >= 0 ? prIdx : 3;
        const realPriceCol = rPrIdx >= 0 ? rPrIdx : 4;

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const cols = line.split(",").map((c) => c.trim().replace(/[\r\n"']/g, ""));
          const productId = cols[productIdCol];
          const size = cols[sizeCol];
          const stockCount = parseInt(cols[stockCol], 10);
          const price = parseFloat(cols[priceCol]) || 0;
          const realPriceStr = cols[realPriceCol];
          const realPrice = realPriceStr ? parseFloat(realPriceStr) : null;

          if (productId && size) {
            rows.push({
              productId,
              productName: getProductName(productId),
              size,
              stockCount: isNaN(stockCount) ? 0 : stockCount,
              price,
              realPrice: realPrice && !isNaN(realPrice) && realPrice > 0 ? realPrice : null,
            });
          }
        }
      }

      setStockData(rows);
      setEditedData(JSON.parse(JSON.stringify(rows)));
      setHasChanges(false);
    } catch (err) {
      console.error("Error fetching stock:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  const handleFieldChange = (
    index: number,
    field: "stockCount" | "price" | "realPrice",
    value: string
  ) => {
    setEditedData((prev) => {
      const next = [...prev];
      if (field === "realPrice") {
        next[index] = { ...next[index], [field]: value === "" ? null : parseFloat(value) || 0 };
      } else {
        next[index] = { ...next[index], [field]: parseFloat(value) || 0 };
      }
      return next;
    });
    setHasChanges(true);
  };

  const generateCsvContent = (): string => {
    const csvRows = editedData.map(
      (row) =>
        `${row.productId},${row.size},${row.stockCount},${row.price},${row.realPrice ?? ""}`
    );
    return "ProductID,Size,StockCount,price,real price\n" + csvRows.join("\n");
  };

  const handleDownloadCsv = () => {
    const csvContent = generateCsvContent();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `set-society-inventory-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("success", "Inventory CSV downloaded successfully!");
  };

  const handleCopyCsv = () => {
    const csvContent = generateCsvContent();
    navigator.clipboard.writeText(csvContent);
    showToast("success", "Inventory CSV copied to clipboard!");
  };

  const handleSave = async () => {
    const cleanUrl = appsScriptUrl.trim();

    if (!cleanUrl || cleanUrl.includes("YourDeploymentId")) {
      setShowSettingsModal(true);
      showToast("info", "Please enter your Google Apps Script URL first to save directly to the sheet.");
      return;
    }

    setIsSaving(true);
    try {
      const csvContent = generateCsvContent();

      await fetch(cleanUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "updateAll", csv: csvContent }),
      });

      showToast("success", "Changes sent to Google Sheet! The sheet updates within seconds.");
      setStockData(JSON.parse(JSON.stringify(editedData)));
      setHasChanges(false);
    } catch (err) {
      console.error("Save error:", err);
      showToast("error", "Failed to save. You can download the CSV instead.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    setEditedData(JSON.parse(JSON.stringify(stockData)));
    setHasChanges(false);
    showToast("info", "Changes discarded");
  };

  const saveSettings = (newScriptUrl: string, newSheetUrl: string) => {
    setAppsScriptUrl(newScriptUrl.trim());
    setSheetEditUrl(newSheetUrl.trim());
    localStorage.setItem(STORAGE_KEYS.APPS_SCRIPT_URL, newScriptUrl.trim());
    localStorage.setItem(STORAGE_KEYS.SHEET_EDIT_URL, newSheetUrl.trim());
    setShowSettingsModal(false);
    showToast("success", "Settings saved successfully!");
  };

  // Filter and group data
  const filteredData = useMemo(() => {
    return editedData.filter((row) => {
      const matchesSearch =
        searchQuery === "" ||
        row.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.productId.includes(searchQuery) ||
        row.size.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStockFilter = !filterOutOfStockOnly || row.stockCount === 0;

      return matchesSearch && matchesStockFilter;
    });
  }, [editedData, searchQuery, filterOutOfStockOnly]);

  const groupedByProduct = useMemo(() => {
    return filteredData.reduce<Record<string, StockRow[]>>((acc, row) => {
      if (!acc[row.productId]) acc[row.productId] = [];
      acc[row.productId].push(row);
      return acc;
    }, {});
  }, [filteredData]);

  const totalStock = editedData.reduce((sum, row) => sum + row.stockCount, 0);
  const outOfStockCount = editedData.filter((row) => row.stockCount === 0).length;

  return (
    <div className="min-h-screen bg-surface">
      {/* Top Bar */}
      <header className="bg-surface-container border-b border-primary/10 px-6 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-logo text-2xl text-primary">Set Society</h1>
            <span className="text-[0.55rem] uppercase tracking-[0.2em] text-on-surface-variant bg-primary/5 px-3 py-1 font-semibold border border-primary/10">
              Admin Inventory
            </span>
          </div>
          <div className="flex items-center gap-4">
            {hasChanges && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[0.6rem] uppercase tracking-widest text-amber-600 font-semibold flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Unsaved Changes
              </motion.span>
            )}

            <button
              onClick={() => setShowSettingsModal(true)}
              className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors font-medium"
              title="Google Sheets & Apps Script Settings"
            >
              <Settings size={14} />
              <span className="hidden sm:inline">Settings</span>
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors font-medium"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface-container p-6 border border-primary/10">
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-on-surface-variant font-semibold mb-2">
              Catalog Products
            </p>
            <p className="font-serif text-3xl text-primary">{PRODUCTS.length}</p>
          </div>
          <div className="bg-surface-container p-6 border border-primary/10">
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-on-surface-variant font-semibold mb-2">
              Total Units Available
            </p>
            <p className="font-serif text-3xl text-primary">{totalStock}</p>
          </div>
          <div className="bg-surface-container p-6 border border-primary/10">
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-on-surface-variant font-semibold mb-2">
              Out of Stock Sizes
            </p>
            <p className={`font-serif text-3xl ${outOfStockCount > 0 ? "text-red-600" : "text-primary"}`}>
              {outOfStockCount}
            </p>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-surface-container p-4 border border-primary/10 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative min-w-[240px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
              <input
                type="text"
                placeholder="Search products, sizes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-primary/15 pl-9 pr-3 py-2 text-xs text-primary focus:outline-none focus:border-primary"
              />
            </div>

            {/* Out of Stock filter toggle */}
            <button
              onClick={() => setFilterOutOfStockOnly(!filterOutOfStockOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 text-[0.6rem] uppercase tracking-widest font-medium border transition-colors ${
                filterOutOfStockOnly
                  ? "bg-red-500/10 border-red-500 text-red-600"
                  : "border-primary/15 text-on-surface-variant hover:text-primary bg-surface"
              }`}
            >
              <Filter size={12} />
              {filterOutOfStockOnly ? "Showing Out of Stock" : "All Stock"}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Export/Download options */}
            <button
              onClick={handleCopyCsv}
              className="flex items-center gap-1.5 px-3 py-2 border border-primary/15 bg-surface text-[0.6rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors font-medium"
              title="Copy formatted CSV to clipboard"
            >
              <Copy size={12} />
              Copy CSV
            </button>

            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-1.5 px-3 py-2 border border-primary/15 bg-surface text-[0.6rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors font-medium"
              title="Download inventory CSV for manual Google Sheets upload"
            >
              <Download size={12} />
              Export CSV
            </button>

            <button
              onClick={fetchStock}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-2 border border-primary/15 bg-surface text-[0.6rem] uppercase tracking-widest text-primary hover:bg-primary/5 transition-colors font-medium"
            >
              <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>

            {/* Save / Discard Actions */}
            {hasChanges && (
              <>
                <button
                  onClick={handleDiscard}
                  className="flex items-center gap-1.5 px-3 py-2 border border-primary/20 bg-surface text-[0.6rem] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors font-medium"
                >
                  Discard
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`flex items-center gap-2 px-5 py-2 bg-primary text-white text-[0.65rem] uppercase tracking-widest font-medium transition-opacity ${
                    isSaving ? "opacity-60 cursor-wait" : "hover:bg-primary/90"
                  }`}
                >
                  <Save size={13} />
                  {isSaving ? "Saving..." : "Save to Sheet"}
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-20 bg-surface-container border border-primary/10">
            <RefreshCw size={28} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-sm text-primary font-medium">Fetching real-time inventory from Google Sheets...</p>
            <p className="text-xs text-on-surface-variant mt-1">Reading current stock counts and prices</p>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="p-6 bg-red-50 border border-red-200 text-red-700 text-sm mb-6 flex items-start gap-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Failed to load inventory from Google Sheets</p>
              <p className="text-xs mt-1">{error}</p>
              <button
                onClick={fetchStock}
                className="mt-3 text-xs underline font-medium hover:text-red-900"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Stock Tables grouped by product */}
        {!isLoading && !error && (
          <div className="space-y-6">
            {Object.keys(groupedByProduct).length === 0 ? (
              <div className="text-center py-16 bg-surface-container border border-primary/10">
                <Package size={32} className="text-primary/30 mx-auto mb-3" />
                <p className="text-sm font-medium text-primary">No products match your search or filter</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterOutOfStockOnly(false);
                  }}
                  className="mt-3 text-xs text-primary underline font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              (Object.entries(groupedByProduct) as [string, StockRow[]][]).map(([productId, rows]) => (
                <div
                  key={productId}
                  className="bg-surface-container border border-primary/10 overflow-hidden shadow-2xs"
                >
                  {/* Product Header */}
                  <div className="px-6 py-4 border-b border-primary/10 bg-surface-container-high/40 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-14 bg-surface-container-low overflow-hidden shrink-0 border border-primary/10">
                        {(() => {
                          const product = PRODUCTS.find((p) => p.id === productId);
                          return product ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : null;
                        })()}
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-primary">{rows[0].productName}</h3>
                        <p className="text-[0.6rem] uppercase tracking-widest text-on-surface-variant">
                          Product #{productId} · {rows.reduce((s, r) => s + r.stockCount, 0)} total in stock
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          // Quick helper: Set all sizes of this product out of stock
                          rows.forEach((row) => {
                            const globalIndex = editedData.findIndex(
                              (r) => r.productId === row.productId && r.size === row.size
                            );
                            if (globalIndex !== -1) {
                              handleFieldChange(globalIndex, "stockCount", "0");
                            }
                          });
                        }}
                        className="text-[0.55rem] uppercase tracking-wider text-red-600/80 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 border border-red-200 transition-colors"
                      >
                        Set 0 Stock
                      </button>
                    </div>
                  </div>

                  {/* Size Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-primary/10 bg-surface/50 text-[0.6rem] uppercase tracking-widest text-on-surface-variant font-semibold">
                          <th className="text-left py-3 px-6">Size</th>
                          <th className="text-left py-3 px-6">Stock Count</th>
                          <th className="text-left py-3 px-6">Current Price (EGP)</th>
                          <th className="text-left py-3 px-6">Original / Old Price (EGP)</th>
                          <th className="text-left py-3 px-6">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row) => {
                          const globalIndex = editedData.findIndex(
                            (r) => r.productId === row.productId && r.size === row.size
                          );
                          const isOutOfStock = row.stockCount === 0;

                          return (
                            <tr
                              key={`${row.productId}-${row.size}`}
                              className={`border-b border-primary/5 transition-colors ${
                                isOutOfStock ? "bg-red-50/40" : "hover:bg-surface/50"
                              }`}
                            >
                              <td className="py-3 px-6">
                                <span className="inline-flex items-center justify-center w-9 h-9 border border-primary/20 text-xs font-semibold text-primary uppercase bg-surface">
                                  {row.size}
                                </span>
                              </td>
                              <td className="py-3 px-6">
                                <input
                                  type="number"
                                  min="0"
                                  value={row.stockCount}
                                  onChange={(e) =>
                                    handleFieldChange(globalIndex, "stockCount", e.target.value)
                                  }
                                  className={`w-24 bg-surface border p-2 text-sm font-medium focus:outline-none focus:border-primary transition-colors text-center ${
                                    isOutOfStock
                                      ? "border-red-300 text-red-600 font-bold"
                                      : "border-primary/20 text-primary"
                                  }`}
                                />
                              </td>
                              <td className="py-3 px-6">
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    min="0"
                                    step="10"
                                    value={row.price}
                                    onChange={(e) =>
                                      handleFieldChange(globalIndex, "price", e.target.value)
                                    }
                                    className="w-28 bg-surface border border-primary/20 p-2 text-sm focus:outline-none focus:border-primary transition-colors text-primary"
                                  />
                                  <span className="text-xs text-on-surface-variant">EGP</span>
                                </div>
                              </td>
                              <td className="py-3 px-6">
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    min="0"
                                    step="10"
                                    value={row.realPrice ?? ""}
                                    onChange={(e) =>
                                      handleFieldChange(globalIndex, "realPrice", e.target.value)
                                    }
                                    placeholder="Optional"
                                    className="w-28 bg-surface border border-primary/20 p-2 text-sm focus:outline-none focus:border-primary transition-colors text-primary placeholder:text-primary/25"
                                  />
                                  <span className="text-xs text-on-surface-variant">EGP</span>
                                </div>
                              </td>
                              <td className="py-3 px-6">
                                {isOutOfStock ? (
                                  <span className="text-[0.6rem] uppercase tracking-widest text-red-600 font-bold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                    Out of Stock
                                  </span>
                                ) : (
                                  <span className="text-[0.6rem] uppercase tracking-widest text-emerald-600 font-semibold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    In Stock ({row.stockCount})
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Google Apps Script Setup Accordion */}
        <div className="mt-12 bg-surface-container p-6 border border-primary/10">
          <button
            onClick={() => setShowSetupGuide(!showSetupGuide)}
            className="w-full flex items-center justify-between text-left"
          >
            <div>
              <h3 className="font-serif text-lg text-primary">
                Direct Google Sheets Sync (Google Apps Script)
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                How write permissions work between this web dashboard and your Google Sheet
              </p>
            </div>
            {showSetupGuide ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          <AnimatePresence>
            {showSetupGuide && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-primary/10 space-y-6 text-sm text-on-surface-variant">
                  <p>
                    Because Google Sheets published CSV is read-only, you connect a simple 10-line
                    Google Apps Script to your sheet. Whenever you click <strong>Save to Sheet</strong>,
                    the dashboard automatically pushes the updated stock & prices directly to your sheet!
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="font-serif text-2xl text-primary/30 shrink-0">1</span>
                      <div>
                        <p className="font-medium text-primary">Open your Google Sheet</p>
                        <p className="text-xs mt-1">
                          In Google Sheets menu, click <strong>Extensions → Apps Script</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="font-serif text-2xl text-primary/30 shrink-0">2</span>
                      <div className="flex-1">
                        <p className="font-medium text-primary">Paste this script code into the editor:</p>
                        <pre className="mt-2 bg-surface p-4 text-xs overflow-x-auto border border-primary/10 whitespace-pre-wrap text-primary font-mono select-all">
{`function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  if (data.action === "updateAll") {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var csvLines = data.csv.split("\\n");
    sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();
    for (var i = 0; i < csvLines.length; i++) {
      var cols = csvLines[i].split(",");
      for (var j = 0; j < cols.length; j++) {
        sheet.getRange(i + 1, j + 1).setValue(cols[j]);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}
                        </pre>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="font-serif text-2xl text-primary/30 shrink-0">3</span>
                      <div>
                        <p className="font-medium text-primary">Deploy as Web App</p>
                        <p className="text-xs mt-1">
                          Click <strong>Deploy → New deployment</strong>. Select <strong>Web App</strong>.
                          Set <em>Execute as:</em> <strong>Me</strong> and <em>Who has access:</em> <strong>Anyone</strong>.
                          Click Deploy and copy the Web App URL.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="font-serif text-2xl text-primary/30 shrink-0">4</span>
                      <div>
                        <p className="font-medium text-primary">Paste your URL in Settings</p>
                        <p className="text-xs mt-1">
                          Click <strong>Settings</strong> at the top right of this dashboard, paste the URL, and click Save.
                          You now have 100% full live write control!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface p-8 max-w-lg w-full relative border border-primary/20 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-primary/10">
                <div className="flex items-center gap-2.5">
                  <Settings size={18} className="text-primary" />
                  <h3 className="font-serif text-xl text-primary">Integration Settings</h3>
                </div>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[0.65rem] uppercase tracking-widest text-primary font-semibold mb-1">
                    Google Apps Script Web App URL (for 1-click Save)
                  </label>
                  <p className="text-[0.7rem] text-on-surface-variant mb-2">
                    Enter the URL from your deployed Google Apps Script to write changes directly.
                  </p>
                  <input
                    type="url"
                    value={appsScriptUrl}
                    onChange={(e) => setAppsScriptUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full bg-surface-container border border-primary/20 p-3 text-xs text-primary focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[0.65rem] uppercase tracking-widest text-primary font-semibold mb-1">
                    Google Sheet Direct Link (Optional)
                  </label>
                  <p className="text-[0.7rem] text-on-surface-variant mb-2">
                    Paste your direct spreadsheet link for a quick shortcut.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={sheetEditUrl}
                      onChange={(e) => setSheetEditUrl(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/..."
                      className="flex-1 bg-surface-container border border-primary/20 p-3 text-xs text-primary focus:outline-none focus:border-primary font-mono"
                    />
                    {sheetEditUrl && (
                      <a
                        href={sheetEditUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 bg-surface-container border border-primary/20 text-primary hover:bg-primary/5 transition-colors"
                        title="Open Sheet in new tab"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-primary/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2.5 text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveSettings(appsScriptUrl, sheetEditUrl)}
                  className="px-6 py-2.5 bg-primary text-white text-xs uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 shadow-xl text-xs uppercase tracking-widest font-medium ${
              toast.type === "success"
                ? "bg-emerald-700 text-white"
                : toast.type === "error"
                ? "bg-red-700 text-white"
                : "bg-surface-container text-primary border border-primary/20"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle size={15} />
            ) : toast.type === "error" ? (
              <AlertCircle size={15} />
            ) : null}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Admin Page Component ──────────────────────────────────────
export default function AdminPage() {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? <Dashboard /> : <LoginScreen />;
}
