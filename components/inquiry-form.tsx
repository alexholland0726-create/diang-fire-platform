"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

type InquiryFormProps = {
  isZh: boolean;
  categories: Array<{ zh: string; en: string }>;
};

const emptyForm = {
  company: "",
  contactName: "",
  phone: "",
  email: "",
  category: "",
  message: ""
};

export function InquiryForm({ isZh, categories }: InquiryFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function updateForm(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? (isZh ? "提交失败" : "Submit failed"));
      }

      setForm(emptyForm);
      setMessage(isZh ? "需求已提交，我们会尽快与您联系。" : "Your request has been submitted.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : isZh ? "提交失败" : "Submit failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="mt-8 grid gap-4 rounded-md border border-ink/10 bg-mist p-6" onSubmit={submitInquiry}>
      <label className="grid gap-2 text-sm font-medium text-ink">
        {isZh ? "公司名称" : "Company"}
        <input
          value={form.company}
          onChange={(event) => updateForm("company", event.target.value)}
          className="h-12 rounded-md border border-ink/10 bg-white px-4 outline-none focus:border-gold"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-ink">
        {isZh ? "联系人" : "Contact Name"}
        <input
          value={form.contactName}
          onChange={(event) => updateForm("contactName", event.target.value)}
          className="h-12 rounded-md border border-ink/10 bg-white px-4 outline-none focus:border-gold"
          required
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          {isZh ? "电话/WhatsApp" : "Phone / WhatsApp"}
          <input
            value={form.phone}
            onChange={(event) => updateForm("phone", event.target.value)}
            className="h-12 rounded-md border border-ink/10 bg-white px-4 outline-none focus:border-gold"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          {isZh ? "邮箱" : "Email"}
          <input
            value={form.email}
            onChange={(event) => updateForm("email", event.target.value)}
            className="h-12 rounded-md border border-ink/10 bg-white px-4 outline-none focus:border-gold"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-ink">
        {isZh ? "产品分类" : "Category"}
        <select
          value={form.category}
          onChange={(event) => updateForm("category", event.target.value)}
          className="h-12 rounded-md border border-ink/10 bg-white px-4 outline-none focus:border-gold"
        >
          <option value="">{isZh ? "请选择" : "Select"}</option>
          {categories.map((category) => (
            <option key={category.zh} value={isZh ? category.zh : category.en}>
              {isZh ? category.zh : category.en}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-ink">
        {isZh ? "需求说明" : "Requirement Details"}
        <textarea
          value={form.message}
          onChange={(event) => updateForm("message", event.target.value)}
          className="min-h-36 rounded-md border border-ink/10 bg-white p-4 outline-none focus:border-gold"
          required
        />
      </label>
      {error && <div className="rounded-md bg-ember/10 px-4 py-3 text-sm text-ember">{error}</div>}
      {message && <div className="rounded-md bg-gold/15 px-4 py-3 text-sm text-ink">{message}</div>}
      <button
        disabled={saving}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gold px-5 text-sm font-bold text-ink disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {saving ? (isZh ? "提交中..." : "Submitting...") : isZh ? "提交需求" : "Submit Request"}
      </button>
    </form>
  );
}
