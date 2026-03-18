import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const stats = [
  { value: '14–18', label: 'Age range' },
  { value: '3+', label: 'Tech tracks' },
  { value: '100%', label: 'Project-based' },
  { value: '0→∞', label: 'No experience needed' },
];

const tracks = [
  { emoji: '🌐', track: 'Track 01', name: 'Web Development', desc: 'Build websites and web apps from scratch. Learn HTML, CSS, JavaScript, and React.', tags: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'] },
  { emoji: '📱', track: 'Track 02', name: 'Mobile Apps', desc: 'Design and build Android and iOS apps using Flutter. Deploy real apps to the Play Store.', tags: ['Flutter', 'Dart', 'Firebase', 'UI Design'] },
  { emoji: '🤖', track: 'Track 03', name: 'AI & Data', desc: 'Learn Python, data analysis, and build simple AI-powered tools using modern APIs.', tags: ['Python', 'Pandas', 'AI APIs', 'Projects'] },
];

const projects = [
  { thumb: '🛒', track: 'Web · Track 01', name: 'Local store ordering app', desc: 'A full-stack web app for a retailer to manage orders and inventory online.', students: '3 students · 6 weeks' },
  { thumb: '📚', track: 'Mobile · Track 02', name: 'Study planner app', desc: 'A Flutter app helping school students track study goals and revision schedules.', students: '2 students · 4 weeks' },
  { thumb: '📊', track: 'AI/Data · Track 03', name: 'Small business dashboard', desc: 'A data dashboard visualizing sales trends and customer insights for a small business owner.', students: '4 students · 8 weeks' },
];

const clientsInfo = [
  { icon: '💡', title: 'Talented & motivated teams', body: 'Handpicked students, mentor-supervised. Every project quality-checked before delivery.' },
  { icon: '⚡', title: 'Agile & fast delivery', body: '2-week sprints, regular demos, full transparency. No ghosting, no surprises.' },
  { icon: '🤝', title: 'Social impact at no extra cost', body: "Every project you hire us for directly funds a student's education and future." },
  { icon: '💰', title: 'Startup-friendly pricing', body: 'Quality software at a fraction of agency rates. Honest work, honest prices.' },
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [form, setForm] = useState({ role: 'student', name: '', email: '', phone: '', message: '' });
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ol-theme');
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ol-theme', theme);
  }, [theme]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const onScroll = () => {
      const current = sections.reduce((found, sec) => {
        if (window.scrollY >= sec.offsetTop - 140) return sec.id; return found;
      }, '');
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.08 });

    const animated = document.querySelectorAll('.ccard,.pcard,.vitem,.apt,.ccard2,.fstep');
    animated.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    try {
      await axios.post('/api/inquiries', form);
      setSubmitMessage('✓ Message sent! We will contact you soon.');
      setForm({ role: 'student', name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitMessage('⚠️ Something went wrong. Please try again later.');
      console.error(error);
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const themeIcon = useMemo(() => (theme === 'dark' ? '☀️' : '🌙'), [theme]);

  return (
    <>
      <nav>
        <a className="nav-logo" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <svg className="nav-icon" viewBox="0 0 36 36" fill="none"> ... </svg>
          optimizer<span className="lab">lab</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="#students" onClick={(e) => { e.preventDefault(); handleNavClick('students'); }} className={activeSection === 'students' ? 'active' : ''}>For Students</a></li>
          <li><a href="#clients" onClick={(e) => { e.preventDefault(); handleNavClick('clients'); }} className={activeSection === 'clients' ? 'active' : ''}>For Clients</a></li>
          <li><a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
        </ul>
        <div className="nav-right">
          <button className="theme-btn" onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} aria-label="Toggle theme" title="Switch dark / light mode">{themeIcon}</button>
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} aria-label="Toggle menu" onClick={() => setMenuOpen((v) => !v)}>
            <span></span><span></span><span></span>
          </button>
          <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Apply Now</a>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a>
        <a href="#students" onClick={(e) => { e.preventDefault(); handleNavClick('students'); }}>For Students</a>
        <a href="#clients" onClick={(e) => { e.preventDefault(); handleNavClick('clients'); }}>For Clients</a>
        <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>Projects</a>
        <a href="#contact" className="mob-cta" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Apply Now →</a>
      </div>

      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">Now enrolling · Cohort 01 · 2025</div>
          <h1>Where students become<br/><span className="accent">real builders</span></h1>
          <p className="hero-sub">We train students aged 14–18 in tech skills, then put them to work on actual software projects for real clients.</p>
          <div className="hero-actions">
            <button className="btn-p" onClick={() => handleNavClick('students')}>Join as a Student →</button>
            <button className="btn-o" onClick={() => handleNavClick('clients')}>Hire Our Team</button>
          </div>
          <div className="hero-stats">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <div className="stat-num">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="stag">About</div>
          <h2 className="st">Learn by doing.<br/>Ship real products.</h2>
          <p className="sd">OptimizerLab isn't a classroom. It's a launchpad where students solve real-world problems and build their portfolio.</p>
          <div className="about-grid">
            <div className="about-vis">
              <div className="fstep"><div className="snum p">01</div><div><div className="stit">Learn core skills</div><div className="sdes">Structured curriculum in web, mobile, or data</div></div></div>
              <div className="fstep"><div className="snum a">02</div><div><div className="stit">Join a project team</div><div className="sdes">Work alongside mentors on client projects</div></div></div>
              <div className="fstep"><div className="snum g">03</div><div><div className="stit">Ship & grow</div><div className="sdes">Deploy real software and build your portfolio</div></div></div>
            </div>
            <div className="about-pts">
              <div className="apt"><div className="pico pip">🧪</div><div><div className="ptit">Experimental learning</div><div className="pbod">Students build, break things, and fix them. Real projects demand real thinking.</div></div></div>
              <div className="apt"><div className="pico pig">🚀</div><div><div className="ptit">Career-ready graduates</div><div className="pbod">By completion, students have shipped real software with a portfolio that stands out.</div></div></div>
              <div className="apt"><div className="pico pia">🌍</div><div><div className="ptit">Built for India's next generation</div><div className="pbod">For ambitious school students across India who want more than marks.</div></div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="students">
        <div className="container">
          <div className="apill aps">For Students</div>
          <div className="stag">Courses & Programs</div>
          <h2 className="st">Pick your track.<br/>Build your future.</h2>
          <p className="sd">Three focused tracks for school students. No prior experience needed — just curiosity and drive.</p>
          <div className="cgrid">
            {tracks.map((t) => (
              <div className="ccard" key={t.name}>
                <span className="cemoji">{t.emoji}</span>
                <div className="ctrack">{t.track}</div>
                <div className="cname">{t.name}</div>
                <div className="cdesc">{t.desc}</div>
                <div className="ctags">{t.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="journey">
            <div className="jtit">Your journey at OptimizerLab</div>
            <div className="jsteps">
              {[
                { n: '01', title: 'Apply & Enroll', desc: 'Fill the form, pick your track' },
                { n: '02', title: 'Learn Fundamentals', desc: '8-week structured program' },
                { n: '03', title: 'Join a Project', desc: 'Work with real clients' },
                { n: '04', title: 'Graduate & Ship', desc: 'Portfolio + certificate' },
              ].map((item) => (
                <div className="jstep" key={item.n}>
                  <div className={`jdot d${item.n}`}>{item.n}</div>
                  <div className="jstit">{item.title}</div>
                  <div className="jsdes">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="clients">
        <div className="container">
          <div className="apill apc">For Clients</div>
          <div className="stag">Work With Us</div>
          <h2 className="st">Get software built.<br/>Empower the next gen.</h2>
          <p className="sd">Partner with OptimizerLab to get your projects built by supervised, talented student teams — at a fraction of the cost.</p>
          <div className="clintr">
            <div className="vlist">
              {clientsInfo.map((item) => (
                <div className="vitem" key={item.title}>
                  <div className="vico">{item.icon}</div>
                  <div>
                    <div className="vtit">{item.title}</div>
                    <div className="vbod">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="sbox">
              <div className="sboxt">// Services we offer</div>
              {[
                { name: 'Website development', badge: 'Available', style: 'bg' },
                { name: 'Mobile app (Android/iOS)', badge: 'Available', style: 'bg' },
                { name: 'Landing pages & portfolios', badge: 'Available', style: 'bg' },
                { name: 'Admin dashboards', badge: 'On request', style: 'ba' },
                { name: 'API integrations', badge: 'On request', style: 'ba' },
                { name: 'AI-powered tools', badge: 'Coming soon', style: 'bp' },
              ].map((service) => (
                <div className="sitem" key={service.name}>
                  <div className="siname">{service.name}</div>
                  <span className={`sbadge ${service.style}`}>{service.badge}</span>
                </div>
              ))}
              <button className="btn-p" style={{ display: 'block', textAlign: 'center', marginTop: 22 }} onClick={() => handleNavClick('contact')}>Get a quote →</button>
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <div className="stag">Projects Showcase</div>
          <h2 className="st">Real work.<br/>Real impact.</h2>
          <p className="sd">A glimpse of what our student teams build. Check back after Cohort 01 ships.</p>
          <div className="pgrid">
            {projects.map((project) => (
              <div className="pcard" key={project.name}>
                <div className="pthumb t1">{project.thumb}</div>
                <div className="pbody">
                  <div className="ptrack">{project.track}</div>
                  <div className="pname">{project.name}</div>
                  <div className="pdesc">{project.desc}</div>
                  <div className="pfoot"><span className="pstuds">{project.students}</span><a href="#" className="plink">Coming soon →</a></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-strip">
        <div>
          <h3>Ready to build something?</h3>
          <p>Whether you're a student who wants to learn, or a business that needs software — we're here.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn-p" onClick={() => handleNavClick('contact')}>Apply as Student</button>
          <button className="btn-o" style={{ borderColor: 'rgba(255,255,255,.3)', color: '#fff' }} onClick={() => handleNavClick('contact')}>Hire Our Team</button>
        </div>
      </div>

      <section id="contact">
        <div className="container">
          <div className="stag">Contact</div>
          <h2 className="st">Let's get started.</h2>
          <p className="sd">Fill in the form and we'll get back to you within 24 hours.</p>
          <div className="cgr">
            <form onSubmit={handleSubmit}>
              <div className="fgrp">
                <label>I am a...</label>
                <div className="rgroup">
                  {['student', 'client', 'parent'].map((roleItem) => (
                    <label className="rlabel" key={roleItem}>
                      <input
                        type="radio"
                        name="type"
                        value={roleItem}
                        checked={form.role === roleItem}
                        onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                      />
                      {roleItem === 'student' ? '🎓 Student' : roleItem === 'client' ? '💼 Client / Business' : '👨‍👩‍👧 Parent'}
                    </label>
                  ))}
                </div>
              </div>
              <div className="fgrp">
                <label>Full name</label>
                <input type="text" placeholder="Your name" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="fgrp">
                <label>Email address</label>
                <input type="email" placeholder="you@example.com" required value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="fgrp">
                <label>Phone number</label>
                <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
              </div>
              <div className="fgrp">
                <label>Message</label>
                <textarea placeholder="Tell us about yourself or your project idea..." value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} />
              </div>
              <button type="submit" className="btn-p" style={{ width: '100%', fontSize: 16, padding: 16 }}>{submitting ? 'Sending...' : 'Send message →'}</button>
              {submitMessage && <p style={{ marginTop: '10px', color: '#a8e5a1' }}>{submitMessage}</p>}
            </form>
            <div className="cinfo">
              <div className="ccard2"><div className="ccico">🌏</div><div className="cctit">Available Across India</div><div className="ccbod">In-person sessions locally, online programs available pan-India.</div></div>
              <div className="ccard2"><div className="ccico">⚡</div><div className="cctit">Fast response</div><div className="ccbod">We reply to every inquiry within 24 hours. Urgent quotes get same-day responses.</div></div>
              <div className="ccard2"><div className="ccico">🎓</div><div className="cctit">Cohort 01 opens soon</div><div className="ccbod">Apply now to be among the founding cohort and get early access pricing.</div></div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="fbrand">optimizer<span>lab</span></div>
        <div className="fcopy">© 2025 OptimizerLab. Built in India 🇮🇳</div>
        <div className="flinks">
          <a href="#students" onClick={(e) => { e.preventDefault(); handleNavClick('students'); }}>Students</a>
          <a href="#clients" onClick={(e) => { e.preventDefault(); handleNavClick('clients'); }}>Clients</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>Projects</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a>
        </div>
      </footer>
    </>
  );
}

export default App;
