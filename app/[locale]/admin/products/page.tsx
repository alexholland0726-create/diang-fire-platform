import { AdminProductsManager } from "@/components/admin-products-manager";
import { AdminShell } from "@/components/admin-shell";
import { requireAdminPage } from "@/lib/auth";
import type { Locale } from "@/lib/site";

export default function AdminProductsPage({ params }: { params: { locale: Locale } }) {
  requireAdminPage(params.locale);

  const isZh = params.locale !== "en";

  return (
    <AdminShell
      locale={params.locale}
      active="products"
      title={isZh ? "产品管理" : "Product Management"}
      description={isZh ? "新增、编辑、上传图片、上下架和删除产品。" : "Create, edit, upload images, publish, archive, and delete products."}
    >
      <AdminProductsManager />
    </AdminShell>
  );
}
