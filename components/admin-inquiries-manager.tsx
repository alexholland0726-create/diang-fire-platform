"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, Phone, RefreshCw } from "lucide-react";

type Inquiry = {
  id: number;
  company: string;
  contactName: string;
  phone: string;
  email: string;
  category: string;
  message: string;
  status: "NEW" | "CONTACTED" | "QUOTED" | "CLOSED";
  createdAt: string;
};

const statusText = {
  NEW: "新线索",
  CONTACTED: "已联系",
  QUOTED: "已报价",
  CLOSED: "已关闭"
};

export function AdminInquiriesManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return inquiries;
    }

    return inquiries.filter((item) =>
      [item.company, item.contactName, item.phone, item.email, item.category, item.message]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [inquiries, query]);

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/inquiries", { cache: "no-store" });

      if (response.status === 401) {
        window.location.href = "/zh/admin/login";
        return;
      }

      const result = (await response.json()) as { inquiries?: Inquiry[]; error?: string };

      if (!response.ok || !result.inquiries) {
        throw new Error(result.error ?? "加载询价失败");
      }

      setInquiries(result.inquiries);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "加载询价失败");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: Inquiry["status"]) {
    setError("");

    const response = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setError(result.error ?? "更新状态失败");
      return;
    }

    await loadData();
  }

  useEffect(() => {
    void loadData();
  }, []);

  return (
    <section className="rounded-md bg-white p-6 shadow-soft">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-ink">询价线索</h2>
          <p className="mt-1 text-sm text-steel">客户提交采购需求后会自动进入这里。</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 rounded-md border border-ink/10 px-3 text-sm outline-none focus:border-gold"
            placeholder="搜索客户/电话/产品"
          />
          <button
            type="button"
            onClick={() => void loadData()}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-ink/10 px-4 text-sm font-semibold text-ink"
          >
            <RefreshCw className="h-4 w-4" />
            刷新
          </button>
        </div>
      </div>

      {error && <div className="mt-5 rounded-md bg-ember/10 px-4 py-3 text-sm text-ember">{error}</div>}

      {loading ? (
        <div className="mt-6 rounded-md border border-ink/10 p-8 text-center text-sm text-steel">
          正在加载询价...
        </div>
      ) : filtered.length ? (
        <div className="mt-6 grid gap-4">
          {filtered.map((inquiry) => (
            <article key={inquiry.id} className="rounded-md border border-ink/10 p-5">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-ink">{inquiry.company || "未填写公司"}</h3>
                    <span className="rounded-full bg-gold/15 px-2 py-1 text-xs font-semibold text-ink">
                      {inquiry.category || "未选分类"}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-steel">
                    <span>联系人：{inquiry.contactName}</span>
                    {inquiry.phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-gold" />
                        {inquiry.phone}
                      </span>
                    )}
                    {inquiry.email && (
                      <span className="inline-flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-gold" />
                        {inquiry.email}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 whitespace-pre-wrap rounded-md bg-mist p-4 text-sm leading-7 text-steel">
                    {inquiry.message}
                  </p>
                </div>
                <div className="w-full shrink-0 lg:w-40">
                  <select
                    value={inquiry.status}
                    onChange={(event) => void updateStatus(inquiry.id, event.target.value as Inquiry["status"])}
                    className="h-10 w-full rounded-md border border-ink/10 bg-white px-3 text-sm outline-none focus:border-gold"
                  >
                    {Object.entries(statusText).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <div className="mt-3 text-xs text-steel">{new Date(inquiry.createdAt).toLocaleString("zh-CN")}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-md border border-dashed border-ink/20 p-8 text-center text-sm text-steel">
          暂无询价线索。
        </div>
      )}
    </section>
  );
}
