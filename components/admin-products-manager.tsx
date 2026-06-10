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
  brand: string;
  sku: string;
  nameZh: string;
  nameEn: string;
  summaryZh: string;
  summaryEn: string;
  subcategoryZh: string;
  subcategoryEn: string;
  specs: string;
  referencePrice: string;
  sourceUrl: string;
  sourceDocument: string;
  imageSourceUrl: string;
  imageUrl: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  updatedAt: string;
};

type ProductForm = {
  id?: number;
  categoryId: string;
  brand: string;
  sku: string;
  nameZh: string;
  nameEn: string;
  summaryZh: string;
  summaryEn: string;
  subcategoryZh: string;
  subcategoryEn: string;
  specs: string;
  referencePrice: string;
  sourceUrl: string;
  sourceDocument: string;
  imageSourceUrl: string;
  imageUrl: string;
  status: Product["status"];
};

type CategoryForm = {
  nameZh: string;
  nameEn: string;
  slug: string;
};

const emptyForm: ProductForm = {
  categoryId: "",
  brand: "",
  sku: "",
  nameZh: "",
  nameEn: "",
  summaryZh: "",
  summaryEn: "",
  subcategoryZh: "",
  subcategoryEn: "",
  specs: "",
  referencePrice: "",
  sourceUrl: "",
  sourceDocument: "",
  imageSourceUrl: "",
  imageUrl: "",
  status: "DRAFT"
};

const emptyCategoryForm: CategoryForm = {
  nameZh: "",
  nameEn: "",
  slug: ""
};

const brandOptions = ["3M", "霍尼韦尔 Honeywell", "MSA 梅思安", "其他品牌"];

const statusText = {
  DRAFT: "草稿",
  PUBLISHED: "已上架",
  ARCHIVED: "已下架"
};

