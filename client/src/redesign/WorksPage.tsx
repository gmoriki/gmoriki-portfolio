import { useMemo, useRef, useState } from "react";
import { editorialItems, type EditorialItem } from "./magazine-content";
import {
  activityRows,
  dateNumber,
  displayDate,
  indexRows,
} from "./activity-index";
import { PracticeMap, practiceRegions } from "./PracticeMap";
import { Arrow, Footer, Navigation } from "./site";
import { projects } from "./projects";
import { publishedSites } from "./published-sites";
import { GreenTerm, ReadingScope, ScrollInk } from "./green-interactions";
import "./works-page.css";

const feature = editorialItems.find(item => item.id === "note-ai-governance")!;
const storyOrder = [
  { id: "article-sentankyo-judgment", layout: "lead" },
  { id: "note-ai-training-development", layout: "side" },
  { id: "note-university-data-viewer", layout: "wide" },
  { id: "article-kyoiku-roundtable", layout: "inset" },
  { id: "article-college-management-ai", layout: "side" },
  { id: "note-p4us-2026", layout: "wide" },
  { id: "note-non-engineer", layout: "essay" },
  { id: "slides-ai-governance", layout: "standard" },
];
const stories = storyOrder.map(({ id, layout }) => ({
  item: editorialItems.find(item => item.id === id)!,
  layout,
}));

const years = [...new Set(indexRows.map(item => item.date.slice(0, 4)))]
  .sort()
  .reverse();
const kinds = [...new Set(indexRows.map(item => item.kind))];
const otherTools = indexRows.filter(
  item =>
    item.kind === "公開ツール" &&
    item.href &&
    !item.tags.includes("P4Us") &&
    !projects.some(project => project.href === item.href)
);

function Story({ item, layout }: { item: EditorialItem; layout: string }) {
  const typographic = item.id === "note-non-engineer" || !item.image;
  return (
    <article
      className={`journal-story journal-story--${layout}${typographic ? " typographic-story" : ""}`}
    >
      <a href={item.href} target="_blank" rel="noreferrer">
        {!typographic && (
          <div className="story-media">
            <img
              src={item.image}
              alt=""
              width="1280"
              height="720"
              loading="lazy"
            />
          </div>
        )}
        <p className="story-source">
          {item.source}
          <time dateTime={item.date}>{displayDate(item.date)}</time>
        </p>
        <h3>{item.shortTitle || item.title}</h3>
        <p className="story-description">{item.description}</p>
        <span className="story-read">
          {item.hrefLabel ||
            (item.kind === "slides"
              ? "資料を読む"
              : item.kind === "paper"
                ? "論文を読む"
                : "記事を読む")}
          <Arrow diagonal />
        </span>
      </a>
    </article>
  );
}

