"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Edit3, ImagePlus, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";

type Category = {
  id: number;
  slug: string;
  nameZh: string;
  nameEn: string;
};

type Product = {
  id: number;
  categoryId: number;
  categoryNameZh: string;
  categoryNameEn: string;
  sku: string;
  nameZh: string;
  nameEn: string;
  summaryZh: string;
  summaryEn: string;
  specs: string;
  imageUrl: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  updatedAt: string;
};

type ProductForm = {
  id?: number;
  categoryId: string;
  sku: string;
  nameZh: string;
  nameEn: string;
  summaryZh: string;
  summaryEn: string;
  specs: string;
  imageUrl: string;
  status: Product["status"];
};

const emptyForm: ProductForm = {
  categoryId: "",
  sku: "",
  nameZh: "",
  nameEn: "",
  summaryZh: "",
  summaryEn: "",
  specs: "",
  imageUrl: "",
  status: "DRAFT"
};

const statusText = {
  DRAFT: "草稿",
  PUBLISHED: "已上架",
  ARCHIVED: "已下架"
};

export function AdminProductsManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return products;
    }

    return products.filter((product) =>
      [product.nameZh, product.nameEn, product.sku, product.categoryNameZh]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [products, query]);

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [categoryResponse, productResponse] = await Promise.all([
        fetch("/api/admin/categories", { cache: "no-store" }),
        fetch("/api/admin/products", { cache: "no-store" })
      ]);

      if (categoryResponse.status === 401 || productResponse.status === 401) {
        window.location.href = "/zh/admin/login";
        return;
      }

      if (!categoryResponse.ok || !productResponse.ok) {
        throw new Error("加载产品数据失败");
      }

      const categoryData = (await categoryResponse.json()) as { categories: Category[] };
      const productData = (await productResponse.json()) as { products: Product[] };

      setCategories(categoryData.categories);
      setProducts(productData.products);

      if (!form.categoryId && categoryData.categories[0]) {
        setForm((current) => ({
          ...current,
          categoryId: String(categoryData.categories[0].id)
        }));
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "加载失败");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateForm(field: keyof ProductForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm({
      ...emptyForm,
      categoryId: categories[0] ? String(categories[0].id) : ""
    });
    setError("");
    setMessage("");
  }

  function editProduct(product: Product) {
    setForm({
      id: product.id,
      categoryId: String(product.categoryId),
      sku: product.sku,
      nameZh: product.nameZh,
      nameEn: product.nameEn,
      summaryZh: product.summaryZh,
      summaryEn: product.summaryEn,
      specs: product.specs,
      imageUrl: product.imageUrl,
      status: product.status
    });
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData
      });
      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error ?? "图片上传失败");
      }

      updateForm("imageUrl", result.url);
      setMessage("图片已上传，请记得保存产品");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "图片上传失败");
    } finally {
      setUploading(false);
    }
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const endpoint = form.id ? `/api/admin/products/${form.id}` : "/api/admin/products";
      const response = await fetch(endpoint, {
        method: form.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: form.categoryId,
          sku: form.sku,
          nameZh: form.nameZh,
          nameEn: form.nameEn,
          summaryZh: form.summaryZh,
          summaryEn: form.summaryEn,
          specs: form.specs,
          imageUrl: form.imageUrl,
          status: form.status
        })
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "保存失败");
      }

      setMessage(form.id ? "产品已更新" : "产品已添加");
      resetForm();
      await loadData();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "保存失败");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(product: Product) {
    const confirmed = window.confirm(`确定删除「${product.nameZh}」吗？`);

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");

    const response = await fetch(`/api/admin/products/${product.id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setError(result.error ?? "删除失败");
      return;
    }

    setMessage("产品已删除");
    await loadData();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[440px_1fr]">
      <section className="rounded-md bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-ink">{form.id ? "编辑产品" : "添加产品"}</h2>
            <p className="mt-1 text-sm text-steel">产品第一版不显示价格，只引导客户提交询价。</p>
          </div>
          {form.id && (
            <button
              type="button"
              onClick={resetForm}
              className="grid h-9 w-9 place-items-center rounded-md border border-ink/10 text-ink"
              aria-label="取消编辑"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <form className="mt-6 grid gap-4" onSubmit={saveProduct}>
          <label className="grid gap-2 text-sm font-medium text-ink">
            产品分类
            <select
              value={form.categoryId}
              onChange={(event) => updateForm("categoryId", event.target.value)}
              className="h-11 rounded-md border border-ink/10 bg-white px-3 outline-none focus:border-gold"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameZh}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            中文产品名称
            <input
              value={form.nameZh}
              onChange={(event) => updateForm("nameZh", event.target.value)}
              className="h-11 rounded-md border border-ink/10 px-3 outline-none focus:border-gold"
              placeholder="例如：正压式空气呼吸器"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            英文产品名称
            <input
              value={form.nameEn}
              onChange={(event) => updateForm("nameEn", event.target.value)}
              className="h-11 rounded-md border border-ink/10 px-3 outline-none focus:border-gold"
              placeholder="Positive Pressure SCBA"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              SKU/型号
              <input
                value={form.sku}
                onChange={(event) => updateForm("sku", event.target.value)}
                className="h-11 rounded-md border border-ink/10 px-3 outline-none focus:border-gold"
                placeholder="DA-SCBA-001"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-ink">
              状态
              <select
                value={form.status}
                onChange={(event) => updateForm("status", event.target.value)}
                className="h-11 rounded-md border border-ink/10 bg-white px-3 outline-none focus:border-gold"
              >
                <option value="DRAFT">草稿</option>
                <option value="PUBLISHED">已上架</option>
                <option value="ARCHIVED">已下架</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-ink">
            产品图片
            <div className="rounded-md border border-dashed border-ink/20 bg-mist p-3">
              {form.imageUrl ? (
                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-md bg-white">
                  <Image src={form.imageUrl} alt={form.nameZh || "产品图片"} fill className="object-cover" />
                </div>
              ) : (
                <div className="mb-3 grid aspect-[4/3] place-items-center rounded-md bg-white text-sm text-steel">
                  暂未上传图片
                </div>
              )}
              <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white">
                <ImagePlus className="h-4 w-4" />
                {uploading ? "上传中..." : "上传图片"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      void uploadImage(file);
                    }
                    event.target.value = "";
                  }}
                />
              </label>
            </div>
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            中文简介
            <textarea
              value={form.summaryZh}
              onChange={(event) => updateForm("summaryZh", event.target.value)}
              className="min-h-24 rounded-md border border-ink/10 p-3 outline-none focus:border-gold"
              placeholder="适用场景、核心卖点、认证信息、采购说明..."
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            英文简介
            <textarea
              value={form.summaryEn}
              onChange={(event) => updateForm("summaryEn", event.target.value)}
              className="min-h-24 rounded-md border border-ink/10 p-3 outline-none focus:border-gold"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            参数/备注
            <textarea
              value={form.specs}
              onChange={(event) => updateForm("specs", event.target.value)}
              className="min-h-24 rounded-md border border-ink/10 p-3 outline-none focus:border-gold"
              placeholder="可填写规格、认证、包装、供方信息等。"
            />
          </label>

          {error && <div className="rounded-md bg-ember/10 px-4 py-3 text-sm text-ember">{error}</div>}
          {message && <div className="rounded-md bg-gold/15 px-4 py-3 text-sm text-ink">{message}</div>}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-bold text-white disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "保存中..." : form.id ? "保存修改" : "添加产品"}
          </button>
        </form>
      </section>

      <section className="rounded-md bg-white p-6 shadow-soft">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-ink">产品列表</h2>
            <p className="mt-1 text-sm text-steel">共 {products.length} 个产品</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-10 rounded-md border border-ink/10 px-3 text-sm outline-none focus:border-gold"
              placeholder="搜索产品/型号"
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

        {loading ? (
          <div className="mt-6 rounded-md border border-ink/10 p-8 text-center text-sm text-steel">
            正在加载产品...
          </div>
        ) : filteredProducts.length ? (
          <div className="mt-6 overflow-hidden rounded-md border border-ink/10">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="grid gap-4 border-b border-ink/10 p-4 last:border-b-0 lg:grid-cols-[112px_1fr_150px]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-mist">
                  {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.nameZh} fill className="object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center text-xs text-steel">无图片</div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-ink">{product.nameZh}</h3>
                    <span className="rounded-full bg-mist px-2 py-1 text-xs text-steel">
                      {product.categoryNameZh}
                    </span>
                    <span className="rounded-full bg-gold/15 px-2 py-1 text-xs font-semibold text-ink">
                      {statusText[product.status]}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-steel">
                    {product.summaryZh || "暂无简介"}
                  </p>
                  <div className="mt-2 text-xs text-steel">
                    {product.sku ? `型号：${product.sku}` : "未填写型号"}
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:justify-end">
                  <button
                    type="button"
                    onClick={() => editProduct(product)}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-ink/10 px-3 text-sm font-semibold text-ink"
                  >
                    <Edit3 className="h-4 w-4" />
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => void deleteProduct(product)}
                    className="grid h-9 w-9 place-items-center rounded-md border border-ember/20 text-ember"
                    aria-label="删除产品"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-md border border-dashed border-ink/20 p-8 text-center">
            <Plus className="mx-auto h-8 w-8 text-gold" />
            <h3 className="mt-4 font-semibold text-ink">暂无产品</h3>
            <p className="mt-2 text-sm text-steel">在左侧填写信息，添加第一个产品。</p>
          </div>
        )}
      </section>
    </div>
  );
}
