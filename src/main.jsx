import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, ChevronRight } from "lucide-react";
import abilityUnion from "../assets/figma-ability-union.svg";
import faqQuestionImage from "../assets/figma-faq-question-image.png";
import qrCodeImage from "../assets/figma-qr-code.png";
import testimonialTexture from "../assets/figma-testimonial-texture.svg";
import testimonialUnion from "../assets/figma-testimonial-union.svg";
import ShapeGrid from "./ShapeGrid";
import "./styles.css";

const navItems = [
  { label: "关于", href: "#home" },
  { label: "能力", href: "#ability" },
  { label: "作品", href: "#work" },
  { label: "联系", href: "#contact" },
];
const tags = Array.from({ length: 7 }, (_, index) => `个人标签`);

const abilityCards = [
  {
    title: "大字标题部分大字标题部分大字标题部分",
    text: "针对媒体反映的业务问题，快速梳理信息结构、交互路径与关键页面表达。",
  },
  {
    title: "大字标题部分大字标题部分大字标题部分",
    text: "从复杂业务场景中拆出稳定组件，让设计稿、研发实现和后续维护保持一致。",
  },
  {
    title: "大字标题部分大字标题部分大字标题部分",
    text: "关注真实落地边界，用清晰的状态、反馈和异常处理支撑产品体验。",
  },
];

const projects = [
  {
    number: "01",
    title: "大字标题部分大字标题部分",
    text: "项目一句话简短的文案说明，项目一句话简短的文案说明，项目一句话简短的文案说明，项目一句话简短的文案说明。",
  },
  {
    number: "02",
    title: "大字标题部分大字标题部分",
    text: "项目一句话简短的文案说明，项目一句话简短的文案说明，项目一句话简短的文案说明，项目一句话简短的文案说明。",
  },
  {
    number: "03",
    title: "大字标题部分大字标题部分",
    text: "项目一句话简短的文案说明，项目一句话简短的文案说明，项目一句话简短的文案说明，项目一句话简短的文案说明。",
  },
];

const faqs = ["问题问题", "问题问题", "问题问题", "问题问题", "问题问题", "问题问题"];

function getActiveSectionHash(probeY) {
  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  const contactElement = document.querySelector("#contact");

  if (contactElement && window.scrollY + window.innerHeight >= contactElement.offsetTop + 80) {
    return "#contact";
  }

  if (window.scrollY >= maxScrollY - 80) {
    return "#contact";
  }

  const sections = navItems
    .map((item) => ({ ...item, element: document.querySelector(item.href) }))
    .filter((item) => item.element);

  let activeHash = "#home";

  for (const item of sections) {
    const top = item.element.offsetTop;
    if (probeY >= top) {
      activeHash = item.href;
    }
  }

  return activeHash;
}

