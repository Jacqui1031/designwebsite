import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Menu, Plus, SendHorizontal, Sparkle, X, Zap } from "lucide-react";
import "./styles.css";

const moroAssets = import.meta.glob("../assets/moro/*", { eager: true, import: "default" });
const img = (name) => moroAssets[`../assets/moro/${name}`] ?? `/assets/moro/${name}`;

const logos = [
  "IpS08a8YmwuqdTd9zIcX9ZQPaK4.svg",
  "BGtMcpJwFkJEDrFlAprtiyymg.svg",
  "AKZRPNgCsd4OZbYvHOBjyQZNZI.svg",
  "0VQEQmgp6rbHRxKq3tPqWMq0BA.svg",
  "AwiSX7bqaJZY6IseTcAAv9ERKU.svg",
  "wJzg8qjQHbrFpFyZlTJ1n0YXVU.svg",
];

const stats = [
  {
    value: "14",
    label: "Years in the game.",
    text: "A decade of building brands, launching products, and shipping clean, conversion-focused design.",
  },
  {
    value: "120+",
    label: "Happy clients.",
    text: "Long-term partnerships, repeat business, and glowing testimonials fuel what we do.",
  },
  {
    value: "$12M",
    label: "Raised for clients.",
    text: "Our work helped founders secure funding from pre-seed to Series A and beyond.",
  },
  {
    value: "190+",
    label: "Completed projects.",
    text: "Funding won through work delivered on time, on brand, and with intent.",
  },
];

const featuredProjects = [
  {
    title: "Elva.",
    tags: ["Visual identity", "E-commerce", "Messaging"],
    image: "5N4LamNkFZvmZVdY2vPKY1l9NQ.png",
    wide: true,
  },
  {
    title: "Howey.",
    tags: ["Brand identity", "Packaging", "Naming"],
    image: "d3TUVw8GT1po6eDbHtQgFDJwFU.png",
  },
  {
    title: "Sun flower tech.",
    tags: ["Brand identity", "Web design", "Messaging"],
    image: "75ifN8wBfQxjN6u6Bee9UT2Jq8.png",
  },
  {
    title: "Kyan ecommerce.",
    tags: ["Brand identity", "E-commerce", "Development"],
    image: "793mulLdGFDEHpAFmWc0es0aI.png",
  },
  {
    title: "Aure.",
    tags: ["Development", "Campaign", "Art direction"],
    image: "OLm5FVxsrKBd3qfPJX0AWlVs3g.png",
    wide: true,
  },
];

const services = [
  {
    title: "Branding",
    text: "We help brands look sharp, sound right, and work better online and off.",
  },
  {
    title: "PR & marketing",
    text: "Launch campaigns, content, positioning from press releases to product messaging.",
  },
  {
    title: "Web & app design",
    text: "Clean, considered, conversion-focused. Built around your business, not a template.",
  },
  {
    title: "Front-end development",
    text: "Framer, Webflow, or hand-coded. Every build is fast, responsive, and beautiful down to the last pixel.",
  },
];

const processSteps = [
  {
    title: "Discovery",
    items: ["Stakeholder interviews & briefing", "User & market research"],
  },
  {
    title: "Concept",
    items: ["Creative & strategic exploration", "Direction alignment"],
  },
  {
    title: "Execution",
    items: ["Concept refinement", "Design systems", "Iterative testing & QA"],
  },
  {
    title: "Launch",
    items: ["Rollout & support", "Post-launch optimisations"],
  },
];

const testimonials = [
  {
    quote: "Their questions were sharp, their ideas sharper. The result finally looks and feels like us.",
    name: "Jordan Peterson.",
    role: "Founder at Vest.",
    image: "USmeBmo9pvAgWhRIgiwaR66FHc.png",
  },
  {
    quote: "What we got was clarity, confidence, and a way to tell our story.",
    name: "Michelle Davis.",
    role: "Creative Director at Allora.",
    image: "zXii3RvFAmAY0h6N3QFKbLnPQY0.png",
  },
  {
    quote: "Moro helped us make decisions faster and gave the whole brand a stronger spine.",
    name: "Sam Harris.",
    role: "Head of Product at Fieldnotes.",
    image: "yXUiDiu1MOJvY2Kas4Otfd0hMbs.png",
  },
];

