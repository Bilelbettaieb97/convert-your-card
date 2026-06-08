import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-CzSdGTqC.mjs";
import { S as Switch } from "./router-iu4mfZ5o.mjs";
import { f as useSensors, h as useSensor, D as DndContext, i as closestCenter, j as KeyboardSensor, P as PointerSensor } from "../_libs/dnd-kit__core.mjs";
import { S as SortableContext, v as verticalListSortingStrategy, a as arrayMove, s as sortableKeyboardCoordinates, u as useSortable } from "../_libs/dnd-kit__sortable.mjs";
import { C as CSS } from "../_libs/dnd-kit__utilities.mjs";
import { B as BRICK_META, r as renderBrickBody, V as VariantPicker } from "./bricks-CfDa81Z1.mjs";
import { aV as GripVertical } from "../_libs/lucide-react.mjs";
function BrickList({ data, update, setData, styleOnly = false }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const onDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = data.sectionOrder.indexOf(active.id);
    const newIdx = data.sectionOrder.indexOf(over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    setData({ ...data, sectionOrder: arrayMove(data.sectionOrder, oldIdx, newIdx) });
  };
  const wrap = (id, body) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(VariantPicker, { brick: id, data, update }),
    !styleOnly && body
  ] });
  const renderBody = (id) => {
    const body = renderBrickBody(id, { data, update });
    if (id === "testimonials" || id === "theme") {
      return styleOnly ? /* @__PURE__ */ jsxRuntimeExports.jsx(VariantPicker, { brick: id, data, update }) : body;
    }
    return wrap(id, body);
  };
  const enabledOf = (id) => {
    switch (id) {
      case "actions":
        return Object.values(data.actions).some(Boolean);
      case "vcard":
        return data.vcardEnabled;
      case "stats":
        return data.statsEnabled;
      case "about":
        return data.aboutEnabled;
      case "video":
        return data.videoEnabled;
      case "services":
        return data.servicesEnabled;
      case "listings":
        return data.listingsEnabled;
      case "testimonials":
        return data.testimonialsEnabled;
      case "calendar":
        return data.calendarEnabled;
      case "languages":
        return data.languagesEnabled;
      case "cta":
        return data.ctaEnabled;
      case "contact":
        return data.contactEnabled;
      case "socials":
        return data.socialsEnabled;
      default:
        return void 0;
    }
  };
  const toggleOf = (id) => (v) => {
    switch (id) {
      case "actions":
        update("actions", { call: v, whatsapp: v, email: v, website: v });
        break;
      case "vcard":
        update("vcardEnabled", v);
        break;
      case "stats":
        update("statsEnabled", v);
        break;
      case "about":
        update("aboutEnabled", v);
        break;
      case "video":
        update("videoEnabled", v);
        break;
      case "services":
        update("servicesEnabled", v);
        break;
      case "listings":
        update("listingsEnabled", v);
        break;
      case "testimonials":
        update("testimonialsEnabled", v);
        break;
      case "calendar":
        update("calendarEnabled", v);
        break;
      case "languages":
        update("languagesEnabled", v);
        break;
      case "cta":
        update("ctaEnabled", v);
        break;
      case "contact":
        update("contactEnabled", v);
        break;
      case "socials":
        update("socialsEnabled", v);
        break;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: data.sectionOrder, strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, defaultValue: data.sectionOrder[0], className: "space-y-3", children: data.sectionOrder.map((id) => {
    const meta = BRICK_META[id];
    const alwaysOn = id === "identity" || id === "theme";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SortableBrick,
      {
        id,
        title: meta.title,
        subtitle: meta.subtitle,
        alwaysOn,
        enabled: alwaysOn ? void 0 : enabledOf(id),
        onToggle: alwaysOn ? void 0 : toggleOf(id),
        children: renderBody(id)
      },
      id
    );
  }) }) }) });
}
function SortableBrick({
  id,
  title,
  subtitle,
  children,
  enabled,
  onToggle,
  alwaysOn
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 30 : void 0
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: setNodeRef, style, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: id, className: "border border-border rounded-2xl bg-card overflow-hidden data-[state=open]:shadow-[var(--shadow-elegant)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center pr-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "aria-label": "Réordonner la brique",
          className: "px-2 py-4 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing touch-none",
          ...attributes,
          ...listeners,
          onClick: (e) => e.stopPropagation(),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "flex-1 px-1 py-4 hover:no-underline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: title }),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: subtitle })
      ] }) }),
      alwaysOn ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-primary ml-2", children: "Toujours actif" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: !!enabled, onCheckedChange: onToggle, onClick: (e) => e.stopPropagation() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "px-4 pb-5 pt-1", children })
  ] }) });
}
export {
  BrickList as B
};
