/**
 * Ahmed Elsayed — Software Engineer Portfolio
 * Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('ae_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ae_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
      themeToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      themeToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMobile = document.getElementById('nav-mobile');

  if (mobileMenuBtn && navMobile) {
    mobileMenuBtn.addEventListener('click', () => {
      navMobile.classList.toggle('open');
    });

    // Close when clicking link
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
      });
    });
  }

  // 3. Technical Skills Filtering
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Case Studies Modal System
  const caseStudyData = {
    'reliq': {
      title: 'RELIQ Productions — Full E-Commerce Platform',
      role: 'Freelance Full Stack Developer (Remote) | Jul 2026 – Aug 2026',
      problem: 'A local fashion brand (RELIQ Productions) needed a dedicated, branded e-commerce storefront with customized product variants (colors/sizes), multi-channel payments, and role-based access without the high monthly subscription fees or operational constraints of generic SaaS platforms.',
      approach: 'Architected a decoupled, high-performance web solution featuring a .NET ASP.NET Core Web API backend paired with a custom responsive HTML/CSS/JavaScript storefront. Implemented a 4-tier Clean Architecture (Core, Shared, Infrastructure, API) to isolate business logic from database and presentation layers.',
      technologies: ['C#', 'ASP.NET Core Web API', 'Clean Architecture', 'JWT Authentication', 'HTML5/CSS3/JavaScript', 'Cash on Delivery', 'InstaPay Integration', 'AI Tools (Claude, Copilot)'],
      implementation: 'Engineered a modular RESTful backend handling: dynamic catalog with variant/stock control; persistent cart management; dual checkout workflows for Cash on Delivery and manual InstaPay transfers; secure JWT role-based authentication separating Customer privileges from Admin operations; and an administrative dashboard for catalog and inventory updates.',
      challenges: 'Coordinating seamless multi-attribute inventory tracking (size/color combinations) while keeping order calculation idempotent and maintaining zero latency across mobile shoppers. Addressed by isolating catalog domain models and using strict DTO mapping.',
      solution: 'Applied AI-assisted engineering practices (Claude, GitHub Copilot) to accelerate API endpoint generation and front-end scaffolding while rigorously reviewing architectural boundaries and test modularity.',
      result: 'Successfully launched and deployed the system to production at reliqproductions.com, providing the client with an independent, fast, and scalable online presence.'
    },
    'commerca': {
      title: 'Commerca — E-Commerce Platform',
      role: 'Software Engineer / Backend Developer',
      problem: 'Building e-commerce platforms repeatedly from scratch creates brittle codebases, inconsistent database access, and high maintenance costs when delivering custom solutions for different business clients.',
      approach: 'Designed a unified, enterprise-grade .NET e-commerce backend built strictly on Clean Architecture principles, employing the Repository Pattern, Unit of Work, and the Specification Pattern to decouple querying and transaction orchestration.',
      technologies: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'Specification Pattern', 'Repository & Unit of Work Patterns', 'REST API'],
      implementation: 'Developed a comprehensive core domain covering product catalog management, order processing pipelines, transaction boundaries via Unit of Work, and an administrative control panel. The Specification Pattern allowed composing complex filter criteria without polluting repository interfaces.',
      challenges: 'Avoiding N+1 query overhead and complex dynamic filtering in EF Core while maintaining clean abstraction layers.',
      solution: 'Crafted custom Specification evaluators that translate specifications directly into optimized LINQ expressions before EF Core compiles SQL Server queries.',
      result: 'Customized and deployed the platform for multiple client installations, owning the full delivery lifecycle from design and database provisioning to maintenance.'
    },
    'qualicode': {
      title: 'QualiCode — Code Style & Complexity Checker',
      role: 'Backend & ML Engineer (Graduation Project)',
      problem: 'Traditional linter tools often rely on naive regex patterns that produce false positives and fail to gauge underlying algorithmic time complexity and nested control structures.',
      approach: 'Built an intelligent hybrid static analysis platform combining Abstract Syntax Tree (AST) grammar parsing with Machine Learning models to inspect code semantics, style conformance, and computational complexity.',
      technologies: ['Python', 'Flask', 'Machine Learning', 'AST (Abstract Syntax Tree)', 'Static Code Analysis', 'RESTful API'],
      implementation: 'Constructed an AST parser to break down submitted source code into syntax nodes, enabling deep structural pattern extraction. Engineered classifiers for time complexity scoring and implemented deterministic rule checkers for naming conventions (camelCase vs. snake_case) and residual debug statements.',
      challenges: 'Handling syntax variability across diverse coding styles and computing accurate complexity signatures without executing untrusted user code.',
      solution: 'Leveraged AST node traversal depth and loop hierarchy to extract AST feature vectors safely in an isolated Python/Flask environment.',
      result: 'Delivered an accurate graduation project capable of providing developers with instant structural feedback, naming consistency reports, and algorithmic complexity estimations.'
    },
    'offshorup': {
      title: 'OffshorUp — CRM System & Web Platform',
      role: 'Backend Developer (Remote, USA) | Nov 2024 – Jan 2025',
      problem: 'A US-based client needed a performant landing website and integrated customer relationship management (CRM) backend delivered under tight remote timelines across time zones.',
      approach: 'Collaborated in an asynchronous Agile workflow, focusing on robust backend services and seamless CRM data capture.',
      technologies: ['Backend Development', 'CRM System', 'REST APIs', 'Agile / Scrum', 'Git'],
      implementation: 'Delivered CRM lead capture endpoints, customer data management routines, and reliable data synchronization for the client platform.',
      challenges: 'Encountered a scope conflict involving overlapping concurrent code edits among developers.',
      solution: 'Proposed a clear division of technical responsibilities, modularizing endpoints and Git feature branch workflows to eliminate merge conflicts and keep project delivery strictly on schedule.',
      result: 'Successfully completed and handed over the CRM and landing platform on schedule, meeting all cross-timezone client specifications.'
    }
  };

  const modalBackdrop = document.getElementById('case-study-modal');
  const modalContainer = document.getElementById('modal-case-study-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  document.querySelectorAll('.open-case-study').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const studyKey = btn.getAttribute('data-study');
      const data = caseStudyData[studyKey];
      if (!data) return;

      modalContainer.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <span class="project-badge" style="margin-bottom: 0.5rem; display: inline-block;">Detailed Engineering Case Study</span>
          <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-top: 0.25rem;">${data.title}</h2>
          <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-cyan); margin-top: 0.25rem;">${data.role}</p>
        </div>

        <div class="project-tech-tags" style="margin-bottom: 1.75rem;">
          ${data.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div class="case-study-step">
          <div class="case-study-label">1. Problem & Objectives</div>
          <p>${data.problem}</p>
        </div>

        <div class="case-study-step">
          <div class="case-study-label">2. Architectural Approach</div>
          <p>${data.approach}</p>
        </div>

        <div class="case-study-step">
          <div class="case-study-label">3. Technical Implementation</div>
          <p>${data.implementation}</p>
        </div>

        <div class="case-study-step">
          <div class="case-study-label">4. Engineering Challenges</div>
          <p>${data.challenges}</p>
        </div>

        <div class="case-study-step">
          <div class="case-study-label">5. Solution Strategy</div>
          <p>${data.solution}</p>
        </div>

        <div class="case-study-step" style="border-left-color: var(--accent-green);">
          <div class="case-study-label" style="color: var(--accent-green);">6. Measurable Result</div>
          <p>${data.result}</p>
        </div>
      `;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. Toast Notification & Copy Email
  const toast = document.getElementById('toast');
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = 'a_elsayed_f@icloud.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  });

  // 6. Contact Form Pre-fill Helper
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const subject = document.getElementById('contact-subject').value || 'Portfolio Inquiry';
      const message = document.getElementById('contact-message').value;

      const mailtoUrl = `mailto:a_elsayed_f@icloud.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(message + '\n\nSent by: ' + name)}`;
      window.location.href = mailtoUrl;
      showToast('Opening default email client...');
    });
  }

  // 7. Scroll Spy for Active Navigation Link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});
