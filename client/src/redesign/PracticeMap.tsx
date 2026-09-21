import { useId, useRef, useState } from "react";
import { works } from "../data/works-data";
import { prefectureGeometry } from "./map-data";
import "./practice-map.css";

// Region codes are explicit in the source records. No location is inferred
// from an institution name or from the place where an event was held.
export const practiceRegions = prefectureGeometry.flatMap(prefecture => {
  const records = works.filter(
    work => Number(work.prefectureCode) === prefecture.code
  );
  if (!records.length) return [];
  return [
    {
      code: prefecture.code,
      name:
        records.find(work => work.prefectureName)?.prefectureName ??
        prefecture.name,
      count: records.length,
      institutions: [
        ...new Set(
          records.flatMap(work => (work.university ? [work.university] : []))
        ),
      ],
    },
  ];
});

const regionsByCode = new Map<number, (typeof practiceRegions)[number]>(
  practiceRegions.map(region => [region.code, region])
);

export function PracticeMap({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (code: number | null) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const labelId = useId();
  const regionSelect = useRef<HTMLSelectElement>(null);
  const current = regionsByCode.get(hovered ?? focused ?? selected ?? -1);
  const selectedRegion = regionsByCode.get(selected ?? -1);

  const toggle = (code: number) => onSelect(selected === code ? null : code);

  return (
    <div className="practice-map">
      <div className="practice-map__canvas">
        <div
          className="practice-map__caption"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="practice-map__place">
            {current?.name ?? `${practiceRegions.length}都道府県`}
          </p>
          <p className="practice-map__context">
            {current ? `${current.count}件の活動記録` : "大学・機関との関わり"}
          </p>
          {current?.institutions.length ? (
            <p className="practice-map__institutions">
              {current.institutions.slice(0, 3).join("、")}
              {current.institutions.length > 3 ? " ほか" : ""}
            </p>
          ) : null}
        </div>

        <svg
          className="practice-map__drawing"
          viewBox="0 0 1000 1000"
          role="group"
          aria-label="関わりのある地域。緑の都道府県を選択して活動記録を絞り込めます。"
        >
          <g transform="matrix(1.028807, 0, 0, 1.028807, -47.544239, -28.806583)">
            <g transform="translate(6, 18)">
              {prefectureGeometry.map(prefecture => {
                const region = regionsByCode.get(prefecture.code);
                const active = selected === prefecture.code;
                return (
                  <g
                    key={prefecture.code}
                    transform={prefecture.transform}
                    className={`practice-map__prefecture${region ? " has-records" : ""}${active ? " is-selected" : ""}`}
                    data-prefecture={prefecture.code}
                    role={region ? "button" : undefined}
                    tabIndex={region ? 0 : undefined}
                    aria-label={
                      region
                        ? `${region.name}、${region.count}件の活動記録`
                        : undefined
                    }
                    aria-pressed={region ? active : undefined}
                    aria-hidden={region ? undefined : true}
                    onMouseEnter={
                      region ? () => setHovered(prefecture.code) : undefined
                    }
                    onMouseLeave={region ? () => setHovered(null) : undefined}
                    onFocus={
                      region ? () => setFocused(prefecture.code) : undefined
                    }
                    onBlur={region ? () => setFocused(null) : undefined}
                    onClick={region ? () => toggle(prefecture.code) : undefined}
                    onKeyDown={
                      region
                        ? event => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              toggle(prefecture.code);
                            }
                          }
                        : undefined
                    }
                  >
                    <title>{region?.name ?? prefecture.name}</title>
                    {prefecture.polygons.map((points, index) => (
                      <polygon key={index} points={points} />
                    ))}
                    {prefecture.paths.map((d, index) => (
                      <path key={index} d={d} />
                    ))}
                  </g>
                );
              })}
            </g>
          </g>
        </svg>
      </div>

      <p className="practice-map__legend">
        <span aria-hidden="true" />
        緑：活動記録に紐づく大学・機関の地域
      </p>
      <div className="practice-map__controls">
        <label className="practice-map__select-label" htmlFor={labelId}>
          <span>地域で絞り込む</span>
          <select
            ref={regionSelect}
            id={labelId}
            value={selected ?? ""}
            onChange={event =>
              onSelect(event.target.value ? Number(event.target.value) : null)
            }
          >
            <option value="">すべての地域</option>
            {practiceRegions.map(region => (
              <option key={region.code} value={region.code}>
                {region.name}（{region.count}）
              </option>
            ))}
          </select>
        </label>
        {selectedRegion ? (
          <button
            className="practice-map__reset"
            type="button"
            onClick={() => {
              onSelect(null);
              regionSelect.current?.focus();
            }}
          >
            絞り込みを解除 <span aria-hidden="true">×</span>
          </button>
        ) : (
          <p className="practice-map__hint">地図からも選べます。</p>
        )}
      </div>
    </div>
  );
}
