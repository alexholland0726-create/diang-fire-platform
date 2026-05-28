import { AdminInquiriesManager } from "@/components/admin-inquiries-manager";
import { AdminShell } from "@/components/admin-shell";
import { requireAdminPage } from "@/lib/auth";
import type { Locale } from "@/lib/site";

export default function AdminInquiriesPage({ params }: { params: { locale: Locale } }) {
  requireAdminPage(params.locale);

  const isZh = params.locale !== "en";

  return (
    <AdminShell
      locale={params.locale}
      active="inquiries"
      title={isZh ? "询价管理" : "Inquiry Management"}
      description={isZh ? "查看客户提交的采购需求，并跟进状态。" : "Review quote requests and update follow-up status."}
    >
      <AdminInquiriesManager />
    </AdminShell>
  );
}