export function WorksPage() {
  const searchRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("");
  const [year, setYear] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const regionInfo = practiceRegions.find(item => item.code === region);
  const regionalActivities = activityRows
    .filter(item =>
      region === null ? item.kind === "講演・研修" : item.region === region
    )
    .sort((a, b) => dateNumber(b.date) - dateNumber(a.date));
  const filtered = useMemo(
    () =>
      indexRows.filter(
        item =>
          (!region || item.region === region) &&
          (!kind || item.kind === kind) &&
          (!year || item.date.startsWith(year)) &&
          `${item.title} ${item.source} ${item.regionName || ""} ${item.tags.join(" ")}`
            .toLocaleLowerCase()
            .includes(query.trim().toLocaleLowerCase())
      ),
    [region, kind, year, query]
  );
  function selectRegion(value: number | null) {
    setRegion(value);
    setVisibleCount(12);
  }
  function clearFilters() {
    setRegion(null);
    setQuery("");
    setKind("");
    setYear("");
    setVisibleCount(12);
  }
  return (
    <div className="green-site">
      <a className="skip-link" href="#main">
        本文へ
      </a>
      <Navigation current="works" />
      <main id="main" className="works-page">
        <header className="works-page-heading">
          <h1>
            <ScrollInk>Works</ScrollInk>
          </h1>
          <p>
            大学での研修から、日々の論考まで。
            <br />
            現場で考え、ひらいてきた記録。
          </p>
        </header>
        <nav className="works-chapters" aria-label="Worksの目次">
          <a href="#field">各地での活動</a>
          <a href="#journal">記事と講演資料</a>
          <a href="#tools">公開している道具</a>
          <a href="#index">一覧表</a>
        </nav>

        <article className="feature-story" id="governance">
          <a
            className="feature-image"
            href={feature.href}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/redesign/governance-detail.jpg"
              alt="大学組織のAIガバナンスを考える公開講演資料の一頁"
              width="1920"
              height="1080"
            />
          </a>
          <ReadingScope className="feature-copy">
            <p className="story-source">
              note<time dateTime={feature.date}>2026.05.09</time>
            </p>
            <h2>
              <a href={feature.href} target="_blank" rel="noreferrer">
                大学職員のための
                <br />
                生成AI最前線は
                <br />
                AIガバナンスである
              </a>
            </h2>
            <p>{feature.description}</p>
            <a
              className="text-link"
              href={feature.href}
              target="_blank"
              rel="noreferrer"
            >
              論考を読む
              <Arrow diagonal />
            </a>
          </ReadingScope>
        </article>

        <section
          className="field-section"
          id="field"
          aria-labelledby="field-title"
        >
          <div className="works-section-heading">
            <h2 id="field-title">
              <ScrollInk>各地で、ともに。</ScrollInk>
            </h2>
            <p>大学・機関との関わりを、地域からたどる。</p>
          </div>
          <div className="field-layout">
            <PracticeMap selected={region} onSelect={selectRegion} />
            <div className="field-stories">
              <h3>
                {regionInfo ? `${regionInfo.name}の活動` : "講演・研修の記録"}
              </h3>
              <div aria-live="polite">
                {regionalActivities.slice(0, 3).map(item => (
                  <article key={item.id}>
                    <p className="field-date">{displayDate(item.date)}</p>
                    <h4>{item.source}</h4>
                    <p>{item.title}</p>
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="field-source"
                      >
                        {item.hrefLabel || "公開資料"}
                        <Arrow diagonal />
                      </a>
                    )}
                  </article>
                ))}
              </div>
              <a
                className="text-link"
                href="#index"
                onClick={() => {
                  setQuery("");
                  setKind("");
                  setYear("");
                  setVisibleCount(12);
                }}
              >
                {regionInfo
                  ? `${regionInfo.name}の記録を表で見る`
                  : "すべての記録を表で見る"}
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section
          className="journal-section"
          id="journal"
          aria-labelledby="journal-title"
        >
          <div className="works-section-heading">
            <h2 id="journal-title">
              <ScrollInk marker>Journal</ScrollInk>
            </h2>
            <p>書いた論考、公開した講演資料。</p>
          </div>
          <div className="journal-spread">
            {stories.map(({ item, layout }) => (
              <Story key={item.id} item={item} layout={layout} />
            ))}
          </div>
        </section>

        <section
          className="tools-section"
          id="tools"
          aria-labelledby="tools-title"
        >
          <div className="works-section-heading">
            <h2 id="tools-title">
              <ScrollInk>使えるかたちに。</ScrollInk>
            </h2>
            <p>知恵を共有するために、公開している道具。</p>
          </div>
          <div className="tool-pair">
            {projects
              .filter(item => item.id !== "governance")
              .map(item => (
                <article id={item.id} key={item.id}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                    />
                    <h3>
                      {item.name}
                      <Arrow diagonal />
                    </h3>
                    <p>{item.description}</p>
                  </a>
                </article>
              ))}
          </div>
          <div className="tool-links">
            {otherTools.map(item => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {item.title}
                <Arrow diagonal />
              </a>
            ))}
          </div>
          <section
            className="sites-collection"
            id="sites"
            aria-labelledby="sites-title"
          >
            <ReadingScope className="sites-heading">
              <h3 id="sites-title">
                <ScrollInk>研修・講演のWebサイト</ScrollInk>
              </h3>
              <p>
                ChatGPT Sitesで制作した、実践と
                <GreenTerm topic="learning">学び</GreenTerm>のための教材。
              </p>
            </ReadingScope>
            <div className="sites-list">
              {publishedSites.map(site => (
                <article className="site-entry" key={site.id}>
                  <p className="site-context">{site.context}</p>
                  <div className="site-entry-body">
                    <h4>
                      <a href={site.href} target="_blank" rel="noreferrer">
                        {site.title}
                        <Arrow diagonal />
                      </a>
                    </h4>
                    <p className="site-description">{site.description}</p>
                    {site.access === "restricted" && (
                      <p className="site-access-note">
                        閲覧には許可されたアカウントでのログインが必要です。
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section
          className="index-section"
          id="index"
          aria-labelledby="index-title"
        >
          <div className="works-section-heading">
            <h2 id="index-title">
              <ScrollInk>Index</ScrollInk>
            </h2>
            <p>講演・研修・論考・資料・公開ツール・サイトを、一覧から。</p>
          </div>
          <div className="index-controls">
            <label className="index-search">
              キーワード
              <input
                ref={searchRef}
                type="search"
                placeholder="大学名・テーマなど"
                value={query}
                onChange={event => {
                  setQuery(event.target.value);
                  setVisibleCount(12);
                }}
              />
            </label>
            <label>
              種類
              <select
                value={kind}
                onChange={event => {
                  setKind(event.target.value);
                  setVisibleCount(12);
                }}
              >
                <option value="">すべて</option>
                {kinds.map(value => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label>
              年
              <select
                value={year}
                onChange={event => {
                  setYear(event.target.value);
                  setVisibleCount(12);
                }}
              >
                <option value="">すべて</option>
                {years.map(value => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="index-status">
            <p role="status">
              {regionInfo ? `${regionInfo.name} / ` : ""}
              {filtered.length}件
              {regionInfo && (
                <button
                  onClick={() => {
                    selectRegion(null);
                    searchRef.current?.focus();
                  }}
                >
                  地域を解除 ×
                </button>
              )}
            </p>
            {(query || kind || year || region) && (
              <button
                onClick={() => {
                  clearFilters();
                  searchRef.current?.focus();
                }}
              >
                条件をリセット
              </button>
            )}
            <span className="table-scroll-hint">
              横にスクロールして参照できます。
            </span>
          </div>
          <div
            ref={tableRef}
            className="index-table-scroll"
            role="region"
            aria-label="活動と公開物の一覧表"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">年月日</th>
                  <th scope="col">活動・公開物</th>
                  <th scope="col">大学・機関／掲載先</th>
                  <th scope="col">種類</th>
                  <th scope="col">地域</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, visibleCount).map(item => (
                  <tr key={item.id}>
                    <td>{displayDate(item.date)}</td>
                    <td>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer">
                          {item.title}
                          <Arrow diagonal />
                        </a>
                      ) : (
                        item.title
                      )}
                    </td>
                    <td>{item.source}</td>
                    <td>{item.kind}</td>
                    <td>{item.regionName || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!filtered.length && (
            <p className="index-empty">
              該当する記録がありません。キーワードや条件を変えてください。
            </p>
          )}
          {filtered.length > visibleCount && (
            <button
              className="index-more"
              onClick={() => {
                const nextCount = visibleCount + 20;
                setVisibleCount(nextCount);
                if (nextCount >= filtered.length) {
                  tableRef.current?.focus();
                }
              }}
            >
              続きを表示する
              <span>
                {Math.min(visibleCount, filtered.length)} / {filtered.length}
              </span>
            </button>
          )}
          <p className="index-note">
            2026年9月21日更新。日付は開催・納品・掲載日。公開ツールは紹介記事の公開日、公開サイトは初回登録日を含みます。研修の実施と、資料・関連記事・サイトの公開はそれぞれ掲載しています。
          </p>
        </section>
        <div className="works-contact">
          <p>
            大学のAI人材育成について、
            <br />
            一緒に考えてみませんか。
          </p>
          <a href="mailto:info@gmoriki.com">
            info@gmoriki.com
            <Arrow diagonal />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