function Header() {
  const [activeHash, setActiveHash] = useState("#home");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isHeaderElevated, setIsHeaderElevated] = useState(false);

  useEffect(() => {
    const updateActiveHash = () => {
      const hash = window.location.hash || "#home";
      setActiveHash(hash === "#about" ? "#home" : hash);
    };

    updateActiveHash();
    window.addEventListener("hashchange", updateActiveHash);
    return () => window.removeEventListener("hashchange", updateActiveHash);
  }, []);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let ticking = false;

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - previousScrollY;
      const sectionProbeY = currentScrollY + window.innerHeight * 0.36;

      if (currentScrollY < 80 || delta < -8) {
        setIsHeaderVisible(true);
      } else if (delta > 8) {
        setIsHeaderVisible(false);
      }

      setIsHeaderElevated(currentScrollY > 120);
      setActiveHash(getActiveSectionHash(sectionProbeY));
      previousScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderVisibility);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateHeaderVisibility();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (event, href) => {
    if (href === "#home") {
      event.preventDefault();
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setActiveHash(href);
    setIsHeaderVisible(true);
  };

  return (
    <header className={`site-header ${isHeaderVisible ? "is-visible" : "is-hidden"} ${isHeaderElevated ? "is-elevated" : ""}`} aria-label="Primary navigation">
      <a className="logo" href="#home" aria-label="返回首页">
        LOGO
      </a>
      <nav className="nav-pills" aria-label="页面导航">
        {navItems.map((item) => (
          <a className={activeHash === item.href ? "active" : undefined} href={item.href} key={item.href} onClick={(event) => handleNavClick(event, item.href)}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="outline-button nav-button" href="#contact">
        预约演示
      </a>
    </header>
  );
}

function Button({ children, tone = "dark" }) {
  return (
    <a className={`button button-${tone} ${tone === "glass" ? "button-uiverse" : ""}`} href="#contact">
      <span>{children}</span>
    </a>
  );
}

function WorkButton() {
  return (
    <a className="button button-dark work-button" href="#contact">
      <span>前往查看</span>
      <ArrowRight size={24} strokeWidth={1.8} />
    </a>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <Header />
      <div className="hero-grid" aria-hidden="true">
        <ShapeGrid direction="diagonal" speed={0.19} squareSize={40} borderColor="#DDE1E8" hoverFillColor="rgba(22, 23, 25, 0.12)" hoverTrailAmount={3} />
      </div>
      <div className="safe hero-inner">
        <h1>
          <span>NEW</span>
          <span>FUTURE</span>
          <span>DEMENSION</span>
        </h1>
        <div className="hero-image" aria-label="个人图片占位" />
      </div>
    </section>
  );
}

function AbilitySection() {
  return (
    <section className="dark-section ability-section" id="ability">
      <div className="dark-shape ability-shape" aria-hidden="true">
        <img src={abilityUnion} alt="" />
      </div>
      <div className="safe ability-content">
        <p className="lead-copy">
          针对媒体反映的“婴幼儿纸尿裤甲酰胺问题”，市场监管总局、工业和信息化部、国家卫生健康委、国家疾控局高度重视，成立联合调查组核查婴幼儿纸尿裤甲酰胺有关问题，并依法依规处理。有关情况将及时公布。针对媒体反映的“婴幼儿纸尿裤甲酰胺问题”，市场监管总局、工业和信息化部、国家卫生健康委、国家疾控局高度重视，成立联合调查组核查婴幼儿纸尿裤甲酰胺有关问题，并依法依规处理。
        </p>
        <div className="ability-actions">
          <Button tone="light">预约演示</Button>
          <Button tone="glass">预约演示</Button>
        </div>
        <div className="tag-rail" aria-label="个人标签列表">
          <div className="tag-marquee-track">
            {[0, 1].map((groupIndex) => (
              <div className="tag-marquee-group" aria-hidden={groupIndex === 1 ? "true" : undefined} key={groupIndex}>
                {tags.map((tag, index) => (
                  <span key={`${groupIndex}-${tag}-${index}`}>{tag}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="ability-heading">
          <h2>大字标题部分大字标题部分大字标题部分大字标题部分</h2>
          <p>
            针对媒体反映的“婴幼儿纸尿裤甲酰胺问题”，市场监管总局、工业和信息化部、国家卫生健康委、国家疾控局高度重视，成立联合调查组核查婴幼儿纸尿裤甲酰胺有关问题，并依法依规处理。
          </p>
        </div>
        <div className="ability-card-grid">
          {abilityCards.map((card) => (
            <article className="ability-card" key={card.title + card.text}>
              <span className="ability-icon" />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectSection() {
  return (
    <section className="work-section" id="work">
      <div className="safe">
        <div className="work-heading">
          <h2>2026 大字标题部分</h2>
          <span>2026</span>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className={`project-row project-row-${index + 1}`} key={project.number}>
              <div className="project-copy">
                <span>{project.number}</span>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <WorkButton />
              </div>
              <div className="project-image" aria-label={`项目图片 ${project.number}`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="dark-section testimonial-section">
      <div className="dark-shape testimonial-shape" aria-hidden="true">
        <img src={testimonialUnion} alt="" />
      </div>
      <div className="testimonial-pattern" aria-hidden="true">
        <img src={testimonialTexture} alt="" />
      </div>
      <div className="safe testimonial-content">
        <h2>切实解决业务问题，成就更好的产品</h2>
        <div className="testimonial-layout">
          <div className="avatar-stack" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="quote-block">
            <h3>用户 · 标注组长</h3>
            <p>
              针对媒体反映的“婴幼儿纸尿裤甲酰胺问题”，市场监管总局、工业和信息化部、国家卫生健康委、国家疾控局高度重视，成立联合调查组核查婴幼儿纸尿裤甲酰胺有关问题，并依法依规处理。有关情况将及时公布。针对媒体反映的“婴幼儿纸尿裤甲酰胺问题”，市场监管总局、工业和信息化部、国家卫生健康委、国家疾控局高度重视。
            </p>
            <p>
              针对媒体反映的“婴幼儿纸尿裤甲酰胺问题”，市场监管总局、工业和信息化部、国家卫生健康委、国家疾控局高度重视。
            </p>
            <div className="quote-metrics">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <strong>98%</strong>
                  <span>某某某某某效率</span>
                </div>
              ))}
            </div>
            <small>数据源自某处某处数据源自某处某处</small>
          </div>
          <div className="quote-arrows" aria-hidden="true">
            <button type="button" aria-label="下一个">
              <ChevronRight size={36} />
            </button>
            <button type="button" aria-label="上一个">
              <ChevronRight size={36} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="faq-section" id="faq">
      <div className="safe faq-shell">
        <div className="faq-card faq-question-card">
          <h2>常见问题及解答</h2>
          <p>点击以下问题，可快速了解</p>
          <div className="faq-question-image" aria-hidden="true">
            <img src={faqQuestionImage} alt="" />
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <button className={index === 1 ? "selected" : undefined} type="button" key={`${faq}-${index}`}>
              {faq}
            </button>
          ))}
        </div>
        <div className="faq-answer" aria-label="答案内容区域" />
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="cta-section">
      <div className="safe cta-content">
        <h2>切实解决业务问题，成就更好的产品</h2>
        <a className="button button-light" href="#contact">
          下载 2026 作品集
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-section" id="contact">
      <div className="safe footer-content">
        <div className="qr-group">
          <div className="qr-box" aria-label="二维码">
            <div className="qr-image-crop">
              <img src={qrCodeImage} alt="" />
            </div>
          </div>
          <div className="contact-stack">
            <div>
              <span>邮箱</span>
              <a href="mailto:1191862457@qq.com">1191862457@qq.com</a>
            </div>
            <div>
              <span>手机号</span>
              <a href="tel:15759896020">157 5989 6020</a>
            </div>
          </div>
        </div>
        <p>UIUX Designer 77</p>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    const target = window.location.hash ? document.querySelector(window.location.hash) : null;
    target?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <main>
      <Hero />
      <AbilitySection />
      <ProjectSection />
      <TestimonialSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
