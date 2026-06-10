#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const FEISHU_API = "https://open.feishu.cn/open-apis";
const DEFAULT_FEISHU_APP_ID = "cli_aa9116bef3781cd8";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) process.env[key] = value;
  }
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}. Please add it to .env.local.`);
  }
  return value;
}

function extractWikiNodeToken(input) {
  const value = input?.trim();
  if (!value) return "";
  const match = value.match(/\/wiki\/([^/?#]+)/);
  return match?.[1] ?? value;
}

function extractBitableAppToken(input) {
  const value = input?.trim();
  if (!value) return "";
  const baseMatch = value.match(/\/base\/([^/?#]+)/);
  if (baseMatch?.[1]) return baseMatch[1];

  try {
    const url = new URL(value);
    return url.searchParams.get("app_token") ?? "";
  } catch {
    return value.startsWith("bascn") || value.startsWith("app") ? value : "";
  }
}

async function feishuRequest(path, options = {}) {
  const response = await fetch(`${FEISHU_API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(options.headers ?? {}),
    },
  });
  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }

  if (!response.ok || (typeof body.code === "number" && body.code !== 0)) {
    const detail = body.msg || body.message || body.raw || response.statusText;
    throw new Error(`${path} failed: ${detail}`);
  }

  return body;
}

async function getTenantAccessToken() {
  const appId = process.env.FEISHU_APP_ID?.trim() || DEFAULT_FEISHU_APP_ID;
  const appSecret = requireEnv("FEISHU_APP_SECRET");

  const body = await feishuRequest("/auth/v3/tenant_access_token/internal", {
    method: "POST",
    body: JSON.stringify({
      app_id: appId,
      app_secret: appSecret,
    }),
  });

  return body.tenant_access_token;
}

async function listBitableTables(appToken, tenantToken) {
  const body = await feishuRequest(
    `/bitable/v1/apps/${encodeURIComponent(appToken)}/tables?page_size=100`,
    {
      headers: {
        Authorization: `Bearer ${tenantToken}`,
      },
    },
  );

  return body.data?.items ?? [];
}

async function resolveWikiNode(wikiToken, tenantToken) {
  const body = await feishuRequest(
    `/wiki/v2/spaces/get_node?token=${encodeURIComponent(wikiToken)}`,
    {
      headers: {
        Authorization: `Bearer ${tenantToken}`,
      },
    },
  );

  return body.data?.node ?? null;
}

async function main() {
  const root = process.cwd();
  loadEnvFile(resolve(root, ".env"));
  loadEnvFile(resolve(root, ".env.local"));

  console.log("Feishu integration check");
  console.log("-------------------------");

  const tenantToken = await getTenantAccessToken();
  console.log("OK: tenant_access_token acquired");

  const wikiUrl = process.env.FEISHU_WIKI_URL ?? "";
  const wikiToken =
    process.env.FEISHU_WIKI_NODE_TOKEN || extractWikiNodeToken(wikiUrl);
  if (wikiToken) {
    console.log(`OK: wiki node token detected: ${wikiToken}`);
  } else {
    console.log("INFO: FEISHU_WIKI_URL / FEISHU_WIKI_NODE_TOKEN is not set");
  }

  let bitableToken = extractBitableAppToken(
    process.env.FEISHU_BITABLE_APP_TOKEN || process.env.FEISHU_BITABLE_URL || "",
  );

  if (!bitableToken && wikiToken) {
    const node = await resolveWikiNode(wikiToken, tenantToken);
    if (node) {
      const title = node.title || "(untitled)";
      const type = node.obj_type || "unknown";
      console.log(`OK: wiki node resolved: ${title} (${type})`);

      if (type === "bitable" && node.obj_token) {
        bitableToken = node.obj_token;
        console.log(`OK: bitable app token resolved from wiki node: ${bitableToken}`);
      } else {
        console.log(
          `INFO: this wiki node points to ${type}, not directly to a bitable app.`,
        );
      }
    }
  }

  if (!bitableToken) {
    console.log(
      "INFO: FEISHU_BITABLE_APP_TOKEN is not set and could not be resolved from the wiki link.",
    );
    console.log(
      "NEXT: open the Bitable itself, copy its direct link, then add FEISHU_BITABLE_URL or FEISHU_BITABLE_APP_TOKEN to .env.local.",
    );
    return;
  }

  const tables = await listBitableTables(bitableToken, tenantToken);
  console.log(`OK: ${tables.length} bitable table(s) found`);
  for (const table of tables) {
    console.log(`- ${table.name} (${table.table_id})`);
  }
}

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
});
