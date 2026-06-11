import * as React from "react";
import { type ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, GripVertical } from "lucide-react";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CardData, BrickId } from "@/lib/card-types";
import { DEFAULT_SECTION_ORDER } from "@/lib/card-types";
import {
  BRICK_META,
  VariantPicker,
  renderBrickBody,
  type BrickProps,
} from "@/components/builder/bricks";

interface BrickListProps {
  data: CardData;
  update: BrickProps["update"];
  setData: (d: CardData) => void;
  /** When true, only show the per-brick style picker (no content editor). */
  styleOnly?: boolean;
}

export function BrickList({ data, update, setData, styleOnly = false }: BrickListProps) {
  // Merge any new bricks added to DEFAULT_SECTION_ORDER that the user's saved order doesn't have yet
  const sectionOrder: BrickId[] = [
    ...data.sectionOrder,
    ...DEFAULT_SECTION_ORDER.filter((id) => !data.sectionOrder.includes(id)),
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = sectionOrder.indexOf(active.id as BrickId);
    const newIdx = sectionOrder.indexOf(over.id as BrickId);
    if (oldIdx < 0 || newIdx < 0) return;
    setData({ ...data, sectionOrder: arrayMove(sectionOrder, oldIdx, newIdx) });
  };

  const wrap = (id: BrickId, body: ReactNode): ReactNode => (
    <div className="space-y-4">
      <VariantPicker brick={id} data={data} update={update} />
      {!styleOnly && body}
    </div>
  );

  const renderBody = (id: BrickId): ReactNode => {
    const body = renderBrickBody(id, { data, update });
    if (id === "testimonials" || id === "theme") {
      return styleOnly ? <VariantPicker brick={id} data={data} update={update} /> : body;
    }
    return wrap(id, body);
  };

  const enabledOf = (id: BrickId): boolean | undefined => {
    switch (id) {
      case "actions":      return Object.values(data.actions).some(Boolean);
      case "vcard":        return data.vcardEnabled;
      case "stats":        return data.statsEnabled;
      case "about":        return data.aboutEnabled;
      case "video":        return data.videoEnabled;
      case "services":     return data.servicesEnabled;
      case "listings":     return data.listingsEnabled;
      case "gallery":      return data.galleryEnabled;
      case "testimonials": return data.testimonialsEnabled;
      case "calendar":     return data.calendarEnabled;
      case "languages":    return data.languagesEnabled;
      case "cta":          return data.ctaEnabled;
      case "contact":      return data.contactEnabled;
      case "socials":      return data.socialsEnabled;
      default:             return undefined;
    }
  };

  const toggleOf = (id: BrickId) => (v: boolean) => {
    switch (id) {
      case "actions":      update("actions", { call: v, whatsapp: v, email: v, website: v, rdv: v }); break;
      case "vcard":        update("vcardEnabled", v); break;
      case "stats":        update("statsEnabled", v); break;
      case "about":        update("aboutEnabled", v); break;
      case "video":        update("videoEnabled", v); break;
      case "services":     update("servicesEnabled", v); break;
      case "listings":     update("listingsEnabled", v); break;
      case "gallery":      update("galleryEnabled", v); break;
      case "testimonials": update("testimonialsEnabled", v); break;
      case "calendar":     update("calendarEnabled", v); break;
      case "languages":    update("languagesEnabled", v); break;
      case "cta":          update("ctaEnabled", v); break;
      case "contact":      update("contactEnabled", v); break;
      case "socials":      update("socialsEnabled", v); break;
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
        <Accordion type="single" collapsible defaultValue={sectionOrder[0]} className="space-y-3">
          {sectionOrder.map((id) => {
            const meta = BRICK_META[id];
            const alwaysOn = id === "identity" || id === "theme";
            return (
              <SortableBrick
                key={id}
                id={id}
                title={meta.title}
                subtitle={meta.subtitle}
                alwaysOn={alwaysOn}
                enabled={alwaysOn ? undefined : enabledOf(id)}
                onToggle={alwaysOn ? undefined : toggleOf(id)}
              >
                {renderBody(id)}
              </SortableBrick>
            );
          })}
        </Accordion>
      </SortableContext>
    </DndContext>
  );
}

function SortableBrick({
  id, title, subtitle, children, enabled, onToggle, alwaysOn,
}: {
  id: BrickId; title: string; subtitle?: string; children: ReactNode;
  enabled?: boolean; onToggle?: (v: boolean) => void; alwaysOn?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 30 : undefined,
  };
  return (
    <div ref={setNodeRef} style={style}>
      <AccordionItem value={id} className="border border-border rounded-2xl bg-card overflow-hidden data-[state=open]:shadow-[var(--shadow-elegant)]">
        <AccordionPrimitive.Header className="flex items-center pr-4">
          <button
            type="button"
            aria-label="Réordonner la brique"
            className="px-2 py-4 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing touch-none shrink-0"
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <AccordionPrimitive.Trigger className="flex-1 flex items-center justify-between px-1 py-4 cursor-pointer [&[data-state=open]>svg]:rotate-180">
            <div className="text-left">
              <div className="font-medium">{title}</div>
              {subtitle && <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 mr-2" />
          </AccordionPrimitive.Trigger>
          {alwaysOn ? (
            <span className="text-[10px] uppercase tracking-wider text-primary ml-2 shrink-0">Toujours actif</span>
          ) : (
            <Switch checked={!!enabled} onCheckedChange={onToggle} onClick={(e) => e.stopPropagation()} className="shrink-0" />
          )}
        </AccordionPrimitive.Header>
        <AccordionContent className="px-4 pb-5 pt-1">{children}</AccordionContent>
      </AccordionItem>
    </div>
  );
}
