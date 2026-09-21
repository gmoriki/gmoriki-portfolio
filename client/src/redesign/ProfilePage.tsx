import { Arrow, Footer, Navigation } from "./site";
import { sitePaths } from "./site-paths";
import { GreenTerm, ReadingScope, ScrollInk } from "./green-interactions";
import "./profile-page.css";

export function ProfilePage() {
  return (
    <div className="green-site">
      <a className="skip-link" href="#main">
        本文へ
      </a>
      <Navigation current="profile" />
      <main id="main" className="profile-page">
        <header className="profile-heading">
          <div className="profile-identity">
            <p className="profile-label">Profile</p>
            <h1>森木銀河</h1>
            <p className="profile-name">Ginga Moriki</p>
            <p className="profile-position">会社員 / gmoriki 代表</p>
          </div>
          <img
            className="profile-portrait"
            src="/redesign/portrait.webp"
            alt="森木銀河のポートレート"
            width="1600"
            height="1067"
            fetchPriority="high"
          />
          <ReadingScope className="profile-introduction">
            <p>
              会社員として生成AIの活用に携わりながら、個人事業gmorikiとして、大学・教育機関の
              <GreenTerm topic="learning">AI人材育成</GreenTerm>と
              <GreenTerm topic="governance">AIガバナンス</GreenTerm>
              を支援しています。
            </p>
            <p>
              私立大学の総務、国立大学でのデータ分析やシステム運用を経験してきました。大学で働く人の仕事を出発点に、研修や教材づくり、業務の試作、組織としてのルールづくりに取り組んでいます。
            </p>
          </ReadingScope>
        </header>

        <section
          className="profile-section profile-split"
          aria-labelledby="current-title"
        >
          <h2 id="current-title">
            <ScrollInk marker>現在の活動</ScrollInk>
          </h2>
          <div className="profile-current">
            <article className="profile-current-entry">
              <h3>会社員</h3>
              <p className="profile-role">生成AIの社内活用推進</p>
              <p>
                社内講師の育成やコミュニティ運営を通じて、社員が業務で生成AIを使えるよう支援しています。
              </p>
            </article>
            <article className="profile-current-entry">
              <h3>gmoriki</h3>
              <p className="profile-role">
                大学・教育機関のAI人材育成と活用支援
              </p>
              <ReadingScope>
                <p>
                  <GreenTerm topic="learning">教職員向けの研修・講演</GreenTerm>
                  、教材やWebツールの制作、AIガイドラインの策定支援に取り組んでいます。大学職員のためのプロンプトガイド「P4Us」など、実践から得た知見を公開しています。
                </p>
              </ReadingScope>
            </article>
            <article className="profile-current-entry">
              <h3>一橋大学</h3>
              <p className="profile-role">生成AI業務推進アドバイザー</p>
            </article>
            <article className="profile-current-entry">
              <h3>クロステック・マネジメント</h3>
              <p className="profile-role">AIガバナンス支援</p>
              <ReadingScope>
                <p>
                  瓜生山学園（京都芸術大学）の
                  <GreenTerm topic="governance">AIガバナンス</GreenTerm>
                  を支援しています。
                </p>
              </ReadingScope>
            </article>
          </div>
        </section>

        <section
          className="profile-section profile-split"
          aria-labelledby="approach-title"
        >
          <h2 id="approach-title">
            <ScrollInk>大切にしていること</ScrollInk>
          </h2>
          <div className="profile-prose">
            <p>
              大学で働く人には、教育・事務・経営、それぞれの専門性があります。その仕事のなかでAIを使い、試しながら、自分たちなりの使い方を見つけていくことを大切にしています。
            </p>
            <p>
              AIを使う人が一人で判断や責任を抱え込まないように、組織が試せる環境や相談・振り返りの仕組みを整えることも大切にしています。実際に使えるガイドラインと、それを見直していく体制を含めて、大学とAIの接点を考えています。
            </p>
            <div className="profile-reading">
              <a
                href="https://note.com/pogohopper8/n/n104fd0146499"
                target="_blank"
                rel="noreferrer"
              >
                <span>「非エンジニア」は誰のための言葉なのか</span>
                <Arrow diagonal />
              </a>
              <a
                href="https://note.com/pogohopper8/n/ne38a1584eac6"
                target="_blank"
                rel="noreferrer"
              >
                <span>大学職員のための生成AI最前線はAIガバナンスである</span>
                <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>

        <section
          className="profile-section profile-split"
          aria-labelledby="personal-title"
        >
          <h2 id="personal-title">
            <ScrollInk>
              <span className="profile-keep-words">少し、</span>
              <wbr />
              <span className="profile-keep-words">個人的なこと</span>
            </ScrollInk>
          </h2>
          <div className="profile-prose">
            <p>佐賀県佐賀市出身。クジラとゾウ、走ることが好きです。</p>
            <p>
              大学では物理、大学院では理科教育を学びました。学生時代は京都産業大学の神山天文台サポートチームに参加し、観望会で地域の方に星や宇宙を解説していました。自分が学んだことを、周りの人にも届けたいと考えるようになった時期です。
            </p>
            <div className="profile-reading">
              <a
                href="https://www.kyoto-su.ac.jp/wr-campuslife/challenging/09.html"
                target="_blank"
                rel="noreferrer"
              >
                <span>学生時代のインタビュー — 京都産業大学</span>
                <Arrow diagonal />
              </a>
              <a
                href="https://note.com/pogohopper8/n/nf166cd100e39"
                target="_blank"
                rel="noreferrer"
              >
                <span>森木銀河の他己紹介 — note</span>
                <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>

        <section className="profile-section" aria-labelledby="career-title">
          <h2 id="career-title">
            <ScrollInk>これまでの歩み</ScrollInk>
          </h2>
          <div className="profile-career">
            <article className="profile-career-entry">
              <p className="profile-period">
                <span>2019年4月</span> — <span>2021年10月</span>
              </p>
              <div className="profile-entry-body">
                <h3>東京都市大学</h3>
                <p className="profile-role">
                  <span>世田谷キャンパス 総務部管理課</span>
                  <span>専任事務職員</span>
                </p>
                <p>
                  物品資産や施設の管理、補助金申請を担当。資産管理台帳の構築、データ集計の自動化に加え、新入職員研修の企画と講師にも携わりました。
                </p>
              </div>
            </article>
            <article className="profile-career-entry">
              <p className="profile-period">
                <span>2021年11月</span> — <span>2025年1月</span>
              </p>
              <div className="profile-entry-body">
                <h3>九州大学</h3>
                <p className="profile-role">
                  <span>インスティテューショナル・リサーチ室</span>
                  <span>学術推進専門員</span>
                </p>
                <p>
                  IR（大学の意思決定を支える情報の収集・分析）に従事。研究データの分析、教員業績・研究者情報システムの運用と更新、データ移行や外部データ連携を担当しました。
                </p>
                <p>
                  研究分野のネットワーク可視化や教員の研究時間の分析に加え、教職員向けの生成AI研修、研究支援職員向けのPython勉強会にも携わりました。
                </p>
              </div>
            </article>
            <article className="profile-career-entry">
              <p className="profile-period">
                <span>2024年5月</span> — <span>2025年1月</span>
              </p>
              <div className="profile-entry-body">
                <h3>愛媛大学</h3>
                <p className="profile-role">
                  <span>教育・学生支援機構 教育企画室</span>
                  <span>プロジェクトフェロー（兼任）</span>
                </p>
                <p>
                  生成AIに関する教職員研修の企画、調査研究、教材作成に携わりました。
                </p>
              </div>
            </article>
            <article className="profile-career-entry">
              <p className="profile-period">2025年2月 —</p>
              <div className="profile-entry-body">
                <h3>民間企業へ</h3>
                <p>
                  会社員として生成AIの活用に携わるとともに、個人での大学支援や制作・発信を続けています。
                </p>
              </div>
            </article>
          </div>
        </section>

        <section
          className="profile-section profile-split profile-education"
          aria-labelledby="education-title"
        >
          <h2 id="education-title">
            <ScrollInk>学歴</ScrollInk>
          </h2>
          <dl>
            <div>
              <dt>京都産業大学</dt>
              <dd>2013 — 2017</dd>
              <dd>理学部物理科学科 卒業／学士（理学）</dd>
            </div>
            <div>
              <dt>筑波大学大学院</dt>
              <dd>2017 — 2019</dd>
              <dd>教育研究科 教科教育専攻 理科教育コース 修了</dd>
              <dd>修士（教育学）</dd>
            </div>
          </dl>
        </section>

        <section
          className="profile-section profile-split profile-publications"
          aria-labelledby="publications-title"
        >
          <h2 id="publications-title">
            <ScrollInk>活動と公開物</ScrollInk>
          </h2>
          <div>
            <p>
              講演・研修の記録、執筆した記事、公開している資料やツールはWorksにまとめています。
            </p>
            <a className="text-link" href={`${sitePaths.works}#index`}>
              活動・公開物を見る
              <Arrow />
            </a>
            <a
              className="profile-external-link"
              href="https://researchmap.jp/gmoriki"
              target="_blank"
              rel="noreferrer"
            >
              researchmap
              <Arrow diagonal />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