const team = [
  ["Lena Chen", "Brand Strategist", "j4uD6MRUunywEni46qm7kCmLhrg.png"],
  ["Maya Brooks", "Product Designer", "6ub2C2xBcwtkxIrtyACWK7r34iw.png"],
  ["Jonas Wilder", "Front-End Developer", "vLqANFXzQkcYA75haK86NPzVcbM.png"],
  ["Ashely Parks", "UX Researcher", "eREolZxOevfgJcmgff3UwGy298.png"],
  ["Theo Ramirez", "Developer", "slqvfe0ZgSH6YyzTXpktqPSVW0k.png"],
  ["Sienna Blake", "Content Strategist", "sKbGRWrxPimtoOyCjFOJ3Zm59jI.png"],
];

const faqs = [
  [
    "How long does a typical project take from kickoff to launch?",
    "Most projects take around 6 to 8 weeks, including discovery, concept, build, and launch.",
  ],
  [
    "What’s included in a monthly retainer, and how flexible is the scope?",
    "You get up to two active tasks at a time, fast turnarounds, and the option to pause or swap tasks whenever needed.",
  ],
  [
    "Can we switch from a one-off project to a retainer later on?",
    "Yes, you can switch at any time and any remaining project fees will be credited.",
  ],
  [
    "Who will be on our dedicated design team, and how will we collaborate day to day?",
    "You’ll work with a senior product designer and creative director, with communication handled through Slack, Figma, and quick weekly check-ins.",
  ],
  [
    "How is billing handled if we pause work, add scope, or need to scale up?",
    "Billing is monthly, and you can pause, add hours, or upgrade your plan whenever you need.",
  ],
];

const articles = [
  {
    title: "The anatomy of a strong brand launch.",
    excerpt: "Most companies treat branding like a reveal, but a new logo or shiny homepage is not enough.",
    author: "Gill Sans.",
    role: "Product designer.",
    image: "vuxH3BVTcxbSzCWtmoAcm1cANc.png",
  },
  {
    title: "The power of product design that gets out of the way.",
    excerpt: "The best interface choices feel obvious because the hard work already happened behind the scenes.",
    author: "Naomi Z.",
    role: "CFO.",
    image: "2jpmHKhVAy0qKEDji3qzmzn78.png",
  },
  {
    title: "The case for campaign-based marketing.",
    excerpt: "Strategy works harder when launch moments are built around a clear story and a real audience.",
    author: "John Johnson.",
    role: "CPA.",
    image: "T7KEc0AZsdPS4OgmPYc6RhKC1w.png",
  },
];

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 44, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

const staggerGroup = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.88, y: 26, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease },
  },
};

