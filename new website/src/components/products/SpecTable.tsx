import type { Product } from "@/types";

interface SpecTableProps {
  specs: Product["specs"];
}

export function SpecTable({ specs }: SpecTableProps) {
  return (
    <div className="space-y-6">
      {specs.map((group) => (
        <div key={group.group}>
          <h4 className="mb-3 font-semibold">{group.group}</h4>
          <dl className="divide-y rounded-lg border">
            {group.items.map((item) => (
              <div key={item.label} className="grid grid-cols-2 px-4 py-3 text-sm">
                <dt className="text-muted-foreground">{item.label}</dt>
                <dd className="font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
