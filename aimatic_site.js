(() => {
  "use strict";

  const app = document.querySelector("[data-app]");
  if (!app) return;

  const overlay = app.querySelector("[data-overlay]");
  const sheet = app.querySelector("[data-sheet]");
  const eyebrowEl = app.querySelector("[data-eyebrow]");
  const titleEl = app.querySelector("[data-title]");
  const tabsEl = app.querySelector("[data-tabs]");
  const bodyEl = app.querySelector("[data-body]");
  const footEl = app.querySelector("[data-foot]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const C = {
    solutions: {
      eye: "Solutions",
      title: "What we deliver",
      items: [
        {
          id: "implement",
          title: "Implement with clarity",
          blurb: "ERPNext configured around real workflows—not a generic demo.",
          tags: ["Discovery", "Rollout", "Training"],
          tabs: {
            Overview: {
              lead: "Replace tool chaos with one adaptable operating system your team can actually run.",
              problem: "Teams juggle spreadsheets, partial ERPs, and tribal knowledge.",
              solution: "We map processes, configure ERPNext, and launch with adoption built in.",
              points: ["Process workshops", "Master data readiness", "Phased go-live", "Role-based training"],
              stats: [
                ["01", "Discover"],
                ["02", "Configure"],
                ["03", "Launch"],
              ],
            },
            Capabilities: {
              points: ["Multi-company setup", "Warehouses & costing", "Permissions model", "Print formats", "Opening balances", "Cutover runbooks"],
            },
            Benefits: {
              points: ["Faster adoption", "Fewer workarounds", "Cleaner stock & finance", "One operational source of truth"],
            },
          },
        },
        {
          id: "customize",
          title: "Customize the right parts",
          blurb: "Frappe apps and workflows only where they create advantage.",
          tags: ["Apps", "Workflows", "Reports"],
          tabs: {
            Overview: {
              lead: "Your edge should not be flattened into a template.",
              problem: "Standard software cannot express how you win.",
              solution: "Targeted custom DocTypes, automations, and UX—kept upgrade-friendly.",
              points: ["Custom modules", "Approvals & states", "Operational reports", "API surfaces"],
            },
            Capabilities: {
              points: ["Client/server scripts", "Child tables & UX", "Dashboards", "Named series & controls"],
            },
            Benefits: {
              points: ["Process fidelity", "Less spreadsheet debt", "Room to evolve after go-live"],
            },
          },
        },
        {
          id: "connect",
          title: "Connect your ecosystem",
          blurb: "Channels, payments, partners, and warehouses in one dependable flow.",
          tags: ["APIs", "Webhooks", "Sync"],
          tabs: {
            Overview: {
              lead: "Stop reconciling systems that should already agree.",
              problem: "Sales channels, stock, and finance disagree daily.",
              solution: "Reliable integrations with logs, retries, and clear ownership.",
              points: ["Partner APIs", "Order & stock sync", "Event-driven updates"],
            },
            Integrations: {
              points: ["ERPNext core", "POS terminals", "E-commerce & delivery", "Reporting exports", "Identity & devices"],
            },
            Benefits: {
              points: ["Fewer handoffs", "Live operational picture", "Traceable failures"],
            },
          },
        },
        {
          id: "improve",
          title: "Improve after go-live",
          blurb: "Support and iteration as your operation learns.",
          tags: ["Support", "KPIs", "Iteration"],
          tabs: {
            Overview: {
              lead: "Launch is the midpoint—not the finish line.",
              problem: "Systems freeze while the business keeps changing.",
              solution: "Retained improvement with measurable outcomes.",
              points: ["Priority support", "KPI reviews", "Targeted enhancements"],
            },
            Benefits: {
              points: ["Compounding gains", "Lower friction", "Long-term partnership"],
            },
          },
        },
      ],
    },
    industries: {
      eye: "Industries",
      title: "Operating realities",
      items: [
        { id: "retail", title: "Retail & distribution", blurb: "Branches, pricing, purchasing, and channels in one flow.", tags: ["Branches", "POS", "Pricing"], tabs: { Overview: { lead: "Multi-branch retail that stays coherent from shelf to ledger.", solution: "Connected inventory, purchasing, pricing, and sales channels.", points: ["Branch stock", "Price lists", "POS & online", "Vendor flow"] }, Solutions: { points: ["ERPNext retail", "POS suite", "Offers & MRP", "Channel sync"] } } },
        { id: "manufacturing", title: "Manufacturing", blurb: "Materials, production, quality, and costing you can trust.", tags: ["BOM", "WIP", "Costing"], tabs: { Overview: { lead: "Production visibility without spreadsheet archaeology.", solution: "BOM-to-stock flows with reliable valuation.", points: ["BOMs & work orders", "Shop-floor handoffs", "Inventory valuation"] } } },
        { id: "services", title: "Professional services", blurb: "Projects, people, delivery, and billing aligned.", tags: ["Projects", "Time", "Billing"], tabs: { Overview: { lead: "Delivery and commercial ops on one system.", solution: "Projects, utilization, and invoicing connected.", points: ["Projects", "Timesheets", "Billing cycles"] } } },
        { id: "restaurants", title: "Restaurants & hospitality", blurb: "Outlets, recipes, inventory, and order channels.", tags: ["Outlets", "Recipes", "Orders"], tabs: { Overview: { lead: "Front-of-house demand tied to back-office control.", solution: "Outlet operations linked to ERP inventory and finance.", points: ["Recipe costing", "Outlet stock", "Order channels"] } } },
        { id: "ecommerce", title: "E-commerce", blurb: "Catalog, fulfillment, returns, and finance aligned.", tags: ["Catalog", "Orders", "Returns"], tabs: { Overview: { lead: "Commerce that does not fight warehouse and accounts.", solution: "Order-to-cash with stock truth.", points: ["Catalog sync", "Fulfillment", "Returns"] } } },
        { id: "logistics", title: "Logistics", blurb: "Warehouses, movements, and partner handoffs.", tags: ["WMS", "Transfers"], tabs: { Overview: { lead: "Movement clarity across sites and partners.", solution: "Warehouse operations with traceable transfers.", points: ["Multi-warehouse", "Transfers", "Partner links"] } } },
        { id: "healthcare", title: "Healthcare", blurb: "Operational workflows with careful process design.", tags: ["Ops", "Inventory"], tabs: { Overview: { lead: "Admin and supply workflows shaped to clinical constraints.", solution: "Scheduling, inventory, and reporting without forcing clinical templates.", points: ["Ops workflows", "Clinic inventory", "Reporting"] } } },
        { id: "other", title: "Other industries", blurb: "Unusual models welcome—start with bottlenecks.", tags: ["Discovery"], tabs: { Overview: { lead: "If templates fail, design from the operating reality.", solution: "Workshops → roadmap → build only what matters.", points: ["Discovery", "Phased plan", "Custom modules"] } } },
      ],
    },
    products: {
      eye: "Products",
      title: "Capability navigator",
      items: [
        { id: "erp", title: "ERP", blurb: "ERPNext as the operating backbone.", tags: ["Finance", "Stock", "Buying"], tabs: { Overview: { lead: "One foundation for finance, stock, buying, selling, and HR.", solution: "ERPNext implemented with controls and clarity.", points: ["Accounting", "Inventory", "Procurement", "CRM & selling"] }, Features: { points: ["Multi-company", "Cost centers", "Tax templates", "Period close discipline"] } } },
        { id: "pos", title: "POS", blurb: "Cashier-grade terminals with supervisor control.", tags: ["Shifts", "Offline", "Receipts"], tabs: { Overview: { lead: "Fast checkout that still protects stock, payments, and permissions.", solution: "Offline-capable POS with shift discipline.", points: ["Cashier UX", "Supervisor step-up", "Refunds", "Receipts"] }, Features: { points: ["Shift open/close", "Loyalty & vouchers", "Catalog sync", "Device enrollment"] } } },
        { id: "ai", title: "AI automation", blurb: "Governed assistants for operations—not toys.", tags: ["Tools", "Alerts", "Analysis"], tabs: { Overview: { lead: "AI inside your permission and audit model.", solution: "Assistants, schedules, and alerts grounded in business data.", points: ["Guided Q&A", "Scheduled analyses", "Operational alerts"] }, Features: { points: ["Tool governance", "Dashboards", "Saved analyses"] } } },
        { id: "bi", title: "Business intelligence", blurb: "Reports leaders can defend.", tags: ["Margin", "Stock", "Vendors"], tabs: { Overview: { lead: "Visibility with drill-through—not vanity charts.", solution: "Operational and financial reporting tied to source ledgers.", points: ["Margin views", "Stock health", "Vendor performance"] } } },
        { id: "mobile", title: "Mobile apps", blurb: "Sales, shopping, and field workflows.", tags: ["Android", "OAuth"], tabs: { Overview: { lead: "Client apps on a secure contract with the ERP.", solution: "Mobile surfaces for selling and service workflows.", points: ["Mobile sales", "Shopping", "Device auth"] } } },
        { id: "integrations", title: "Integrations", blurb: "Partners connected with retry and logs.", tags: ["API", "Webhook"], tabs: { Overview: { lead: "Integrations that fail loudly and recover cleanly.", solution: "Inbound/outbound sync with operational ownership.", points: ["Partner APIs", "Webhooks", "Retry & audit"] } } },
        { id: "custom", title: "Custom software", blurb: "Frappe apps when process is the product.", tags: ["DocTypes", "UX"], tabs: { Overview: { lead: "Build the exception—not a second ERP.", solution: "Focused modules that stay maintainable.", points: ["Custom DocTypes", "Automations", "Print packs"] } } },
        { id: "cloud", title: "Cloud & infrastructure", blurb: "Sites, backups, and delivery hygiene.", tags: ["Bench", "Backup"], tabs: { Overview: { lead: "Stable platforms for serious daily volume.", solution: "Hosting patterns, backups, and deploy discipline.", points: ["Bench ops", "Backups", "Safe deploys"] } } },
      ],
    },
    about: {
      eye: "About",
      title: "How Aimatic works",
      lead: "ERPNext is a powerful foundation. Aimatic adds process depth and custom engineering so the system feels built for your team—whether you operate in the US, Europe, the Middle East, or Pakistan.",
      steps: [
        ["01", "Discover", "People, processes, data, and the moments work slows down."],
        ["02", "Design", "A phased plan with priorities, owners, and outcomes."],
        ["03", "Deliver", "Configure, build, migrate, train, and launch with care."],
        ["04", "Improve", "Support and iteration after go-live."],
      ],
    },
    contact: {
      eye: "Contact",
      title: "Book a discovery call",
      lead: "Thirty minutes. No sales script. We prepare for your operating reality first.",
    },
  };

  let stack = [];
  let lastFocus = null;
  let touchX = 0;
  let touchY = 0;

  const esc = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  function parseHash() {
    return (location.hash || "#/").replace(/^#\/?/, "").split("/").filter(Boolean);
  }

  function toHash(parts) {
    return parts.length ? `#/${parts.join("/")}` : "#/";
  }

  function setDockHome(on) {
    app.querySelectorAll(".dock-item").forEach((el) => {
      const home = el.hasAttribute("data-nav");
      el.classList.toggle("is-active", on && home);
      if (on && home) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    });
  }

  function openUI() {
    app.classList.add("is-open");
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    sheet.hidden = false;
    setDockHome(false);
  }

  function closeUI() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    app.classList.remove("is-open");
    const done = () => {
      sheet.hidden = true;
      bodyEl.innerHTML = "";
      tabsEl.innerHTML = "";
      tabsEl.hidden = true;
      footEl.innerHTML = "";
      footEl.hidden = true;
    };
    reduceMotion ? done() : setTimeout(done, 340);
    setDockHome(true);
    lastFocus?.focus?.();
  }

  function footer(primaryLabel = "Book a call", showBack = false) {
    footEl.hidden = false;
    footEl.innerHTML = `${showBack ? `<button type="button" class="btn btn-ghost btn-sm" data-back>Back</button>` : ""}
      <button type="button" class="btn btn-primary btn-sm" data-open="contact">${esc(primaryLabel)}</button>`;
  }

  function renderTabs(names, current) {
    if (!names || names.length < 2) {
      tabsEl.hidden = true;
      tabsEl.innerHTML = "";
      return;
    }
    tabsEl.hidden = false;
    tabsEl.innerHTML = names
      .map(
        (n) =>
          `<button type="button" role="tab" aria-selected="${n === current}" data-tab="${esc(n)}">${esc(n)}</button>`
      )
      .join("");
  }

  function renderHub(key) {
    const hub = C[key];
    eyebrowEl.textContent = hub.eye;
    titleEl.textContent = hub.title;
    renderTabs(null);
    bodyEl.innerHTML = `<div class="hub-grid">${hub.items
      .map(
        (item, i) => `<button type="button" class="hub-card" data-open="${key}/${item.id}">
        <span class="idx">${String(i + 1).padStart(2, "0")}</span>
        <strong>${esc(item.title)}</strong>
        <p>${esc(item.blurb)}</p>
        <div class="tags">${(item.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </button>`
      )
      .join("")}</div>`;
    footer("Talk to us");
  }

  function renderItem(key, id, tabName) {
    const hub = C[key];
    const item = hub.items.find((x) => x.id === id);
    if (!item) return renderHub(key);
    const names = Object.keys(item.tabs || {});
    const tab = names.includes(tabName) ? tabName : names[0];
    const data = item.tabs[tab] || {};
    eyebrowEl.textContent = hub.eye;
    titleEl.textContent = item.title;
    renderTabs(names, tab);
    bodyEl.innerHTML = `<div class="detail">
      <div class="hero-band">
        <strong>${esc(data.lead || item.blurb)}</strong>
        ${data.solution ? `<p>${esc(data.solution)}</p>` : ""}
      </div>
      ${data.problem ? `<div class="block"><h3>Problem</h3><p>${esc(data.problem)}</p></div>` : ""}
      ${data.points ? `<div class="block"><h3>${esc(tab)}</h3><ul>${data.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>` : ""}
      ${data.stats ? `<div class="stat-row">${data.stats.map(([a, b]) => `<div class="stat"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>` : ""}
      <div class="tags">${(item.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
    </div>`;
    footer("Book a call", true);
  }

  function renderAbout() {
    const a = C.about;
    eyebrowEl.textContent = a.eye;
    titleEl.textContent = a.title;
    renderTabs(null);
    bodyEl.innerHTML = `<div class="detail">
      <div class="hero-band"><strong>${esc(a.lead)}</strong></div>
      <div class="steps">${a.steps
        .map(([n, t, d]) => `<article class="step"><i>${esc(n)}</i><div><strong>${esc(t)}</strong><p>${esc(d)}</p></div></article>`)
        .join("")}</div>
    </div>`;
    footer("Book a call");
  }

  function renderContact() {
    const c = C.contact;
    eyebrowEl.textContent = c.eye;
    titleEl.textContent = c.title;
    renderTabs(null);
    bodyEl.innerHTML = `<div class="detail">
      <div class="hero-band"><strong>${esc(c.lead)}</strong><p>Prefer email? <a href="mailto:hello@aimatic.tech" style="color:#8ef0d4;font-weight:700">hello@aimatic.tech</a></p></div>
      <form class="form" id="lead-form" data-mailto="hello@aimatic.tech">
        <label>Your name<input name="name" autocomplete="name" required placeholder="Alex Morgan"></label>
        <div class="form-row">
          <label>Work email<input type="email" name="email" autocomplete="email" required placeholder="alex@company.com"></label>
          <label>Company<input name="company" autocomplete="organization" required placeholder="Company"></label>
        </div>
        <label>What can we help with?
          <select name="need" required>
            <option value="" selected disabled>Select one</option>
            <option>ERPNext implementation</option>
            <option>Custom Frappe app</option>
            <option>Integration or automation</option>
            <option>POS / retail operations</option>
            <option>Support and optimization</option>
          </select>
        </label>
        <label>Context<textarea name="message" placeholder="What is changing in the business?"></textarea></label>
        <input class="trap" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="btn btn-primary" type="submit">Prepare my introduction <svg width="16" height="16" aria-hidden="true"><use href="#i-arrow"/></svg></button>
        <p class="form-status" id="lead-status" role="status" aria-live="polite"></p>
        <p class="form-note">We only use these details to respond to this enquiry.</p>
      </form>
    </div>`;
    footEl.hidden = true;
    footEl.innerHTML = "";
    wireForm();
  }

  function wireForm() {
    const form = bodyEl.querySelector("#lead-form");
    const status = bodyEl.querySelector("#lead-status");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      if (fd.get("website")) return;
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const company = String(fd.get("company") || "").trim();
      const need = String(fd.get("need") || "").trim();
      const message = String(fd.get("message") || "").trim();
      if (!name || !email || !company || !need) {
        status.classList.add("is-error");
        status.textContent = "Please complete the required fields.";
        return;
      }
      const subject = encodeURIComponent(`Aimatic discovery — ${company}`);
      const body = encodeURIComponent([`Name: ${name}`, `Email: ${email}`, `Company: ${company}`, `Need: ${need}`, "", message || "No extra detail."].join("\n"));
      status.classList.remove("is-error");
      status.textContent = "Opening your email client…";
      location.href = `mailto:${form.dataset.mailto}?subject=${subject}&body=${body}`;
    });
  }

  function render() {
    if (!stack.length) return closeUI();
    openUI();
    const top = stack[stack.length - 1];
    if (top === "about") return renderAbout();
    if (top === "contact") return renderContact();
    const [hub, item, tab] = top.split("/");
    if (C[hub]?.items) {
      if (item) return renderItem(hub, item, tab);
      return renderHub(hub);
    }
    stack = [];
    closeUI();
  }

  function navigate(parts, { push = true } = {}) {
    if (!parts.length || !C[parts[0]]) {
      stack = [];
      const hash = "#/";
      if (push) history.pushState({ stack }, "", hash);
      else history.replaceState({ stack }, "", hash);
      render();
      return;
    }

    const root = parts[0];
    const itemId = parts[1];
    const tabName = parts[2];
    const item = C[root].items?.find((i) => i.id === itemId);

    if (item) {
      const tab = item.tabs?.[tabName] ? tabName : null;
      stack = [root, tab ? `${root}/${item.id}/${tab}` : `${root}/${item.id}`];
    } else {
      stack = [root];
    }

    const hashParts = item
      ? [root, item.id].concat(item.tabs?.[tabName] ? [tabName] : [])
      : [root];
    const hash = toHash(hashParts);
    if (push) history.pushState({ stack }, "", hash);
    else history.replaceState({ stack }, "", hash);
    render();
    sheet.querySelector("[data-back]")?.focus();
  }

  function openRoute(route, push = true) {
    lastFocus = document.activeElement;
    navigate(route.split("/").filter(Boolean), { push });
  }

  function goHome(push = true) {
    lastFocus = document.activeElement;
    navigate([], { push });
  }

  function goBack() {
    if (stack.length > 1) {
      stack = stack.slice(0, -1);
      const top = stack[stack.length - 1];
      const parts = top.split("/");
      history.pushState({ stack }, "", toHash(parts));
      render();
      return;
    }
    goHome(true);
  }

  app.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) {
      e.preventDefault();
      openRoute(open.getAttribute("data-open"));
      return;
    }
    if (e.target.closest("[data-nav='home']")) {
      e.preventDefault();
      goHome(true);
      return;
    }
    if (e.target.closest("[data-back]")) {
      e.preventDefault();
      goBack();
      return;
    }
    if (e.target.closest("[data-close]")) {
      e.preventDefault();
      goHome(true);
      return;
    }
    const tab = e.target.closest("[data-tab]");
    if (tab && stack.length) {
      const top = stack[stack.length - 1];
      const [hub, item] = top.split("/");
      if (hub && item) {
        const next = `${hub}/${item}/${tab.getAttribute("data-tab")}`;
        stack[stack.length - 1] = next;
        history.replaceState({ stack }, "", toHash(next.split("/")));
        renderItem(hub, item, tab.getAttribute("data-tab"));
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && stack.length) {
      e.preventDefault();
      goBack();
    }
  });

  window.addEventListener("popstate", () => {
    const parts = parseHash();
    if (!parts.length) {
      stack = [];
      render();
      return;
    }
    navigate(parts, { push: false });
  });

  sheet.addEventListener("touchstart", (e) => {
    const t = e.changedTouches[0];
    touchX = t.clientX;
    touchY = t.clientY;
  }, { passive: true });

  sheet.addEventListener("touchend", (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchX;
    const dy = t.clientY - touchY;
    if (Math.abs(dx) < 70 && Math.abs(dy) < 70) return;
    const landscapePhone = window.matchMedia("(max-width: 979px) and (orientation: landscape)").matches;
    const mobileSheet = window.matchMedia("(max-width: 1099px)").matches && !window.matchMedia("(min-width: 980px) and (orientation: landscape)").matches;
    if (mobileSheet || landscapePhone) {
      if (dy > 90 && Math.abs(dy) > Math.abs(dx)) goBack();
    } else if (dx > 90 && Math.abs(dx) > Math.abs(dy)) {
      goBack();
    }
  }, { passive: true });

  function syncViewportUnit() {
    const h = window.visualViewport?.height || window.innerHeight;
    document.documentElement.style.setProperty("--vvh", `${h}px`);
    app.style.height = `${h}px`;
  }

  let orientTimer = 0;
  function onViewportChange() {
    syncViewportUnit();
    window.clearTimeout(orientTimer);
    orientTimer = window.setTimeout(() => {
      syncViewportUnit();
      // Force sheet to re-apply layout after rotate (transform axis can change).
      if (stack.length) {
        sheet.hidden = true;
        void sheet.offsetHeight;
        sheet.hidden = false;
        render();
      }
    }, 120);
  }

  syncViewportUnit();
  window.addEventListener("resize", onViewportChange, { passive: true });
  window.addEventListener("orientationchange", onViewportChange, { passive: true });
  window.visualViewport?.addEventListener("resize", onViewportChange, { passive: true });

  navigate(parseHash(), { push: false });
})();