export function AdminProductsManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [categoryForm, setCategoryForm] = useState<CategoryForm>(emptyCategoryForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);
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
      [
        product.nameZh,
        product.nameEn,
        product.brand,
        product.sku,
        product.categoryNameZh,
        product.subcategoryZh,
        product.sourceDocument
      ]
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

  function updateCategoryForm(field: keyof CategoryForm, value: string) {
    setCategoryForm((current) => ({ ...current, [field]: value }));
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
      brand: product.brand || "",
      sku: product.sku,
      nameZh: product.nameZh,
      nameEn: product.nameEn,
      summaryZh: product.summaryZh,
      summaryEn: product.summaryEn,
      subcategoryZh: product.subcategoryZh,
      subcategoryEn: product.subcategoryEn,
      specs: product.specs,
      referencePrice: product.referencePrice || "",
      sourceUrl: product.sourceUrl || "",
      sourceDocument: product.sourceDocument || "",
      imageSourceUrl: product.imageSourceUrl || "",
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
      setMessage("图片已上传，请记得保存产品。");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "图片上传失败");
    } finally {
      setUploading(false);
    }
  }

  async function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingCategory(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryForm)
      });
      const result = (await response.json()) as { category?: Category; error?: string };

      if (!response.ok || !result.category) {
        throw new Error(result.error ?? "分类保存失败");
      }

      setCategories((current) => [...current, result.category as Category]);
      setForm((current) => ({ ...current, categoryId: String(result.category?.id) }));
      setCategoryForm(emptyCategoryForm);
      setMessage("分类已新增。");
    } catch (categoryError) {
      setError(categoryError instanceof Error ? categoryError.message : "分类保存失败");
    } finally {
      setSavingCategory(false);
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
          brand: form.brand,
          sku: form.sku,
          nameZh: form.nameZh,
          nameEn: form.nameEn,
          summaryZh: form.summaryZh,
          summaryEn: form.summaryEn,
          subcategoryZh: form.subcategoryZh,
          subcategoryEn: form.subcategoryEn,
          specs: form.specs,
          referencePrice: form.referencePrice,
          sourceUrl: form.sourceUrl,
          sourceDocument: form.sourceDocument,
          imageSourceUrl: form.imageSourceUrl,
          imageUrl: form.imageUrl,
          status: form.status
        })
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "保存失败");
      }

      setMessage(form.id ? "产品已更新。" : "产品已添加。");
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

    setMessage("产品已删除。");
    await loadData();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[440px_1fr]">
      <section className="rounded-md bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-ink">{form.id ? "编辑产品" : "添加产品"}</h2>
            <p className="mt-1 text-sm text-steel">
              产品信息必须来自品牌官网、官方目录或厂家资料；未核对来源前先保存为草稿。
            </p>
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

        <form className="mt-6 grid gap-3 rounded-md border border-ink/10 bg-mist p-4" onSubmit={saveCategory}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-ink">新增产品分类</div>
              <div className="mt-1 text-xs text-steel">上传新系列产品前，先在这里建立分类。</div>
            </div>
            <button
              disabled={savingCategory || !categoryForm.nameZh.trim()}
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md bg-ink px-3 text-xs font-semibold text-white disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              {savingCategory ? "保存中..." : "保存分类"}
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <input
              value={categoryForm.nameZh}
              onChange={(event) => updateCategoryForm("nameZh", event.target.value)}
              className="h-10 rounded-md border border-ink/10 bg-white px-3 text-sm outline-none focus:border-gold"
              placeholder="中文分类名"
            />
            <input
              value={categoryForm.nameEn}
              onChange={(event) => updateCategoryForm("nameEn", event.target.value)}
              className="h-10 rounded-md border border-ink/10 bg-white px-3 text-sm outline-none focus:border-gold"
              placeholder="English category"
            />
            <input
              value={categoryForm.slug}
              onChange={(event) => updateCategoryForm("slug", event.target.value)}
              className="h-10 rounded-md border border-ink/10 bg-white px-3 text-sm outline-none focus:border-gold"
              placeholder="URL标识，可选"
            />
          </div>
        </form>

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

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              子级分类
              <input
                value={form.subcategoryZh}
                onChange={(event) => updateForm("subcategoryZh", event.target.value)}
                className="h-11 rounded-md border border-ink/10 px-3 outline-none focus:border-gold"
                placeholder="例如：防护眼镜"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              English subcategory
              <input
                value={form.subcategoryEn}
                onChange={(event) => updateForm("subcategoryEn", event.target.value)}
                className="h-11 rounded-md border border-ink/10 px-3 outline-none focus:border-gold"
                placeholder="Safety glasses"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-ink">
            品牌
            <select
              value={form.brand}
              onChange={(event) => updateForm("brand", event.target.value)}
              className="h-11 rounded-md border border-ink/10 bg-white px-3 outline-none focus:border-gold"
            >
              <option value="">请选择品牌</option>
              {brandOptions.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
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
              placeholder="必须与官方资料一致"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            英文产品名称
            <input
              value={form.nameEn}
              onChange={(event) => updateForm("nameEn", event.target.value)}
              className="h-11 rounded-md border border-ink/10 px-3 outline-none focus:border-gold"
              placeholder="Use official English name when available"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              SKU/型号/订货号
              <input
                value={form.sku}
                onChange={(event) => updateForm("sku", event.target.value)}
                className="h-11 rounded-md border border-ink/10 px-3 outline-none focus:border-gold"
                placeholder="必须与官方资料一致"
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
            参考价/目录价
            <input
              value={form.referencePrice}
              onChange={(event) => updateForm("referencePrice", event.target.value)}
              className="h-11 rounded-md border border-ink/10 px-3 outline-none focus:border-gold"
              placeholder="例如：询价为准 / 参考价 ¥1,200"
            />
            <span className="text-xs font-normal text-steel">品牌产品通常有折扣，最终成交以报价为准。</span>
          </label>

          <div className="grid gap-4 rounded-md border border-ink/10 bg-mist p-4">
            <div>
              <div className="text-sm font-semibold text-ink">来源追溯</div>
              <p className="mt-1 text-xs leading-5 text-steel">
                正式上架前必须填写官方来源。官网产品页优先；PDF 目录请写清文件名和页码。
              </p>
            </div>
            <label className="grid gap-2 text-sm font-medium text-ink">
              官方产品/资料链接
              <input
                value={form.sourceUrl}
                onChange={(event) => updateForm("sourceUrl", event.target.value)}
                className="h-11 rounded-md border border-ink/10 px-3 outline-none focus:border-gold"
                placeholder="https://..."
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              资料来源备注
              <input
                value={form.sourceDocument}
                onChange={(event) => updateForm("sourceDocument", event.target.value)}
                className="h-11 rounded-md border border-ink/10 px-3 outline-none focus:border-gold"
                placeholder="例如：3M个人安全防护产品目录2025版，第7页"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              图片来源链接/备注
              <input
                value={form.imageSourceUrl}
                onChange={(event) => updateForm("imageSourceUrl", event.target.value)}
                className="h-11 rounded-md border border-ink/10 px-3 outline-none focus:border-gold"
                placeholder="官网图片链接、PDF页码或厂家素材来源"
              />
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
              placeholder="适用场景、核心卖点、认证信息、采购说明。不要夸大，不写未核实信息。"
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
              placeholder="规格、包装、认证、选型注意事项等。"
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
              placeholder="搜索产品/品牌/型号/来源"
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
                    {product.subcategoryZh && (
                      <span className="rounded-full bg-mist px-2 py-1 text-xs text-steel">
                        {product.subcategoryZh}
                      </span>
                    )}
                    {product.brand && (
                      <span className="rounded-full bg-ink px-2 py-1 text-xs font-semibold text-white">
                        {product.brand}
                      </span>
                    )}
                    <span className="rounded-full bg-gold/15 px-2 py-1 text-xs font-semibold text-ink">
                      {statusText[product.status]}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-steel">
                    {product.summaryZh || "暂无简介"}
                  </p>
                  <div className="mt-2 text-xs text-steel">
                    {product.sku ? `型号：${product.sku}` : "未填写型号"}
                    {product.referencePrice ? ` ｜ 参考价：${product.referencePrice}` : ""}
                  </div>
                  <div className="mt-2 text-xs text-steel">
                    {product.sourceDocument || product.sourceUrl ? (
                      <>来源：{product.sourceDocument || product.sourceUrl}</>
                    ) : (
                      <span className="text-ember">未填写来源，不能正式上架</span>
                    )}
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