function Reveal({ children, className = "", amount = 0.25, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 44, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.78, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function DotTitle({ children, dark = false, className = "" }) {
  return <span className={`dot-title ${dark ? "dot-title-dark" : ""} ${className}`}>{children}</span>;
}

function Button({ children, light = false }) {
  return (
    <motion.a
      className={`button ${light ? "button-light" : ""}`}
      href="#contact"
      whileHover={{ y: -3, scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <span>{children}</span>
      <span className="button-icon">
        <Sparkle size={16} aria-hidden="true" />
      </span>
    </motion.a>
  );
}

function Divider({ label }) {
  return (
    <div className="section-divider" aria-hidden="true">
      <span />
      <strong>{label}</strong>
      <span />
    </div>
  );
}

function Header({ progress }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileLinks = [
    ["Home.", "#home"],
    ["Projects.", "#projects"],
    ["About.", "#about"],
    ["Blog.", "#blog"],
    ["Contact.", "#contact"],
  ];

  return (
    <header className="header">
      <nav className="nav-left" aria-label="Primary">
        <a href="#home">Home.</a>
        <a href="#projects">Projects.</a>
        <a href="#about">About.</a>
        <a href="#blog">Blog.</a>
      </nav>
      <a className="logo" href="#home" aria-label="moro home">
        moro.
      </a>
      <div className="nav-right">
        <a href="#x">X.</a>
        <a href="#ig">IG.</a>
        <a href="#be">BE.</a>
        <a href="#db">DB.</a>
        <a className="contact-tab" href="#contact">
          Contact
        </a>
        <motion.button
          type="button"
          className="mobile-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          whileTap={{ scale: 0.94 }}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </motion.button>
      </div>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(12px)" }}
            transition={{ duration: 0.34, ease }}
          >
            {mobileLinks.map(([label, href], index) => (
              <motion.a
                href={href}
                key={label}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: index * 0.04, ease }}
              >
                {label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const pillsScale = useTransform(scrollYProgress, [0, 0.08], [0.82, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.16], [0, -92]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.45]);
  const pillsY = useTransform(scrollYProgress, [0, 0.16], [0, 42]);

  return (
    <section className="hero" id="home">
      <motion.div className="hero-title" initial={{ opacity: 0.001 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>
        <motion.div className="hero-title-inner" style={{ y: titleY, opacity: titleOpacity }}>
          <DotTitle>design & strategy<br />with staying power.</DotTitle>
        </motion.div>
      </motion.div>
      <motion.div className="hero-pills" style={{ scale: pillsScale, y: pillsY }} variants={staggerGroup} initial="hidden" animate="visible">
        {["Brand identity", "PR & marketing", "Front-end development", "Web & app design"].map((pill) => (
          <motion.span key={pill} variants={popIn} whileHover={{ scale: 1.08, y: -3 }}>
            {pill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

function Stats() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 80, damping: 22, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 22, mass: 0.4 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const objectY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-45, 105]);
  const objectRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [-2, -2] : [-7, 5]);
  const objectScale = useTransform(scrollYProgress, [0, 0.4, 1], reduceMotion ? [1, 1, 1] : [0.92, 1, 1.08]);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const move = (event) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 34);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 24);
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <section className="stats" id="stats" ref={ref}>
      <motion.div className="stats-object-wrap" style={{ y: objectY }}>
        <motion.img
          className="stats-object"
          src={img("6OMZzRNulX2vcpu2dBOWvjMAlw.png")}
          alt=""
          aria-hidden="true"
          style={{ x: springX, y: springY, rotate: objectRotate, scale: objectScale }}
        />
      </motion.div>
      <motion.div className="stats-row" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        {stats.map((item, index) => (
          <motion.article
            className={`stat-card ${index === 1 || index === 2 ? "stat-glass" : ""}`}
            key={item.label}
            variants={popIn}
            whileHover={{ y: -12, scale: 1.018 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <strong>{item.value}</strong>
            <h2>{item.label}</h2>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function LogoStrip() {
  return (
    <section className="trusted">
      <Reveal className="trusted-copy" amount={0.35}>
        <p>
          <strong>Trusted by teams from early to established.</strong>
          <span> Built to support every stage.</span>
        </p>
        <p>
          We’ve worked with first-time founders and seasoned brand teams alike. Always with the same goal:
          bring clarity, raise the bar, and make it count.
        </p>
        <Button>See our work</Button>
      </Reveal>
      <motion.div className="logo-grid" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        {logos.map((logo, index) => (
          <motion.div
            className="logo-tile"
            key={logo}
            variants={popIn}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          >
            <motion.img
              src={img(logo)}
              alt=""
              animate={{ y: [0, index % 2 ? -4 : 4, 0] }}
              transition={{ duration: 4 + index * 0.25, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function FeaturedCase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const cardY = useTransform(scrollYProgress, [0, 1], [38, -24]);

  return (
    <section className="featured-case" id="projects" ref={ref}>
      <Divider label="*Featured case" />
      <motion.div className="case-logo" initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, ease }}>
        <img src={img("AwiSX7bqaJZY6IseTcAAv9ERKU.svg")} alt="Kyan logo" />
      </motion.div>
      <div className="case-grid">
        <motion.div className="case-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="tags">
            <span>Branding</span>
            <span>E-commerce</span>
            <span>Product design</span>
          </div>
          <h2>We redesigned Kyan’s entire e-commerce experience from strategy and structure to design and messaging.</h2>
          <p>
            After a deep dive into customer behavior and brand perception, <strong>we developed a fresh identity and
            rebuilt their online store with UX best practices,</strong> clear messaging, and a mobile-first approach.
          </p>
          <Button>See the project</Button>
        </motion.div>
        <motion.div className="case-media" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.img src={img("2jpmHKhVAy0qKEDji3qzmzn78.png")} alt="Kyan campaign close up" style={{ y: mediaY }} />
          <motion.div className="result-card" style={{ y: cardY }} whileHover={{ y: -8, scale: 1.025 }}>
            <span>Results.</span>
            <div>
              <p>Average order value.</p>
              <strong>{"$82 -> $107"}</strong>
            </div>
            <div>
              <p>Returning customers.</p>
              <strong>+70%</strong>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectMasonry() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["3%", "-5%"]);

  return (
    <section className="project-wall">
      <Divider label="Case studies" />
      <motion.div className="project-masonry" ref={trackRef} style={{ x }} variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {featuredProjects.map((project, index) => (
          <motion.article
            className={`project-card ${project.wide ? "project-card-wide" : ""}`}
            key={project.title}
            variants={fadeUp}
            whileHover={{ y: -12, rotate: index % 2 ? -0.7 : 0.7 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <h3>{project.title}</h3>
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <img src={img(project.image)} alt={`${project.title} project`} />
          </motion.article>
        ))}
      </motion.div>
      <div className="center-action">
        <Button>See more projects</Button>
      </div>
    </section>
  );
}

function Services() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 0.45, 1], [70, 0, -80]);

  return (
    <section className="services" ref={ref}>
      <motion.div style={{ y: titleY }}>
        <DotTitle dark>under the hood<br />moro.</DotTitle>
      </motion.div>
      <motion.div className="service-grid" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            variants={popIn}
            whileHover={{ y: -10, backgroundColor: "rgba(246, 246, 249, 0.045)" }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <span className="service-line" style={{ "--delay": `${index * 80}ms` }} />
          </motion.article>
        ))}
      </motion.div>
      <motion.div className="service-points" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
        {["Methodical process", "Research-informed decisions", "Scalable by default", "Collaborative checkpoints"].map(
          (point) => (
            <motion.span key={point} variants={fadeUp}>
              <Check size={15} aria-hidden="true" />
              {point}
            </motion.span>
          ),
        )}
      </motion.div>
      <Process />
    </section>
  );
}

function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });

  return (
    <div className="process" ref={ref}>
      <Divider label="Process" />
      <Reveal className="process-heading" amount={0.28}>
        <h2>A methodical, research driven process that delivers lasting outcomes.</h2>
        <p>
          Over time we refined a rigorous, collaborative approach that keeps teams aligned and drives measurable
          results. We aim for lasting impact, not just hand-offs.
        </p>
      </Reveal>
      <motion.div className="process-board" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <motion.div className="process-progress" style={{ scaleX }} />
        {processSteps.map((step, index) => (
          <motion.article key={step.title} style={{ "--step": index }} variants={fadeUp}>
            <h3>{step.title}</h3>
            {step.items.map((item, itemIndex) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.12 + itemIndex * 0.08, ease }}
              >
                {item}
              </motion.span>
            ))}
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="testimonials">
      <Divider label="Testimonials" />
      <Reveal className="split-heading" amount={0.35}>
        <h2>Clients share their experience.</h2>
        <p>
          Every project is a partnership, and the feedback we receive guides how we grow. Here’s what some of our
          collaborators had to say about working together.
        </p>
      </Reveal>
      <motion.div className="testimonial-row" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        {testimonials.map((item, index) => (
          <motion.article
            key={item.name}
            variants={popIn}
            whileHover={{ y: -10, scale: 1.018 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <img src={img(item.image)} alt={item.name} />
            <blockquote>“{item.quote}”</blockquote>
            <h3>{item.name}</h3>
            <p>{item.role}</p>
            <motion.span
              className="card-orbit"
              animate={{ rotate: 360 }}
              transition={{ duration: 18 + index * 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [65, -70]);

  return (
    <section className="about" id="about" ref={ref}>
      <Reveal amount={0.42}>
        <DotTitle>the<br />culture</DotTitle>
      </Reveal>
      <Divider label="About the founder" />
      <div className="about-grid">
        <Reveal className="about-copy" amount={0.25}>
          <p>
            Moro Lin is a fashion editor-turned-creative director shaping brands from the inside out. In 2019, she
            launched <strong>moro.</strong>, a New York design studio working at the intersection of culture and commerce.
          </p>
          <div>
            <h3>Editorial by nature.</h3>
            <h3>Clarity-obsessed.</h3>
            <h3>Led by gut.</h3>
          </div>
        </Reveal>
        <motion.img src={img("kyWcQ3zO6AVUCY1fLOEXH5CUgg.png")} alt="Moro Lin portrait" style={{ y: portraitY }} />
      </div>
      <Reveal amount={0.3}>
        <p className="about-long">
          Before launching the studio, Moro spent a decade inside the fashion industry directing shoots, editing stories,
          and building brands from the inside out. Today, moro. brings that same editorial instinct and high standard to
          the digital space, creating visual identities, websites, and content systems for style-driven brands around the
          world.
        </p>
      </Reveal>
    </section>
  );
}

function Team() {
  return (
    <section className="team">
      <Reveal className="split-heading" amount={0.35}>
        <h2>The people behind the work.</h2>
        <p>
          We’re a small, <strong>focused team of designers, writers, and developers</strong> who care deeply about what we make.
        </p>
      </Reveal>
      <motion.div className="team-row" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {team.map(([name, role, photo], index) => (
          <motion.article key={name} variants={fadeUp} whileHover={{ y: -10 }}>
            <img src={img(photo)} alt={name} />
            <h3>{name}</h3>
            <p>{role}</p>
            <span className="team-number">{String(index + 1).padStart(2, "0")}</span>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="pricing">
      <Reveal amount={0.4}>
        <DotTitle dark>your project,<br />your rules</DotTitle>
      </Reveal>
      <Divider label="Pricing" />
      <Reveal className="split-heading" amount={0.35}>
        <h2>The plan? It’s up to you.</h2>
        <p>We’ve got you covered. Whether you’re here for the long game or a sharp one-off.</p>
      </Reveal>
      <motion.div className="pricing-grid" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.28 }}>
        <motion.article className="price-card" variants={popIn} whileHover={{ y: -12, scale: 1.012 }}>
          <h3>One off project.</h3>
          <div className="price-list">
            <span>Landing page <strong>From $2000</strong></span>
            <span>Content strategy <strong>From $3,000</strong></span>
            <span>SEO foundations <strong>From $1,300</strong></span>
          </div>
          <p>Clear scope, set timeline. Ideal for one-off projects that need sharp execution without the long-term commitment.</p>
          <Button light>Get started</Button>
        </motion.article>
        <motion.article className="price-card featured" variants={popIn} whileHover={{ y: -12, scale: 1.012 }}>
          <h3>Monthly retainer.</h3>
          <strong className="price">$4520</strong>
          <span>Billed monthly.</span>
          <ul>
            <li>Up to 2 active requests at a time.</li>
            <li>Delivery within 48 hours per request.</li>
            <li>Pause or cancel anytime.</li>
            <li>Dedicated senior designer on every project.</li>
          </ul>
          <p>Flexible billing. Clear deliverables. Perfect for fast-moving brands that need consistent design on tap.</p>
          <Button>Get started</Button>
        </motion.article>
      </motion.div>
    </section>
  );
}

function FAQ() {
  const [openItem, setOpenItem] = useState(0);

  return (
    <section className="faq">
      <Divider label="FAQ" />
      <Reveal className="split-heading" amount={0.35}>
        <h2>The practical stuff.</h2>
        <p>Common questions on timelines, billing, and who you will partner with here.</p>
      </Reveal>
      <motion.div className="faq-list" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        {faqs.map(([question, answer], index) => (
          <motion.div className="faq-item" key={question} variants={fadeUp}>
            <button type="button" className="faq-question" onClick={() => setOpenItem(openItem === index ? -1 : index)}>
              {question}
              <motion.span animate={{ rotate: openItem === index ? 45 : 0 }} transition={{ duration: 0.24 }}>
                <Plus size={20} aria-hidden="true" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {openItem === index && (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease }}
                >
                  <p>{answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Blog() {
  return (
    <section className="blog" id="blog">
      <Divider label="Articles" />
      <Reveal amount={0.35}>
        <h2>Ideas worth sharing.<br />Insights worth keeping.</h2>
      </Reveal>
      <motion.div className="article-grid" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        {articles.map((article) => (
          <motion.article key={article.title} variants={popIn} whileHover={{ y: -10, scale: 1.012 }}>
            <img src={img(article.image)} alt="" />
            <div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <span>{article.author}</span>
              <small>{article.role}</small>
            </div>
          </motion.article>
        ))}
      </motion.div>
      <div className="center-action">
        <Button>See more articles</Button>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ringY = useTransform(scrollYProgress, [0, 1], [70, -45]);
  const heartY = useTransform(scrollYProgress, [0, 1], [110, -70]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.04]);

  return (
    <footer className="contact" id="contact" ref={ref}>
      <div className="contact-panel">
        <motion.div style={{ scale: titleScale }}>
          <DotTitle dark>let’s build<br />something great.</DotTitle>
        </motion.div>
        <Reveal amount={0.45}>
          <p><strong>Let’s talk about your next move.</strong> Whether it’s strategy, design, or both, we’re here to help.</p>
          <Button light>Contact</Button>
        </Reveal>
        <motion.img className="ring" src={img("hpVRtFbDqCNFTGeX6hD3glRb4.png")} alt="" aria-hidden="true" style={{ y: ringY }} />
        <motion.img className="heart" src={img("RRfRtljZLk9PyQrOgxfbAQSLqo.png")} alt="" aria-hidden="true" style={{ y: heartY }} />
      </div>
      <motion.div className="footer-grid" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        <form>
          <label htmlFor="email">Updates?</label>
          <span>Sign in to our newsletter.</span>
          <div>
            <input id="email" type="email" placeholder="jane@framer.com" aria-label="Email" />
            <button type="button" aria-label="Submit newsletter email">
              <SendHorizontal size={17} />
            </button>
          </div>
        </form>
        <nav aria-label="Site map">
          <a href="#home">Home.</a>
          <a href="#projects">Projects.</a>
          <a href="#about">About.</a>
          <a href="#blog">Blog.</a>
          <a href="#contact">Connect.</a>
        </nav>
        <nav aria-label="Social">
          <a href="#ig">IG.</a>
          <a href="#be">BE.</a>
          <a href="#db">DB.</a>
        </nav>
        <div>
          <p>Copyright 2025 moro. All rights reserved.</p>
          <a href="#terms">Terms of service.</a>
          <a href="#privacy">Privacy policy.</a>
        </div>
      </motion.div>
    </footer>
  );
}

function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const cursorX = useMotionValue(-80);
  const cursorY = useMotionValue(-80);
  const x = useSpring(cursorX, { stiffness: 420, damping: 34, mass: 0.22 });
  const y = useSpring(cursorY, { stiffness: 420, damping: 34, mass: 0.22 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return undefined;

    const move = (event) => {
      cursorX.set(event.clientX - 11);
      cursorY.set(event.clientY - 11);
    };
    const over = (event) => {
      setActive(
        !!event.target.closest(
          "a, button, .project-card, .stat-card, .price-card, .logo-tile, .team-row article, .testimonial-row article",
        ),
      );
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", over);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", over);
    };
  }, [cursorX, cursorY, reduceMotion]);

  if (reduceMotion) return null;

  return <motion.div className={`cursor-glow ${active ? "cursor-glow-active" : ""}`} style={{ x, y }} />;
}

function TemplateDock() {
  return (
    <motion.aside
      className="template-dock"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease }}
    >
      <motion.div className="dock-shell" whileHover="open" initial="closed" animate="closed">
        <motion.div
          className="dock-icon"
          variants={{
            closed: { width: 44 },
            open: { width: 184 },
          }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
        >
          <Zap size={19} aria-hidden="true" />
          <motion.span
            variants={{
              closed: { opacity: 0, x: 8 },
              open: { opacity: 1, x: 0 },
            }}
          >
            Get template
          </motion.span>
        </motion.div>
        <motion.a
          href="#projects"
          variants={{
            closed: { opacity: 0, y: 10, pointerEvents: "none" },
            open: { opacity: 1, y: 0, pointerEvents: "auto" },
          }}
          transition={{ duration: 0.24 }}
        >
          More templates
        </motion.a>
      </motion.div>
    </motion.aside>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.25 });

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoaded(true), 120);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main className={loaded ? "loaded" : ""}>
      <Header progress={progress} />
      <Hero />
      <Stats />
      <LogoStrip />
      <FeaturedCase />
      <ProjectMasonry />
      <Services />
      <Testimonials />
      <About />
      <Team />
      <Pricing />
      <FAQ />
      <Blog />
      <Contact />
      <TemplateDock />
      <CursorGlow />
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
