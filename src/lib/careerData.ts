import type { Resource, SkillCategory } from '@/types';

interface CareerDomain {
  keywords: string[];
  rootSkills: string[];
  technicalSkills: { name: string; level: number; category: SkillCategory; difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'; time: string; prereqs: string[]; skills: string[]; resources: Resource[] }[];
  domainSkills: { name: string; level: number; category: SkillCategory; difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'; time: string; prereqs: string[]; skills: string[]; resources: Resource[] }[];
  tools: { name: string; level: number; category: SkillCategory; difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'; time: string; prereqs: string[]; skills: string[]; resources: Resource[] }[];
  softSkills: { name: string; level: number; category: SkillCategory; difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'; time: string; prereqs: string[]; skills: string[]; resources: Resource[] }[];
  portfolioProjects: { name: string; level: number; category: SkillCategory; difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'; time: string; prereqs: string[]; skills: string[]; resources: Resource[] }[];
  careerSteps: { name: string; level: number; category: SkillCategory; difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'; time: string; prereqs: string[]; skills: string[]; resources: Resource[] }[];
}

const r = (title: string, type: Resource['type'], description: string): Resource => ({ title, type, description });

export const careerDomains: Record<string, CareerDomain> = {
  'software-engineer': {
    keywords: ['software', 'developer', 'engineer', 'programmer', 'coder', 'fullstack', 'full stack', 'full-stack', 'backend', 'frontend', 'web developer', 'swe'],
    rootSkills: ['Programming Fundamentals'],
    technicalSkills: [
      {
        name: 'Data Structures & Algorithms',
        level: 1, category: 'technical', difficulty: 'intermediate', time: '8-12 weeks',
        prereqs: ['programming-fundamentals'],
        skills: ['Arrays & Strings', 'Hash Tables', 'Trees & Graphs', 'Dynamic Programming', 'Big-O Analysis'],
        resources: [r('Data Structures & Algorithms Specialization', 'course', 'Coursera UC San Diego DSA specialization'), r('LeetCode', 'practice', 'Daily practice problems sorted by pattern'), r('Cracking the Coding Interview', 'book', 'Classic interview prep book by Gayle McDowell')],
      },
      {
        name: 'Version Control with Git',
        level: 1, category: 'technical', difficulty: 'beginner', time: '2-3 weeks',
        prereqs: ['programming-fundamentals'],
        skills: ['Git Basics', 'Branching & Merging', 'Pull Requests', 'Conflict Resolution', 'GitHub Workflow'],
        resources: [r('Git & GitHub Crash Course', 'video', 'FreeCodeCamp Git tutorial'), r('Pro Git Book', 'book', 'Official free Pro Git book by Scott Chacon')],
      },
      {
        name: 'Frontend Development',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '10-14 weeks',
        prereqs: ['data-structures', 'version-control'],
        skills: ['HTML5 & CSS3', 'JavaScript ES6+', 'React or Vue', 'Responsive Design', 'State Management', 'API Integration'],
        resources: [r('The Odin Project', 'course', 'Free full-stack curriculum with projects'), r('React Documentation', 'article', 'Official React docs with interactive tutorials'), r('Build a Personal Portfolio Site', 'project', 'Create a responsive portfolio with React')],
      },
      {
        name: 'Backend Development',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '10-14 weeks',
        prereqs: ['data-structures', 'version-control'],
        skills: ['REST APIs', 'Databases (SQL/NoSQL)', 'Authentication', 'Server Framework', 'API Design'],
        resources: [r('Node.js and Express', 'course', 'Full OpenAPI backend course'), r('Designing Data-Intensive Applications', 'book', 'Martin Kleppmann deep dive on backend systems'), r('Build a REST API with CRUD', 'project', 'Build and deploy a production API')],
      },
      {
        name: 'System Design',
        level: 3, category: 'technical', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['frontend-dev', 'backend-dev'],
        skills: ['Scalability', 'Load Balancing', 'Caching', 'Microservices', 'Message Queues', 'Database Sharding'],
        resources: [r('System Design Primer', 'article', 'Open-source system design guide on GitHub'), r('System Design Interview Vol 1 & 2', 'book', 'Alex Xu system design books'), r('Design a URL Shortener', 'project', 'Classic system design exercise')],
      },
      {
        name: 'Cloud & DevOps',
        level: 3, category: 'tools', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['system-design'],
        skills: ['AWS/Azure/GCP', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring'],
        resources: [r('AWS Certified Solutions Architect', 'course', 'Adrian Cantrill AWS course'), r('Docker Deep Dive', 'book', 'Nigel Poulton Docker guide'), r('Deploy a Containerized App', 'project', 'Dockerize and deploy to cloud')],
      },
    ],
    domainSkills: [
      {
        name: 'Testing & QA',
        level: 2, category: 'domain', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['frontend-dev', 'backend-dev'],
        skills: ['Unit Testing', 'Integration Testing', 'E2E Testing', 'Test-Driven Development', 'Code Coverage'],
        resources: [r('Testing JavaScript', 'course', 'Kent C. Dodds testing course'), r('Test-Driven Development by Example', 'book', 'Kent Beck TDD book')],
      },
      {
        name: 'Security Best Practices',
        level: 3, category: 'domain', difficulty: 'advanced', time: '4-6 weeks',
        prereqs: ['backend-dev'],
        skills: ['OWASP Top 10', 'Authentication Patterns', 'Input Validation', 'HTTPS/TLS', 'Security Auditing'],
        resources: [r('Web Security Academy', 'course', 'PortSwigger free security labs'), r('The Web Application Hackers Handbook', 'book', 'Comprehensive web security guide')],
      },
    ],
    tools: [
      {
        name: 'Development Tools',
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-3 weeks',
        prereqs: ['version-control'],
        skills: ['VS Code', 'Debugging', 'Terminal/CLI', 'Package Managers', 'Linting & Formatting'],
        resources: [r('VS Code Tips & Tricks', 'video', 'Official VS Code productivity guide'), r('Linux Command Line', 'course', 'Linux Journey free CLI course')],
      },
    ],
    softSkills: [
      {
        name: 'Communication & Collaboration',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['version-control'],
        skills: ['Technical Writing', 'Code Review', 'Pair Programming', 'Agile/Scrum', 'Stakeholder Communication'],
        resources: [r('The Pragmatic Programmer', 'book', 'Hunt & Thomas classic on software craftsmanship'), r('Agile Methodology Guide', 'article', 'Atlassian Agile guide')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Full-Stack Web Application',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '4-8 weeks',
        prereqs: ['frontend-dev', 'backend-dev', 'testing'],
        skills: ['Project Architecture', 'Database Design', 'User Authentication', 'Deployment', 'Documentation'],
        resources: [r('Build a SaaS Application', 'project', 'Build a complete SaaS with auth, payments, and deployment'), r('README Template Guide', 'article', 'How to write great project documentation')],
      },
    ],
    careerSteps: [
      {
        name: 'Interview Preparation',
        level: 3, category: 'career', difficulty: 'advanced', time: '4-8 weeks',
        prereqs: ['system-design', 'data-structures'],
        skills: ['Behavioral Interviews', 'Technical Interviews', 'System Design Interviews', 'Resume Optimization', 'LinkedIn Presence'],
        resources: [r('Tech Interview Handbook', 'article', 'Yangshun Tay open-source interview guide'), r('Mock Interviews', 'practice', 'Practice with peers on pramp.com or interviewing.io'), r('STAR Method Guide', 'article', 'Behavioral interview response framework')],
      },
      {
        name: 'Job Search & Networking',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['interview-prep'],
        skills: ['Networking', 'Open Source Contributions', 'Tech Community Participation', 'Personal Branding', 'Salary Negotiation'],
        resources: [r('Tech Meetups & Conferences', 'article', 'Find local and virtual tech events'), r('Contributing to Open Source', 'article', 'First Timers Only guide for OSS contributions')],
      },
    ],
  },

  'data-scientist': {
    keywords: ['data scientist', 'data science', 'machine learning', 'ml engineer', 'ai engineer', 'data analyst', 'analytics', 'data engineer'],
    rootSkills: ['Mathematics & Statistics'],
    technicalSkills: [
      {
        name: 'Python Programming',
        level: 1, category: 'technical', difficulty: 'beginner', time: '6-10 weeks',
        prereqs: ['math-fundamentals'],
        skills: ['Python Syntax', 'NumPy', 'Pandas', 'Data Manipulation', 'File I/O'],
        resources: [r('Python for Data Science', 'course', 'FreeCodeCamp data science with Python'), r('Python Data Science Handbook', 'book', 'Jake VanderPlas comprehensive guide')],
      },
      {
        name: 'Statistics & Probability',
        level: 1, category: 'foundation', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['math-fundamentals'],
        skills: ['Descriptive Statistics', 'Hypothesis Testing', 'Bayesian Statistics', 'Distributions', 'Statistical Inference'],
        resources: [r('Khan Academy Statistics', 'course', 'Free comprehensive statistics course'), r('Practical Statistics for Data Scientists', 'book', 'Applied statistics with Python & R')],
      },
      {
        name: 'Machine Learning Foundations',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '10-14 weeks',
        prereqs: ['python-programming', 'statistics'],
        skills: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering', 'Scikit-Learn'],
        resources: [r('Andrew Ng ML Course', 'course', 'Stanford ML course on Coursera'), r('Hands-On Machine Learning', 'book', 'Aurelien Geron practical ML with Scikit-Learn & TensorFlow')],
      },
      {
        name: 'Deep Learning',
        level: 3, category: 'technical', difficulty: 'advanced', time: '10-14 weeks',
        prereqs: ['ml-foundations'],
        skills: ['Neural Networks', 'CNNs', 'RNNs/LSTMs', 'Transformers', 'PyTorch or TensorFlow', 'Transfer Learning'],
        resources: [r('Deep Learning Specialization', 'course', 'Andrew Ng deep learning on Coursera'), r('Deep Learning', 'book', 'Ian Goodfellow comprehensive DL textbook'), r('Build an Image Classifier', 'project', 'Train a CNN on custom data')],
      },
      {
        name: 'Data Visualization',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['python-programming'],
        skills: ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau or Power BI', 'Storytelling with Data'],
        resources: [r('Storytelling with Data', 'book', 'Cole Nussbaumer data viz guide'), r('Data Visualization with Python', 'course', 'IBM course on Coursera')],
      },
    ],
    domainSkills: [
      {
        name: 'SQL & Databases',
        level: 1, category: 'domain', difficulty: 'beginner', time: '4-6 weeks',
        prereqs: ['math-fundamentals'],
        skills: ['SQL Queries', 'Joins & Aggregations', 'Window Functions', 'Database Design', 'Query Optimization'],
        resources: [r('SQLBolt', 'course', 'Interactive SQL lessons'), r('Mode SQL Tutorial', 'course', 'Mode analytics SQL tutorial')],
      },
      {
        name: 'Big Data & Cloud',
        level: 3, category: 'domain', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['sql-databases', 'ml-foundations'],
        skills: ['Apache Spark', 'Hadoop', 'Cloud Platforms (AWS/GCP)', 'Data Pipelines', 'Airflow'],
        resources: [r('Apache Spark Course', 'course', 'Databricks Spark training'), r('AWS Data Analytics', 'course', 'AWS analytics learning path')],
      },
    ],
    tools: [
      {
        name: 'ML Tools & MLOps',
        level: 3, category: 'tools', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['deep-learning'],
        skills: ['Model Deployment', 'MLflow', 'Docker for ML', 'Experiment Tracking', 'Model Monitoring'],
        resources: [r('MLOps Specialization', 'course', 'Coursera MLOps by Andrew Ng'), r('Made With ML', 'course', 'Goku Mohandas MLOps course')],
      },
    ],
    softSkills: [
      {
        name: 'Data Storytelling',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['data-viz'],
        skills: ['Business Communication', 'Presentation Skills', 'Stakeholder Management', 'Translating Data to Insights', 'Documentation'],
        resources: [r('The Art of Data Storytelling', 'article', 'Storytelling with data blog'), r('TED Talk: The Power of Data', 'video', 'Hans Rosling famous data visualization talk')],
      },
    ],
    portfolioProjects: [
      {
        name: 'End-to-End ML Project',
        level: 3, category: 'portfolio', difficulty: 'expert', time: '6-10 weeks',
        prereqs: ['deep-learning', 'data-viz', 'mlops'],
        skills: ['Problem Framing', 'Data Collection & Cleaning', 'Model Training', 'Deployment', 'Monitoring & Iteration'],
        resources: [r('Build a Recommendation System', 'project', 'End-to-end ML project with deployment'), r('Kaggle Competition', 'practice', 'Participate in a Kaggle competition end-to-end')],
      },
    ],
    careerSteps: [
      {
        name: 'Portfolio & Job Search',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['ml-portfolio'],
        skills: ['GitHub Portfolio', 'Kaggle Profile', 'Technical Blog', 'Networking', 'Interview Prep'],
        resources: [r('Data Science Interview Guide', 'article', 'Comprehensive DS interview prep'), r('Kaggle Learn', 'course', 'Free micro-courses on Kaggle')],
      },
    ],
  },

  'product-manager': {
    keywords: ['product manager', 'product management', 'pm', 'product owner', 'product lead', 'product'],
    rootSkills: ['Business & User Empathy'],
    technicalSkills: [
      {
        name: 'Product Frameworks',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '4-6 weeks',
        prereqs: ['business-foundations'],
        skills: ['Jobs-to-be-Done', 'Lean Startup', 'Product-Market Fit', 'Business Model Canvas', 'Value Proposition'],
        resources: [r('Reforge Product Strategy', 'course', 'Elite PM strategy program'), r('The Lean Startup', 'book', 'Eric Ries on building products customers want'), r(' Inspired', 'book', 'Marty Cagan on creating products customers love')],
      },
      {
        name: 'User Research & Discovery',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['product-frameworks'],
        skills: ['User Interviews', 'Surveys & Questionnaires', 'Usability Testing', 'Customer Journey Mapping', 'Persona Development'],
        resources: [r('NN Group UX Research', 'article', 'Nielsen Norman Group research articles'), r('Just Enough Research', 'book', 'Erika Hall practical research guide')],
      },
      {
        name: 'Data Analytics for PMs',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['product-frameworks'],
        skills: ['SQL Basics', 'A/B Testing', 'Funnel Analysis', 'KPIs & Metrics', 'Mixpanel/Amplitude'],
        resources: [r('PM School Analytics', 'course', 'Free PM analytics curriculum'), r('Lean Analytics', 'book', 'Alistair Croll & Benjamin Yoskovitz')],
      },
      {
        name: 'Product Strategy & Roadmapping',
        level: 3, category: 'technical', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['user-research', 'analytics-pm'],
        skills: ['Strategic Planning', 'Roadmap Creation', 'Prioritization Frameworks', 'Competitive Analysis', 'OKRs'],
        resources: [r('Product Roadmaps Relaunched', 'book', 'Bruce McCarthy on modern roadmapping'), r('Roadmap Prioritization Frameworks', 'article', 'RICE, ICE, MoSCoW frameworks')],
      },
    ],
    domainSkills: [
      {
        name: 'Agile & Scrum',
        level: 1, category: 'domain', difficulty: 'beginner', time: '2-3 weeks',
        prereqs: ['product-frameworks'],
        skills: ['Sprint Planning', 'Backlog Grooming', 'User Stories', 'Retrospectives', 'Agile Ceremonies'],
        resources: [r('Scrum Guide', 'article', 'Official Scrum Guide'), r('Agile Product Management', 'course', 'Coursera Agile PM course')],
      },
      {
        name: 'UX/UI Principles',
        level: 2, category: 'domain', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['user-research'],
        skills: ['Information Architecture', 'Wireframing', 'Prototyping', 'Design Thinking', 'Heuristic Evaluation'],
        resources: [r('Google UX Design Certificate', 'course', 'Coursera UX certificate'), r('Dont Make Me Think', 'book', 'Steve Krug web usability classic')],
      },
    ],
    tools: [
      {
        name: 'PM Tools & Software',
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-3 weeks',
        prereqs: ['agile-scrum'],
        skills: ['Jira', 'Figma Basics', 'Notion/Confluence', 'Miro/Mural', 'A/B Testing Tools'],
        resources: [r('Figma for PMs', 'video', 'Figma basics for product managers'), r('Jira Crash Course', 'video', 'Atlassian Jira tutorial')],
      },
    ],
    softSkills: [
      {
        name: 'Leadership & Communication',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['product-frameworks'],
        skills: ['Stakeholder Management', 'Cross-functional Collaboration', 'Presentation Skills', 'Influence Without Authority', 'Conflict Resolution'],
        resources: [r('Crucial Conversations', 'book', 'Patterson et al. on high-stakes communication'), r('PM Stakeholder Management', 'article', 'Lenny Rachitsky newsletter guide')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Product Case Study',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '4-6 weeks',
        prereqs: ['product-strategy', 'analytics-pm', 'ux-ui'],
        skills: ['Product Teardown', 'PRD Writing', 'Go-to-Market Strategy', 'Metrics Dashboard', 'Presentation'],
        resources: [r('Write a Product Teardown', 'project', 'Analyze a product end-to-end and write a case study'), r('PRD Template', 'article', 'Product requirements document template and guide')],
      },
    ],
    careerSteps: [
      {
        name: 'PM Interview Preparation',
        level: 3, category: 'career', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['product-strategy', 'pm-portfolio'],
        skills: ['Product Sense Interviews', 'Analytical Interviews', 'Strategy Interviews', 'Behavioral Interviews', 'Case Studies'],
        resources: [r('Decode and Conquer', 'book', 'Lewis Lin PM interview guide'), r('PM Interview Practice', 'practice', 'Practice with peers on PM mock interviews')],
      },
    ],
  },

  'ui-ux-designer': {
    keywords: ['ui', 'ux', 'designer', 'product designer', 'interaction designer', 'graphic design', 'design'],
    rootSkills: ['Design Fundamentals'],
    technicalSkills: [
      {
        name: 'Design Principles & Theory',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '4-6 weeks',
        prereqs: ['design-foundations'],
        skills: ['Color Theory', 'Typography', 'Layout & Composition', 'Visual Hierarchy', 'Gestalt Principles'],
        resources: [r('Refactoring UI', 'book', 'Adam Wathan & Steve Schoger design guide'), r('Design Principles Gallery', 'article', 'principles.design curated principles'), r('Google Material Design Guidelines', 'article', 'Material design system guide')],
      },
      {
        name: 'Figma Mastery',
        level: 1, category: 'tools', difficulty: 'beginner', time: '3-4 weeks',
        prereqs: ['design-foundations'],
        skills: ['Auto Layout', 'Components & Variants', 'Prototyping', 'Design Systems', 'Plugins & Efficiency'],
        resources: [r('Figma Academy', 'course', 'Official Figma learning resources'), r('Figma YouTube Channel', 'video', 'Official Figma tutorials')],
      },
      {
        name: 'UX Research & Methods',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['design-principles', 'figma'],
        skills: ['User Research', 'Personas & Scenarios', 'Journey Mapping', 'Usability Testing', 'Card Sorting', 'Information Architecture'],
        resources: [r('NN Group UX Research', 'article', 'Comprehensive UX research articles'), r('UX Research Methods', 'course', 'Coursera UX research methods course')],
      },
      {
        name: 'Interaction Design & Prototyping',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['figma', 'design-principles'],
        skills: ['Microinteractions', 'Animation Principles', 'State Transitions', 'Gesture Design', 'Responsive Interaction'],
        resources: [r('Microinteractions', 'book', 'Dan Saffer on designing meaningful details'), r('Motion Design with Figma', 'video', 'Figma prototyping and animation tutorials')],
      },
    ],
    domainSkills: [
      {
        name: 'Design Systems',
        level: 3, category: 'domain', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['ux-research', 'interaction-design'],
        skills: ['Token Systems', 'Component Libraries', 'Documentation', 'Governance', 'Cross-team Collaboration'],
        resources: [r('Design Systems Repo', 'article', 'Collection of real-world design systems'), r('Atomic Design', 'book', 'Brad Frost design methodology')],
      },
      {
        name: 'Accessibility & Inclusive Design',
        level: 2, category: 'domain', difficulty: 'intermediate', time: '3-4 weeks',
        prereqs: ['ux-research'],
        skills: ['WCAG Guidelines', 'Screen Reader Testing', 'Color Contrast', 'Keyboard Navigation', 'Inclusive Design Patterns'],
        resources: [r('Inclusive Design Patterns', 'book', 'Heydon Pickering accessibility guide'), r('WCAG 2.1 Guidelines', 'article', 'Official W3C accessibility guidelines')],
      },
    ],
    tools: [
      {
        name: 'Advanced Design Tools',
        level: 2, category: 'tools', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['figma'],
        skills: ['Framer', 'After Effects Basics', 'Illustrator', '3D Modeling Basics', 'Design Tokens'],
        resources: [r('Framer Academy', 'course', 'Framer interactive design course'), r('After Effects for Designers', 'video', 'Motion design tutorials')],
      },
    ],
    softSkills: [
      {
        name: 'Design Communication & Collaboration',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['figma'],
        skills: ['Design Critique', 'Stakeholder Presentations', 'Developer Handoff', 'Receiving Feedback', 'Design Advocacy'],
        resources: [r('Discussing Design', 'book', 'Aaron Carnes on design critique'), r('Design Review Best Practices', 'article', 'Figma blog on effective design reviews')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Design Portfolio & Case Studies',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '4-8 weeks',
        prereqs: ['design-systems', 'interaction-design', 'accessibility'],
        skills: ['Case Study Writing', 'Portfolio Website', 'Process Documentation', 'Visual Storytelling', 'Personal Brand'],
        resources: [r('Bestfolios Design Portfolios', 'article', 'Curated design portfolio examples'), r('Build a Portfolio in Framer', 'project', 'Create a portfolio website with Framer')],
      },
    ],
    careerSteps: [
      {
        name: 'Design Interview & Job Search',
        level: 3, category: 'career', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['design-portfolio'],
        skills: ['Portfolio Presentation', 'Whiteboard Challenges', 'Design Critique Interviews', 'App Critique', 'Networking'],
        resources: [r('Design Interview Prep', 'article', 'AADR guide to design interviews'), r('Whiteboard Challenge Practice', 'practice', 'Practice design exercises with peers')],
      },
    ],
  },

  'marketing-manager': {
    keywords: ['marketing', 'marketer', 'growth', 'seo', 'content marketing', 'brand', 'cmo', 'growth hacker', 'digital marketing'],
    rootSkills: ['Marketing Fundamentals'],
    technicalSkills: [
      {
        name: 'Digital Marketing Foundations',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '4-6 weeks',
        prereqs: ['marketing-foundations'],
        skills: ['Marketing Funnels', 'Customer Acquisition', 'Landing Pages', 'Email Marketing', 'Conversion Optimization'],
        resources: [r('Google Digital Marketing', 'course', 'Google free digital marketing certification'), r('Traction', 'book', 'Gabriel Weinberg on 19 marketing channels')],
      },
      {
        name: 'SEO & Content Strategy',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['digital-marketing'],
        skills: ['Keyword Research', 'On-page SEO', 'Technical SEO', 'Link Building', 'Content Calendar', 'Analytics'],
        resources: [r('Ahrefs Academy', 'course', 'Free SEO training courses'), r('Content Marketing Institute', 'article', 'CMI content marketing resources')],
      },
      {
        name: 'Paid Advertising & PPC',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['digital-marketing'],
        skills: ['Google Ads', 'Facebook/Meta Ads', 'LinkedIn Ads', 'Ad Copywriting', 'Budget Management', 'ROAS Optimization'],
        resources: [r('Google Ads Certification', 'course', 'Google official ads certification'), r('Meta Blueprint', 'course', 'Facebook/Meta advertising certification')],
      },
      {
        name: 'Growth & Analytics',
        level: 3, category: 'technical', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['seo-content', 'paid-ads'],
        skills: ['Growth Loops', 'Cohort Analysis', 'Attribution Models', 'GA4', 'A/B Testing', 'Data-Driven Decisions'],
        resources: [r('Reforge Growth Series', 'course', 'Elite growth marketing program'), r('Hacking Growth', 'book', 'Sean Ellis growth methodology')],
      },
    ],
    domainSkills: [
      {
        name: 'Brand & Strategy',
        level: 2, category: 'domain', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['digital-marketing'],
        skills: ['Brand Positioning', 'Brand Voice & Identity', 'Competitive Analysis', 'Market Research', 'Brand Guidelines'],
        resources: [r('Building a StoryBrand', 'book', 'Donald Miller brand messaging guide'), r('Brand Strategy Course', 'course', 'Marty Neumeier brand strategy')],
      },
      {
        name: 'Social Media & Community',
        level: 1, category: 'domain', difficulty: 'beginner', time: '3-4 weeks',
        prereqs: ['digital-marketing'],
        skills: ['Platform Strategy', 'Content Creation', 'Community Management', 'Influencer Marketing', 'Social Analytics'],
        resources: [r('HubSpot Social Media', 'course', 'Free social media marketing course'), r('Social Media Examiner', 'article', 'Leading social media marketing resource')],
      },
    ],
    tools: [
      {
        name: 'Marketing Tools Stack',
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-3 weeks',
        prereqs: ['digital-marketing'],
        skills: ['Google Analytics', 'Ahrefs/SEMrush', 'HubSpot', 'Mailchimp/Klaviyo', 'Buffer/Hootsuite', 'Canva/Figma Basics'],
        resources: [r('GA4 Training', 'course', 'Google Analytics 4 official training'), r('HubSpot Academy', 'course', 'Free marketing tool certifications')],
      },
    ],
    softSkills: [
      {
        name: 'Leadership & Cross-functional Collaboration',
        level: 3, category: 'soft-skills', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['brand-strategy'],
        skills: ['Team Management', 'Budget Planning', 'Stakeholder Communication', 'Presentation Skills', 'Strategic Thinking'],
        resources: [r('The First 90 Days', 'book', 'Michael Watkins transition guide'), r('Marketing Management', 'book', 'Philip Kotler marketing bible')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Marketing Campaign Portfolio',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '4-8 weeks',
        prereqs: ['growth-analytics', 'brand-strategy'],
        skills: ['Campaign Planning', 'Creative Briefs', 'Budget Allocation', 'Performance Reporting', 'Case Study Writing'],
        resources: [r('Build a Marketing Campaign', 'project', 'Design and document a full marketing campaign'), r('Marketing Portfolio Examples', 'article', 'Best marketing portfolio layouts and case studies')],
      },
    ],
    careerSteps: [
      {
        name: 'Marketing Career Growth',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['marketing-portfolio'],
        skills: ['Resume & LinkedIn', 'Networking', 'Industry Certifications', 'Thought Leadership', 'Interview Prep'],
        resources: [r('Google Marketing Certifications', 'course', 'Stack Google marketing certifications'), r('Marketing Interview Guide', 'article', 'Common marketing interview questions and frameworks')],
      },
    ],
  },

  'mba-business': {
    keywords: ['mba', 'business administration', 'business management', 'business analyst', 'management', 'entrepreneur', 'startup founder', 'ceo', 'coo', 'cfo', 'business development', 'strategy consultant', 'management consultant', 'consulting'],
    rootSkills: ['Business Acumen'],
    technicalSkills: [
      {
        name: 'Financial Accounting & Analysis',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '6-10 weeks',
        prereqs: ['business-acumen'],
        skills: ['Balance Sheets', 'Income Statements', 'Cash Flow Analysis', 'Financial Ratios', 'GAAP Basics'],
        resources: [r('Financial Accounting Fundamentals', 'course', 'Coursera financial accounting by Wharton'), r('Accounting Made Simple', 'book', 'Mike Piper accounting primer'), r('Wall Street Prep', 'course', 'Financial modeling training used by investment banks')],
      },
      {
        name: 'Managerial Economics',
        level: 1, category: 'foundation', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['business-acumen'],
        skills: ['Supply & Demand', 'Pricing Strategy', 'Market Structures', 'Cost Analysis', 'Game Theory Basics'],
        resources: [r('Managerial Economics & Strategy', 'course', 'Coursera managerial economics course'), r('Thinking Strategically', 'book', 'Dixit & Nalebuff on strategic thinking')],
      },
      {
        name: 'Marketing & Brand Strategy',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '6-8 weeks',
        prereqs: ['financial-accounting'],
        skills: ['Market Segmentation', 'Brand Positioning', 'Go-to-Market Strategy', 'Customer Acquisition', 'Pricing Models'],
        resources: [r('Marketing Management (Kotler)', 'book', 'The definitive MBA marketing textbook'), r('Wharton Marketing Specialization', 'course', 'Coursera Wharton marketing program'), r('Crossing the Chasm', 'book', 'Geoffrey Moore on launching disruptive products')],
      },
      {
        name: 'Operations & Supply Chain',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '6-8 weeks',
        prereqs: ['managerial-economics'],
        skills: ['Process Optimization', 'Lean Methodology', 'Supply Chain Management', 'Quality Control', 'Inventory Management'],
        resources: [r('Operations Management', 'course', 'Wharton OM specialization on Coursera'), r('The Goal', 'book', 'Eliyahu Goldratt on theory of constraints'), r('Lean Six Sigma', 'course', 'Yellow/Green Belt certification course')],
      },
      {
        name: 'Corporate Finance & Valuation',
        level: 3, category: 'technical', difficulty: 'advanced', time: '8-12 weeks',
        prereqs: ['marketing-strategy', 'operations'],
        skills: ['DCF Valuation', 'M&A Analysis', 'Capital Structure', 'WACC', 'LBO Modeling'],
        resources: [r('Corporate Finance (Damodaran)', 'book', 'Aswath Damodaran valuation bible'), r('Damodaran on Valuation', 'course', 'NYU Stern valuation lectures on YouTube'), r('Financial Modeling with Excel', 'course', 'Wall Street Prep modeling course')],
      },
      {
        name: 'Strategic Management',
        level: 3, category: 'specialization', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['corporate-finance'],
        skills: ['Porter Five Forces', 'Competitive Strategy', 'Blue Ocean Strategy', 'Core Competencies', 'Strategic Planning'],
        resources: [r('Competitive Strategy', 'course', 'Coursera Ludwig-Maximilians strategy course'), r('Competitive Strategy (Porter)', 'book', 'Michael Porter foundational strategy text'), r('Blue Ocean Strategy', 'book', 'Kim & Mauborgne on creating uncontested markets')],
      },
    ],
    domainSkills: [
      {
        name: 'Data-Driven Decision Making',
        level: 2, category: 'domain', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['financial-accounting'],
        skills: ['Excel Modeling', 'Business Statistics', 'KPI Dashboards', 'A/B Testing', 'Data Visualization'],
        resources: [r('Business Analytics Specialization', 'course', 'Wharton business analytics on Coursera'), r('Excel for Business', 'course', 'Macquarie University Excel specialization')],
      },
      {
        name: 'Negotiation & Deal Making',
        level: 3, category: 'domain', difficulty: 'advanced', time: '4-6 weeks',
        prereqs: ['strategic-management'],
        skills: ['BATNA Analysis', 'Win-Win Frameworks', 'Contract Negotiation', 'Conflict Resolution', 'Persuasion'],
        resources: [r('Negotiation: How to Get What You Want', 'course', 'Coursera negotiation course'), r('Never Split the Difference', 'book', 'Chris Voss FBI negotiation tactics'), r('Getting to Yes', 'book', 'Fisher & Ury Harvard negotiation project')],
      },
    ],
    tools: [
      {
        name: 'Business Tools & Software',
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-4 weeks',
        prereqs: ['business-acumen'],
        skills: ['Advanced Excel', 'PowerPoint Decks', 'Tableau/Power BI', 'Financial Modeling', 'CRM Software'],
        resources: [r('Excel Skills for Business', 'course', 'Coursera Excel specialization'), r('Power BI Guided Learning', 'course', 'Microsoft Learn Power BI modules')],
      },
    ],
    softSkills: [
      {
        name: 'Leadership & Organizational Behavior',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['managerial-economics'],
        skills: ['Team Leadership', 'Motivation Theory', 'Change Management', 'Emotional Intelligence', 'Cross-cultural Management'],
        resources: [r('Organizational Behavior', 'course', 'Coursera OB course'), r('Leaders Eat Last', 'book', 'Simon Sinek on leadership'), r('Crucial Conversations', 'book', 'Patterson on high-stakes communication')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Business Case Competition',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '4-8 weeks',
        prereqs: ['strategic-management', 'data-decisions', 'negotiation'],
        skills: ['Case Interview Frameworks', 'Strategic Recommendations', 'Financial Projections', 'Executive Presentation', 'Stakeholder Buy-in'],
        resources: [r('Case in Point', 'book', 'Marc Cosentino case interview prep bible'), r('HBS Case Studies', 'practice', 'Harvard Business School case method practice'), r('MBA Case Competitions', 'project', 'Participate in case competitions like HULT Prize')],
      },
    ],
    careerSteps: [
      {
        name: 'MBA Networking & Recruiting',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['business-case'],
        skills: ['Alumni Networking', 'Informational Interviews', 'LinkedIn Optimization', 'Coffee Chats', 'Offer Negotiation'],
        resources: [r('MBA Recruiting Guide', 'article', 'Poets&Quants MBA recruiting timeline'), r('Networking for MBAs', 'article', 'How to leverage MBA alumni networks effectively')],
      },
    ],
  },

  'doctor-medical': {
    keywords: ['doctor', 'physician', 'medical', 'medicine', 'surgeon', 'pediatrician', 'cardiologist', 'neurologist', 'psychiatrist', 'general practitioner', 'gp', 'resident', 'internist', 'oncologist', 'radiologist'],
    rootSkills: ['Pre-Medical Foundation'],
    technicalSkills: [
      {
        name: 'Biology & Chemistry Fundamentals',
        level: 1, category: 'foundation', difficulty: 'intermediate', time: 'Ongoing (1-2 years)',
        prereqs: ['pre-medical-foundation'],
        skills: ['Cell Biology', 'Organic Chemistry', 'Biochemistry', 'Genetics', 'Human Anatomy'],
        resources: [r('Khan Academy MCAT', 'course', 'Free MCAT prep covering all sciences'), r('MCAT Complete Subject Review', 'book', 'Kaplan MCAT review series'), r('Princeton Review MCAT', 'book', 'Comprehensive MCAT prep books')],
      },
      {
        name: 'MCAT Preparation',
        level: 2, category: 'technical', difficulty: 'advanced', time: '3-6 months',
        prereqs: ['bio-chem'],
        skills: ['Critical Analysis', 'Biological Sciences', 'Physical Sciences', 'Psychological Sciences', 'Test Strategy'],
        resources: [r('AAMC Official MCAT Prep', 'practice', 'Official AAMC practice materials'), r('UWorld MCAT QBank', 'practice', 'Gold standard MCAT question bank'), r('MCAT Self Prep', 'course', 'Free MCAT prep platform')],
      },
      {
        name: 'Medical School Core Sciences',
        level: 3, category: 'technical', difficulty: 'expert', time: '2 years',
        prereqs: ['mcat-prep'],
        skills: ['Pathology', 'Pharmacology', 'Immunology', 'Microbiology', 'Physiology', 'Neuroscience'],
        resources: [r('First Aid for USMLE Step 1', 'book', 'The definitive board review book'), r('Pathoma', 'course', 'Fundamentals of pathology video course'), r('Boards & Beyond', 'course', 'Comprehensive Step 1 video series')],
      },
      {
        name: 'Clinical Rotations & Patient Care',
        level: 3, category: 'technical', difficulty: 'expert', time: '2 years',
        prereqs: ['medical-core'],
        skills: ['Patient History', 'Physical Examination', 'Differential Diagnosis', 'Treatment Planning', 'Bedside Manner', 'Medical Documentation'],
        resources: [r('USMLE Step 2 CK Prep', 'practice', 'UWorld Step 2 CK QBank'), r('Master the Boards USMLE', 'book', 'Step 2 CK review book'), r('OnlineMedEd', 'course', 'Free clinical sciences video library')],
      },
    ],
    domainSkills: [
      {
        name: 'Medical Specialization',
        level: 4, category: 'specialization', difficulty: 'expert', time: '3-7 years (residency)',
        prereqs: ['clinical-rotations'],
        skills: ['Specialty-Specific Procedures', 'Advanced Diagnostics', 'Research Methods', 'Patient Management', 'Evidence-Based Medicine'],
        resources: [r('FREIDA Residency Search', 'article', 'AMA residency & fellowship database'), r('UpToDate', 'article', 'Clinical decision support resource'), r('NEJM & JAMA', 'article', 'Top medical journals for research')],
      },
      {
        name: 'Medical Licensing & Boards',
        level: 4, category: 'domain', difficulty: 'expert', time: 'Ongoing',
        prereqs: ['medical-specialization'],
        skills: ['USMLE Step 3', 'Board Certification', 'State Medical License', 'DEA Registration', 'Hospital Privileges'],
        resources: [r('USMLE Step 3 Prep', 'practice', 'UWorld Step 3 QBank'), r('Board Review for Specialties', 'course', 'Specialty-specific board review courses'), r('FSMB Licensing Guide', 'article', 'Federation of State Medical Boards licensing info')],
      },
    ],
    tools: [
      {
        name: 'Medical Tools & Technology',
        level: 2, category: 'tools', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['medical-core'],
        skills: ['Electronic Health Records (EHR)', 'Medical Imaging Software', 'Diagnostic Equipment', 'Telemedicine Platforms', 'Medical Research Databases'],
        resources: [r('EHR Training (Epic/Cerner)', 'course', 'Epic and Cerner EHR training modules'), r('PubMed for Medical Research', 'article', 'NIH PubMed database for evidence-based medicine'), r('Epocrates', 'article', 'Drug reference and clinical tool app')],
      },
    ],
    softSkills: [
      {
        name: 'Patient Communication & Empathy',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['clinical-rotations'],
        skills: ['Bedside Manner', 'Breaking Bad News', 'Cultural Competence', 'Patient Education', 'Team Communication', 'Burnout Management'],
        resources: [r('Motivational Interviewing in Health Care', 'book', 'Helping patients change behavior'), r('The Patient Will See You Now', 'book', 'Eric Topol on patient empowerment'), r('Medscape Physician Well-Being', 'article', 'Physician burnout prevention resources')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Research & Publications',
        level: 4, category: 'portfolio', difficulty: 'expert', time: 'Ongoing',
        prereqs: ['medical-specialization'],
        skills: ['Study Design', 'Statistical Analysis', 'Manuscript Writing', 'Peer Review Process', 'Conference Presentations'],
        resources: [r('Publish in Medical Journals', 'article', 'Guide to writing and publishing medical research'), r('ClinicalTrials.gov', 'article', 'Register and find clinical trials'), r('ACGME Research Requirements', 'article', 'Residency research requirements by specialty')],
      },
    ],
    careerSteps: [
      {
        name: 'Residency & Fellowship Applications',
        level: 4, category: 'career', difficulty: 'advanced', time: '6-12 months',
        prereqs: ['research-publications'],
        skills: ['ERAS Application', 'Personal Statement', 'Letters of Recommendation', 'Interview Skills', 'Program Ranking (NRMP)'],
        resources: [r('ERAS Residency Application Guide', 'article', 'AAMC ERAS application walkthrough'), r('NRMP Match Process', 'article', 'National Resident Matching Program guide'), r('Residency Interview Prep', 'practice', 'Common residency interview questions and prep')],
      },
    ],
  },

  'lawyer-legal': {
    keywords: ['lawyer', 'attorney', 'law', 'legal', 'paralegal', 'law school', 'jd', 'juris doctor', 'litigation', 'corporate law', 'criminal law', 'solicitor', 'barrister'],
    rootSkills: ['Critical Thinking & Writing'],
    technicalSkills: [
      {
        name: 'LSAT Preparation',
        level: 1, category: 'foundation', difficulty: 'advanced', time: '3-6 months',
        prereqs: ['critical-thinking'],
        skills: ['Logical Reasoning', 'Analytical Reasoning', 'Reading Comprehension', 'Logic Games', 'Time Management'],
        resources: [r('LSAT Demon', 'course', 'Adaptive LSAT prep platform'), r('The LSAT Trainer', 'book', ' comprehensive LSAT self-study guide by Mike Kim'), r('7Sage LSAT', 'course', 'Affordable LSAT prep with video explanations'), r('PowerScore LSAT Bibles', 'book', 'Logic games and logical reasoning bibles')],
      },
      {
        name: 'Constitutional & Common Law',
        level: 2, category: 'foundation', difficulty: 'intermediate', time: '1 year',
        prereqs: ['lsat-prep'],
        skills: ['Constitutional Analysis', 'Case Law Interpretation', 'Statutory Construction', 'Legal Precedent', 'Federal vs State Law'],
        resources: [r('Chemerinsky Constitutional Law', 'book', 'Erwin Chemerinsky con law textbook'), r('Westlaw/LexisNexis', 'article', 'Legal research databases for case law')],
      },
      {
        name: 'Legal Research & Writing',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '1 year',
        prereqs: ['constitutional-law'],
        skills: ['IRAC Method', 'Legal Memoranda', 'Case Briefs', 'Bluebook Citation', 'Legal Argumentation'],
        resources: [r('Legal Writing in Plain English', 'book', 'Bryan Garner legal writing guide'), r('Bluebook Citation Manual', 'book', 'The definitive legal citation guide'), r('Westlaw Legal Research', 'course', 'Westlaw research certification course')],
      },
      {
        name: 'Civil Procedure & Litigation',
        level: 3, category: 'technical', difficulty: 'advanced', time: '1 year',
        prereqs: ['legal-research'],
        skills: ['Pleadings & Motions', 'Discovery Process', 'Trial Advocacy', 'Evidence Rules', 'Appellate Practice'],
        resources: [r('Civil Procedure (Glannon Guide)', 'book', 'Mark Glannon civil procedure guide'), r('Federal Rules of Civil Procedure', 'article', 'Official FRCP rules'), r('Trial Advocacy Course', 'course', 'NITA trial advocacy training programs')],
      },
      {
        name: 'Specialized Law Practice Area',
        level: 3, category: 'specialization', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['civil-procedure'],
        skills: ['Corporate/M&A Law', 'IP & Patent Law', 'Criminal Defense', 'Family Law', 'Tax Law', 'Environmental Law'],
        resources: [r('Practice Area Specialization Guides', 'article', 'ABA practice area guides and resources'), r('Practicing Law Institute', 'course', 'PLI continuing legal education courses'), r('ABA Specialization', 'article', 'American Bar Association certification programs')],
      },
    ],
    domainSkills: [
      {
        name: 'Ethics & Professional Responsibility',
        level: 2, category: 'domain', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['legal-research'],
        skills: ['MPRE Ethics', 'Conflict of Interest', 'Client Confidentiality', 'Attorney-Client Privilege', 'Professional Conduct'],
        resources: [r('MPRE Review Course', 'course', 'Themis or Kaplan MPRE prep'), r('Model Rules of Professional Conduct', 'article', 'ABA model rules for legal ethics')],
      },
      {
        name: 'Bar Exam Preparation',
        level: 4, category: 'domain', difficulty: 'expert', time: '2-3 months (full-time)',
        prereqs: ['specialized-practice'],
        skills: ['MBE Multiple Choice', 'MEE Essays', 'MPT Performance Tests', 'State-Specific Law', 'Time Management'],
        resources: [r('Themis Bar Review', 'course', 'Comprehensive bar prep course'), r('BarBri Bar Review', 'course', 'Leading bar exam preparation program'), r('Kaplan Bar Review', 'course', 'Bar prep with adaptive learning'), r('NCBE Practice Questions', 'practice', 'Official NCBE MBE practice exams')],
      },
    ],
    tools: [
      {
        name: 'Legal Practice Tools',
        level: 2, category: 'tools', difficulty: 'intermediate', time: '2-4 weeks',
        prereqs: ['legal-research'],
        skills: ['Westlaw/LexisNexis', 'Clio/MyCase Practice Management', 'Court Filing Systems', 'Document Automation', 'E-Discovery Software'],
        resources: [r('Clio Legal Software', 'course', 'Clio practice management training'), r('Westlaw Edge', 'course', 'Advanced Westlaw research with AI'), r('Relativity E-Discovery', 'course', 'Relativity e-discovery certification')],
      },
    ],
    softSkills: [
      {
        name: 'Advocacy & Client Counseling',
        level: 3, category: 'soft-skills', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['civil-procedure'],
        skills: ['Oral Argumentation', 'Client Interviewing', 'Negotiation', 'Mediation Skills', 'Courtroom Presence', 'Empathy Under Pressure'],
        resources: [r('Making Your Case (Scalia)', 'book', 'Scalia & Garner on the art of persuasion'), r('Getting to Yes', 'book', 'Fisher & Ury negotiation framework for lawyers'), r('ABA Client Counseling Resources', 'article', 'ABA client counseling best practices')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Moot Court & Clinical Experience',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '1-2 years',
        prereqs: ['civil-procedure', 'ethics'],
        skills: ['Oral Advocacy', 'Brief Writing', 'Client Representation', 'Pro Bono Work', 'Courtroom Experience'],
        resources: [r('Moot Court Competitions', 'project', 'Participate in moot court and mock trial competitions'), r('Law Clinic Participation', 'project', 'Join a law school legal clinic for real client work'), r('Pro Bono Opportunities', 'article', 'ABA pro bono and public service opportunities')],
      },
    ],
    careerSteps: [
      {
        name: 'Law Firm & Job Search',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['bar-exam'],
        skills: ['OCI Interviews', 'Summer Associate Experience', 'Networking', 'Resume & Cover Letters', 'Job Offer Negotiation'],
        resources: [r('NALP Bulletin', 'article', 'National Association for Law Placement resources'), r('Vault Law Firm Profiles', 'article', 'Vault.com law firm rankings and profiles'), r('Law School Career Services', 'article', 'Leverage your law school career office')],
      },
    ],
  },

  'finance': {
    keywords: ['finance', 'financial analyst', 'investment banking', 'investment banker', 'financial advisor', 'cfa', 'portfolio manager', 'trader', 'quant', 'wealth management', 'asset management', 'private equity', 'hedge fund', 'risk management'],
    rootSkills: ['Financial Literacy'],
    technicalSkills: [
      {
        name: 'Accounting & Financial Statements',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '4-8 weeks',
        prereqs: ['financial-literacy'],
        skills: ['Income Statement', 'Balance Sheet', 'Cash Flow Statement', 'Financial Ratios', 'GAAP vs IFRS'],
        resources: [r('Financial Accounting Fundamentals', 'course', 'Coursera Wharton financial accounting'), r('Accounting Made Simple', 'book', 'Mike Piper accounting primer'), r('Wall Street Prep', 'course', 'Financial modeling training for investment banking')],
      },
      {
        name: 'Excel & Financial Modeling',
        level: 1, category: 'tools', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['financial-literacy'],
        skills: ['DCF Models', 'LBO Models', 'Comparable Company Analysis', 'Precedent Transactions', 'Scenario Analysis'],
        resources: [r('Wall Street Prep Modeling', 'course', 'Industry-standard financial modeling course'), r('Breaking Into Wall Street', 'course', 'Financial modeling courses with real case studies'), r('Advanced Excel Skills', 'course', 'Coursera Excel for business specialization')],
      },
      {
        name: 'Corporate Finance & Valuation',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '8-12 weeks',
        prereqs: ['accounting', 'excel-modeling'],
        skills: ['DCF Valuation', 'WACC Calculation', 'Capital Structure', 'M&A Analysis', 'IPO Process'],
        resources: [r('Damodaran on Valuation', 'course', 'NYU Stern free valuation lectures on YouTube'), r('Investment Valuation (Damodaran)', 'book', 'Aswath Damodaran comprehensive valuation textbook'), r('Corporate Finance Institute', 'course', 'Free FMVA certification program')],
      },
      {
        name: 'Investment Analysis & Portfolio Management',
        level: 3, category: 'technical', difficulty: 'advanced', time: '10-14 weeks',
        prereqs: ['corporate-finance'],
        skills: ['Equity Research', 'Fixed Income Analysis', 'Portfolio Theory', 'Risk-Adjusted Returns', 'Derivatives'],
        resources: [r('CFA Program Curriculum', 'book', 'CFA Institute official curriculum (Level 1-3)'), r('Investments (Bodie Kane Marcus)', 'book', 'Definitive investments textbook'), r('Khan Academy Finance', 'course', 'Free finance and capital markets course')],
      },
    ],
    domainSkills: [
      {
        name: 'CFA Certification',
        level: 3, category: 'domain', difficulty: 'expert', time: '2-4 years (3 levels)',
        prereqs: ['investment-analysis'],
        skills: ['Ethics & Standards', 'Quantitative Methods', 'Economics', 'Financial Reporting', 'Equity & Fixed Income', 'Portfolio Management'],
        resources: [r('CFA Institute Curriculum', 'book', 'Official CFA study materials'), r('Kaplan Schweser CFA', 'course', 'Leading CFA prep provider'), r('Mark Meldrum CFA', 'course', 'Free CFA video lessons'), r('CFA Practice Questions', 'practice', 'CFA Institute official practice exams')],
      },
      {
        name: 'Financial Markets & Regulation',
        level: 2, category: 'domain', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['corporate-finance'],
        skills: ['SEC Regulations', ' Dodd-Frank Act', 'Basel III', 'Market Microstructure', 'Trading Mechanisms'],
        resources: [r('Securities Industry Essentials (SIE)', 'course', 'FINRA SIE exam prep'), r('Investopedia', 'article', 'Comprehensive financial education resource'), r('Financial Markets (Yale)', 'course', 'Robert Shiller financial markets course on Coursera')],
      },
    ],
    tools: [
      {
        name: 'Bloomberg Terminal & Market Tools',
        level: 2, category: 'tools', difficulty: 'intermediate', time: '2-4 weeks',
        prereqs: ['excel-modeling'],
        skills: ['Bloomberg Terminal', 'FactSet', 'Capital IQ', 'Reuters Eikon', 'Python for Finance'],
        resources: [r('Bloomberg Market Concepts (BMC)', 'course', 'Free Bloomberg self-paced certification'), r('Python for Finance', 'book', 'Yves Hilpisch Python in finance'), r('Capital IQ Training', 'course', 'S&P Capital IQ platform training')],
      },
    ],
    softSkills: [
      {
        name: 'Financial Communication & Presentation',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['excel-modeling'],
        skills: ['Investor Presentations', 'Pitch Decks', 'Client Relationship Management', 'Negotiation', 'Stakeholder Communication'],
        resources: [r('Pitch Like a Banker', 'article', 'Investment banking pitch deck guide'), r('Barbarians at the Gate', 'book', 'Classic M&A narrative for deal intuition'), r('Financial Communications', 'course', 'Coursera financial communications course')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Investment Pitch & Stock Analysis',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '4-8 weeks',
        prereqs: ['investment-analysis', 'cfa-cert', 'bloomberg'],
        skills: ['Equity Research Report', 'Investment Thesis', 'Valuation Model', 'Risk Analysis', 'Pitch Presentation'],
        resources: [r('Write an Equity Research Report', 'project', 'Build a full stock pitch with DCF model'), r('Investment Competitions', 'project', 'Participate in CFA Research Challenge or stock pitch competitions'), r('Seeking Alpha', 'practice', 'Practice writing equity research articles')],
      },
    ],
    careerSteps: [
      {
        name: 'Finance Networking & Recruiting',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['investment-pitch'],
        skills: ['Informational Interviews', 'Networking Events', 'LinkedIn Optimization', 'Behavioral Interviews', 'Technical Interview Prep', 'Case Studies'],
        resources: [r('Wall Street Oasis Forums', 'article', 'Finance career forums and interview guides'), r('Mergers & Inquisitions', 'article', 'Investment banking interview prep guides'), r('Vault Finance Career Guides', 'article', 'Vault finance career profiles and interview tips')],
      },
    ],
  },

  'teacher-education': {
    keywords: ['teacher', 'professor', 'educator', 'teaching', 'education', 'instructor', 'tutor', 'academic', 'lecture', 'curriculum designer', 'instructional designer'],
    rootSkills: ['Communication & Empathy'],
    technicalSkills: [
      {
        name: 'Learning Theory & Pedagogy',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '4-8 weeks',
        prereqs: ['communication-empathy'],
        skills: ['Cognitive Development', 'Learning Styles', 'Bloom Taxonomy', 'Constructivist Theory', 'Motivation Theory'],
        resources: [r('Teaching for Learning', 'course', 'Coursera teaching and learning course'), r('How People Learn', 'book', 'National Research Council on learning science'), r('Visible Learning (Hattie)', 'book', 'John Hattie meta-analysis of effective teaching')],
      },
      {
        name: 'Curriculum & Lesson Design',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['learning-theory'],
        skills: ['Backward Design', 'Learning Objectives', 'Assessment Design', 'Differentiated Instruction', 'Project-Based Learning'],
        resources: [r('Understanding by Design', 'book', 'Wiggins & McTighe backward design framework'), r('Khan Academy for Educators', 'course', 'Free teacher resources and lesson planning tools'), r('Edutopia', 'article', 'George Lucas Educational Foundation teaching strategies')],
      },
      {
        name: 'Subject Matter Expertise',
        level: 2, category: 'specialization', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['learning-theory'],
        skills: ['Deep Subject Knowledge', 'Current Research', 'Cross-disciplinary Connections', 'Real-World Application', 'Ongoing Learning'],
        resources: [r('Subject-Specific Certification', 'course', 'State subject area certification requirements'), r('Academic Journals in Your Field', 'article', 'Stay current with research in your subject area')],
      },
      {
        name: 'Educational Technology',
        level: 3, category: 'tools', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['curriculum-design'],
        skills: ['LMS (Canvas/Google Classroom)', 'Interactive Tools (Kahoot/Quizizz)', 'Video Creation', 'Digital Assessment', 'Online Course Design'],
        resources: [r('Google for Education', 'course', 'Google Educator Level 1 & 2 certification'), r('Canvas LMS Training', 'course', 'Canvas instructor training'), r('EdTech Hub', 'article', 'Curated edtech tools and reviews')],
      },
    ],
    domainSkills: [
      {
        name: 'Assessment & Evaluation',
        level: 2, category: 'domain', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['curriculum-design'],
        skills: ['Formative Assessment', 'Summative Assessment', 'Rubric Design', 'Data-Driven Instruction', 'Standardized Testing'],
        resources: [r('Classroom Assessment Techniques', 'book', 'Angelo & Cross on formative assessment'), r('Grant Wiggins Assessment', 'article', 'Grant Wiggins on authentic assessment')],
      },
      {
        name: 'Inclusive & Special Education',
        level: 3, category: 'domain', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['assessment'],
        skills: ['IEPs & 504 Plans', 'Universal Design for Learning', 'ESL/ELL Support', 'Behavior Management', 'Trauma-Informed Teaching'],
        resources: [r('UDL Guidelines', 'article', 'CAST Universal Design for Learning guidelines'), r('Special Education Certification', 'course', 'State special education endorsement programs'), r('Teaching Tolerance', 'article', 'Southern Poverty Law Center inclusive teaching resources')],
      },
    ],
    tools: [
      {
        name: 'Classroom Management & Tools',
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-4 weeks',
        prereqs: ['learning-theory'],
        skills: ['Classroom Routines', 'Behavior Management', 'Parent Communication', 'Gradebook Software', 'Attendance Systems'],
        resources: [r('The First Days of School (Wong)', 'book', 'Harry Wong classic classroom management guide'), r('ClassDojo', 'article', 'Classroom management and parent communication app')],
      },
    ],
    softSkills: [
      {
        name: 'Interpersonal & Leadership Skills',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['learning-theory'],
        skills: ['Public Speaking', 'Conflict Resolution', 'Cultural Competence', 'Mentoring', 'Collaboration with Colleagues'],
        resources: [r('Crucial Conversations', 'book', 'Patterson on high-stakes communication'), r('Dare to Lead', 'book', 'Brene Brown on leadership and empathy')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Teaching Portfolio & Practicum',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '1 semester',
        prereqs: ['assessment', 'inclusive-education'],
        skills: ['Lesson Plan Portfolio', 'Student Work Samples', 'Teaching Philosophy', 'Video Reflection', 'Peer Observation'],
        resources: [r('Build a Teaching Portfolio', 'project', 'Create a comprehensive teaching portfolio with lesson samples'), r('Student Teaching Practicum', 'project', 'Complete supervised teaching practicum'), r('edTPA Assessment', 'article', 'Teacher performance assessment for licensure')],
      },
    ],
    careerSteps: [
      {
        name: 'Licensing & Career Development',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['teaching-portfolio'],
        skills: ['State Teaching License', 'Praxis Exams', 'Continuing Education', 'National Board Certification', 'Job Search & Interviewing'],
        resources: [r('Praxis Exam Prep', 'course', 'ETS Praxis exam preparation materials'), r('National Board Certification', 'article', 'National Board for Professional Teaching Standards'), r('Teacher Job Search Guide', 'article', 'SchoolSpring and teacher job search strategies')],
      },
    ],
  },

  'sales': {
    keywords: ['sales', 'account executive', 'account manager', 'business development', 'bdr', 'sdr', 'sales representative', 'sales manager', 'sales director', 'revenue', 'closing', 'enterprise sales'],
    rootSkills: ['Communication & Relationship Building'],
    technicalSkills: [
      {
        name: 'Sales Fundamentals & Process',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '3-6 weeks',
        prereqs: ['sales-foundations'],
        skills: ['Prospecting', 'Qualification (BANT/MEDDIC)', 'Discovery Calls', 'Pitching', 'Objection Handling', 'Closing'],
        resources: [r('HubSpot Sales Training', 'course', 'Free HubSpot Academy sales certification'), r('The Challenger Sale', 'book', 'Dixon & Adamson on Challenger sales methodology'), r('SPIN Selling', 'book', 'Neil Rackham on consultative selling')],
      },
      {
        name: 'CRM & Sales Tools',
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-4 weeks',
        prereqs: ['sales-foundations'],
        skills: ['Salesforce', 'HubSpot CRM', 'Outreach/Salesloft', 'LinkedIn Sales Navigator', 'Gong/Chorus'],
        resources: [r('Salesforce Trailhead', 'course', 'Free Salesforce learning platform'), r('HubSpot CRM Certification', 'course', 'Free HubSpot CRM training'), r('LinkedIn Sales Navigator', 'course', 'LinkedIn sales tool training')],
      },
      {
        name: 'Account Strategy & Management',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['sales-fundamentals', 'crm-tools'],
        skills: ['Account Mapping', 'Multi-threaded Selling', 'Upsell & Cross-sell', 'Customer Success', 'Renewal Management'],
        resources: [r('Predictable Revenue', 'book', 'Aaron Ross on outbound sales methodology'), r(' Winning at Account Management', 'book', 'Drew Cameron on strategic account management')],
      },
      {
        name: 'Sales Analytics & Forecasting',
        level: 3, category: 'technical', difficulty: 'advanced', time: '4-6 weeks',
        prereqs: ['account-strategy'],
        skills: ['Pipeline Management', 'Revenue Forecasting', 'Conversion Rates', 'Sales Metrics', 'Deal Analysis'],
        resources: [r('Sales Operations Fundamentals', 'course', 'Coursera sales operations course'), r('HubSpot Sales Analytics', 'course', 'HubSpot sales reporting and analytics training')],
      },
    ],
    domainSkills: [
      {
        name: 'Industry & Product Expertise',
        level: 2, category: 'domain', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['sales-fundamentals'],
        skills: ['Product Knowledge', 'Competitive Analysis', 'Industry Trends', 'Use Case Mapping', 'ROI Analysis'],
        resources: [r('Product Enablement Training', 'course', 'Internal product training programs'), r('Gartner/Forrester Reports', 'article', 'Industry research reports for competitive intelligence')],
      },
      {
        name: 'Negotiation & Closing',
        level: 3, category: 'domain', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['account-strategy'],
        skills: ['Pricing Strategy', 'Contract Negotiation', 'Procurement Process', 'Legal Redlines', 'Stakeholder Consensus'],
        resources: [r('Never Split the Difference', 'book', 'Chris Voss negotiation tactics'), r('Getting to Yes', 'book', 'Fisher & Uy principled negotiation')],
      },
    ],
    tools: [
      {
        name: 'Sales Tech Stack',
        level: 2, category: 'tools', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['crm-tools'],
        skills: ['Sales Engagement (Outreach)', 'Conversation Intelligence (Gong)', 'Data Enrichment (ZoomInfo)', 'E-signature (DocuSign)', 'Proposal Software'],
        resources: [r('Outreach University', 'course', 'Outreach.io sales engagement training'), r('Gong Sales Training', 'article', 'Gong.io revenue intelligence best practices')],
      },
    ],
    softSkills: [
      {
        name: 'Executive Communication & Influence',
        level: 3, category: 'soft-skills', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['account-strategy'],
        skills: ['Executive Presence', 'Storytelling', 'Active Listening', 'Empathy', 'Resilience', 'Time Management'],
        resources: [r('How to Win Friends and Influence People', 'book', 'Dale Carnegie classic on influence'), r('Never Eat Alone', 'book', 'Keith Ferrazzi on relationship building'), r('Grit', 'book', 'Angela Duckworth on perseverance')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Sales Playbook & Case Studies',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '4-8 weeks',
        prereqs: ['sales-analytics', 'negotiation-closing'],
        skills: ['Sales Process Documentation', 'Case Study Writing', 'Demo Scripts', 'Battle Cards', 'Customer Testimonials'],
        resources: [r('Build a Sales Playbook', 'project', 'Document your winning sales process and strategies'), r('Sales Case Study Template', 'article', 'Write compelling customer success stories')],
      },
    ],
    careerSteps: [
      {
        name: 'Career Advancement & Leadership',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['sales-playbook'],
        skills: ['Team Leadership', 'Coaching & Mentoring', 'Hiring Sales Talent', 'Quota Setting', 'Sales Strategy'],
        resources: [r('The Sales Manager\'s Guide to Success', 'book', 'Sales leadership guide'), r('Sales Management Training', 'course', 'Sandler or Force Management sales leadership programs')],
      },
    ],
  },

  'cybersecurity': {
    keywords: ['cybersecurity', 'cyber security', 'security analyst', 'infosec', 'information security', 'penetration tester', 'pentester', 'security engineer', 'soc analyst', 'ethical hacker', 'ciso'],
    rootSkills: ['IT & Networking Basics'],
    technicalSkills: [
      {
        name: 'Networking & Operating Systems',
        level: 1, category: 'foundation', difficulty: 'intermediate', time: '8-12 weeks',
        prereqs: ['it-networking'],
        skills: ['TCP/IP', 'DNS & DHCP', 'Linux Administration', 'Windows Server', 'Network Protocols'],
        resources: [r('CompTIA Network+', 'course', 'Foundation networking certification'), r('Linux Journey', 'course', 'Free Linux command line course'), r('CyberOps Associate', 'course', 'Cisco cybersecurity operations course')],
      },
      {
        name: 'Security Fundamentals',
        level: 1, category: 'technical', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['networking-os'],
        skills: ['CIA Triad', 'Cryptography Basics', 'Access Control', 'Threat Models', 'Security Policies'],
        resources: [r('CompTIA Security+', 'course', 'Entry-level security certification'), r('Professor Messer', 'course', 'Free CompTIA Security+ training videos'), r('Cybersecurity & Its Ten Domains', 'course', 'Coursera cybersecurity fundamentals')],
      },
      {
        name: 'Ethical Hacking & Penetration Testing',
        level: 2, category: 'technical', difficulty: 'advanced', time: '10-14 weeks',
        prereqs: ['security-fundamentals'],
        skills: ['Reconnaissance', 'Vulnerability Scanning', 'Exploitation', 'Privilege Escalation', 'Report Writing'],
        resources: [r('TryHackMe', 'practice', 'Interactive cybersecurity labs and learning paths'), r('HackTheBox', 'practice', 'Penetration testing practice platform'), r('Offensive Security OSCP', 'course', 'Gold standard pentesting certification'), r('PortSwigger Web Security Academy', 'course', 'Free web security labs')],
      },
      {
        name: 'Security Operations & Incident Response',
        level: 3, category: 'technical', difficulty: 'advanced', time: '8-12 weeks',
        prereqs: ['ethical-hacking'],
        skills: ['SIEM (Splunk/ELK)', 'Threat Hunting', 'Incident Response', 'Forensics', 'Malware Analysis'],
        resources: [r('Splunk Fundamentals', 'course', 'Free Splunk training and certification'), r('CompTIA CySA+', 'course', 'Cybersecurity analyst certification'), r('Blue Team Labs Online', 'practice', 'Defensive cybersecurity labs')],
      },
    ],
    domainSkills: [
      {
        name: 'Cloud Security',
        level: 3, category: 'specialization', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['security-ops'],
        skills: ['AWS Security', 'Azure Security', 'Container Security', 'IAM Policies', 'Cloud Compliance'],
        resources: [r('AWS Security Learning', 'course', 'AWS security learning path'), r('CCSP Certification', 'course', 'Certified Cloud Security Professional prep'), r('Cloud Security Alliance', 'article', 'Cloud security best practices and guidance')],
      },
      {
        name: 'Governance, Risk & Compliance (GRC)',
        level: 2, category: 'domain', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['security-fundamentals'],
        skills: ['Risk Assessment', 'ISO 27001', 'NIST Framework', 'PCI DSS', 'SOC 2 Audits'],
        resources: [r('CISSP Certification', 'course', 'Certified Information Systems Security Professional'), r('NIST Cybersecurity Framework', 'article', 'NIST CSF implementation guide')],
      },
    ],
    tools: [
      {
        name: 'Security Tools & Software',
        level: 2, category: 'tools', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['security-fundamentals'],
        skills: ['Wireshark', 'Nmap', 'Metasploit', 'Burp Suite', 'Splunk SIEM', 'Snort/Suricata'],
        resources: [r('Wireshark Network Analysis', 'book', 'Laura Chappell Wireshark guide'), r('Metasploit Unleashed', 'course', 'Free Metasploit training by OffSec')],
      },
    ],
    softSkills: [
      {
        name: 'Security Communication & Awareness',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['security-fundamentals'],
        skills: ['Security Awareness Training', 'Executive Reporting', 'Risk Communication', 'Policy Advocacy', 'Cross-team Collaboration'],
        resources: [r('Security Awareness Training', 'article', 'SANS security awareness resources'), r('Communicating Security Risk', 'article', 'How to communicate security to non-technical stakeholders')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Security Lab & CTF Achievements',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['ethical-hacking', 'security-ops'],
        skills: ['CTF Competition', 'Bug Bounty Reports', 'Home Lab Setup', 'Security Blog', 'Open Source Contributions'],
        resources: [r('HackTheBox Pro Labs', 'project', 'Complete HTB professional labs for portfolio'), r('Bug Bounty (HackerOne)', 'practice', 'Participate in bug bounty programs'), r('Build a Home Cyber Lab', 'project', 'Set up a virtual security lab environment')],
      },
    ],
    careerSteps: [
      {
        name: 'Certifications & Career Path',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['security-lab'],
        skills: ['OSCP/CEH Certification', 'CISSP for Leadership', 'Security Clearance', 'Resume & LinkedIn', 'Interview Prep'],
        resources: [r('Cybersecurity Career Roadmap', 'article', 'Paul Jerimy cybersecurity career roadmap'), r('Security Certification Guide', 'article', 'Comparison of security certifications by career level')],
      },
    ],
  },

  'devops-engineer': {
    keywords: ['devops', 'devsecops', 'sre', 'site reliability', 'platform engineer', 'infrastructure engineer', 'cloud engineer', 'release engineer', 'automation engineer'],
    rootSkills: ['Linux & Scripting Fundamentals'],
    technicalSkills: [
      {
        name: 'Linux & Shell Scripting',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '4-8 weeks',
        prereqs: ['linux-scripting'],
        skills: ['Command Line', 'Bash Scripting', 'Process Management', 'File Systems', 'System Administration'],
        resources: [r('Linux Journey', 'course', 'Free interactive Linux course'), r('The Linux Command Line', 'book', 'William Shotts free Linux book'), r('Linux Foundation Courses', 'course', 'Free LF training courses')],
      },
      {
        name: 'Networking & Web Protocols',
        level: 1, category: 'foundation', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['linux-scripting'],
        skills: ['TCP/IP', 'DNS', 'HTTP/HTTPS', 'Load Balancing', 'Firewalls & Security Groups'],
        resources: [r('Khan Academy Networking', 'course', 'Free networking fundamentals'), r('CCNA Basics', 'course', 'Cisco networking fundamentals')],
      },
      {
        name: 'Containerization & Docker',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['linux-scripting'],
        skills: ['Docker', 'Docker Compose', 'Container Networking', 'Image Building', 'Registry Management'],
        resources: [r('Docker Deep Dive', 'book', 'Nigel Poulton Docker guide'), r('Docker Official Tutorial', 'course', 'Docker getting started guide')],
      },
      {
        name: 'Kubernetes & Orchestration',
        level: 3, category: 'technical', difficulty: 'advanced', time: '8-12 weeks',
        prereqs: ['docker'],
        skills: ['K8s Architecture', 'Pods & Deployments', 'Services & Ingress', 'Helm Charts', 'Operators', 'RBAC'],
        resources: [r('Kubernetes the Hard Way', 'course', 'Kelsey Hightower K8s from scratch'), r('CKA Certification', 'course', 'Certified Kubernetes Administrator prep'), r('Kubernetes Up & Running', 'book', 'Burns, Beda & Hightower K8s book')],
      },
      {
        name: 'CI/CD Pipelines',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['docker'],
        skills: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Pipeline as Code', 'Blue-Green Deployments'],
        resources: [r('GitHub Actions Documentation', 'course', 'Official GitHub Actions guide'), r('Jenkins User Documentation', 'course', 'Jenkins CI/CD tutorial'), r('Continuous Delivery (Humble)', 'book', 'Jez Humble on CD practices')],
      },
    ],
    domainSkills: [
      {
        name: 'Infrastructure as Code',
        level: 3, category: 'domain', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['kubernetes', 'ci-cd'],
        skills: ['Terraform', 'Ansible', 'Pulumi', 'CloudFormation', 'Configuration Management'],
        resources: [r('Terraform Up & Running', 'book', 'Yevgeniy Brikman Terraform guide'), r('HashiCorp Terraform Certification', 'course', 'HashiCorp certification prep'), r('Ansible Documentation', 'course', 'Official Ansible docs and tutorials')],
      },
      {
        name: 'Monitoring & Observability',
        level: 3, category: 'domain', difficulty: 'advanced', time: '4-6 weeks',
        prereqs: ['kubernetes'],
        skills: ['Prometheus & Grafana', 'ELK Stack', 'Distributed Tracing (Jaeger)', 'Log Aggregation', 'Alerting'],
        resources: [r('Prometheus Monitoring', 'course', 'Prometheus fundamentals course'), r('Grafana University', 'course', 'Free Grafana training'), r('Observability Engineering', 'book', 'Charity Majors on observability')],
      },
    ],
    tools: [
      {
        name: 'Cloud Platforms',
        level: 2, category: 'tools', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['docker'],
        skills: ['AWS (EKS, EC2, S3, RDS)', 'Azure (AKS)', 'GCP (GKE)', 'IAM', 'VPC & Networking'],
        resources: [r('AWS Certified DevOps Engineer', 'course', 'Adrian Cantrill AWS course'), r('Google Cloud DevOps', 'course', 'GCP DevOps engineer learning path'), r('Azure DevOps Labs', 'course', 'Microsoft Learn Azure DevOps modules')],
      },
    ],
    softSkills: [
      {
        name: 'DevOps Culture & Collaboration',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['ci-cd'],
        skills: ['Dev & Ops Collaboration', 'Incident Management', 'Blameless Postmortems', 'Documentation', 'Mentoring'],
        resources: [r('The DevOps Handbook', 'book', 'Kim, Humble, Debois & Willis on DevOps practices'), r('The Phoenix Project', 'book', 'Gene Kim DevOps novel'), r('Google SRE Book', 'book', 'Free Google Site Reliability Engineering book')],
      },
    ],
    portfolioProjects: [
      {
        name: 'End-to-End DevOps Pipeline',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '4-8 weeks',
        prereqs: ['iac', 'monitoring', 'cloud-platforms'],
        skills: ['Multi-environment Setup', 'Automated Testing', 'Zero-downtime Deployment', 'Monitoring Dashboards', 'Disaster Recovery'],
        resources: [r('Build a DevOps Pipeline Project', 'project', 'Build a complete CI/CD pipeline with IaC and monitoring'), r('DevOps Projects Repository', 'project', 'Techworld-with-nana DevOps project ideas and guides')],
      },
    ],
    careerSteps: [
      {
        name: 'Certifications & Job Search',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['devops-pipeline'],
        skills: ['AWS/Azure DevOps Cert', 'CKA Certification', 'Resume & LinkedIn', 'Interview Prep', 'System Design Interviews'],
        resources: [r('DevOps Interview Guide', 'article', 'Common DevOps interview questions and topics'), r('Techworld with Nana', 'article', 'DevOps career roadmap and free bootcamp')],
      },
    ],
  },

  'hr-human-resources': {
    keywords: ['hr', 'human resources', 'recruiter', 'recruitment', 'talent acquisition', 'people operations', 'people ops', 'hr manager', 'hr business partner', 'compensation', 'benefits', 'employee relations'],
    rootSkills: ['People & Organizational Understanding'],
    technicalSkills: [
      {
        name: 'HR Fundamentals & Employment Law',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '4-8 weeks',
        prereqs: ['people-understanding'],
        skills: ['Employment Law Basics', 'FLSA & FLSA Exemptions', 'EEO & Discrimination', 'FMLA & ADA', 'Labor Relations'],
        resources: [r('SHRM Certified Professional', 'course', 'SHRM-CP certification prep'), r('HR Management Foundation', 'course', 'Coursera HR fundamentals'), r('Employment Law Guide', 'article', 'DOL employment law guide')],
      },
      {
        name: 'Talent Acquisition & Recruiting',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['hr-fundamentals'],
        skills: ['Job Description Writing', 'Sourcing Strategies', 'Interviewing Techniques', 'Applicant Tracking Systems', 'Employer Branding'],
        resources: [r('LinkedIn Recruiter Certification', 'course', 'LinkedIn talent acquisition training'), r('Recruiter Academy', 'course', 'Recruiting best practices and sourcing training'), r('Topgrading (Smart)', 'book', 'Geoff Smart on hiring A-players')],
      },
      {
        name: 'Performance Management & Development',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['hr-fundamentals'],
        skills: ['OKRs & Goal Setting', 'Performance Reviews', '360 Feedback', 'Career Development Plans', 'Succession Planning'],
        resources: [r('Radical Candor (Scott)', 'book', 'Kim Scott on feedback and leadership'), r('Measure What Matters', 'book', 'John Doerr on OKRs'), r('HR Analytics', 'course', 'Coursera people analytics course')],
      },
      {
        name: 'Compensation & Benefits',
        level: 3, category: 'technical', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['talent-acquisition'],
        skills: ['Salary Benchmarking', 'Pay Equity Analysis', 'Benefits Design', 'Equity Compensation', 'Total Rewards Strategy'],
        resources: [r('WorldatWork Certification', 'course', 'Compensation and benefits professional certification'), r('Glassdoor/Payscale Salary Data', 'article', 'Compensation benchmarking tools'), r('Compensation (Milkovich)', 'book', 'George Milkovich compensation textbook')],
      },
    ],
    domainSkills: [
      {
        name: 'Organizational Development & Culture',
        level: 3, category: 'domain', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['performance-management'],
        skills: ['Change Management', 'Employee Engagement', 'Culture Assessment', 'Org Design', 'Diversity & Inclusion'],
        resources: [r('Drive (Pink)', 'book', 'Daniel Pink on motivation'), r('Culture Map (Meyer)', 'book', 'Erin Meyer on cross-cultural management'), r('SHRM Culture Resources', 'article', 'SHRM organizational culture guides')],
      },
      {
        name: 'HR Analytics & Data',
        level: 3, category: 'domain', difficulty: 'advanced', time: '4-6 weeks',
        prereqs: ['performance-management'],
        skills: ['People Analytics', 'Turnover Analysis', 'HR Dashboards', 'Predictive Analytics', 'Data-Driven HR'],
        resources: [r('People Analytics Course', 'course', 'Coursera people analytics specialization'), r('HR Analytics Handbook', 'book', 'Eden King on data-driven HR')],
      },
    ],
    tools: [
      {
        name: 'HRIS & HR Technology',
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-4 weeks',
        prereqs: ['hr-fundamentals'],
        skills: ['Workday', 'BambooHR', 'Greenhouse/Lever (ATS)', 'Survey Tools', 'HR Dashboard Software'],
        resources: [r('Workday Training', 'course', 'Workday HCM training resources'), r('BambooHR Setup Guide', 'article', 'BambooHR implementation guide')],
      },
    ],
    softSkills: [
      {
        name: 'Coaching & Employee Relations',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['hr-fundamentals'],
        skills: ['Active Listening', 'Conflict Resolution', 'Confidential Counseling', 'Investigation Skills', 'Difficult Conversations'],
        resources: [r('Crucial Conversations', 'book', 'Patterson on high-stakes communication'), r('Coaching for Performance (Whitmore)', 'book', 'John Whitmore GROW coaching model')],
      },
    ],
    portfolioProjects: [
      {
        name: 'HR Strategy Project',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '4-8 weeks',
        prereqs: ['org-development', 'comp-benefits'],
        skills: ['HR Strategy Document', 'Employee Engagement Survey', 'Culture Initiative', 'Policy Handbook', 'Metrics Dashboard'],
        resources: [r('Build an Employee Handbook', 'project', 'Create a comprehensive employee handbook'), r('SHRM Template Library', 'article', 'SHRM HR policy templates and tools')],
      },
    ],
    careerSteps: [
      {
        name: 'HR Certifications & Networking',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['hr-strategy'],
        skills: ['SHRM-CP/SCP Certification', 'PHR Certification', 'HR Networking', 'Conference Attendance', 'Mentorship'],
        resources: [r('SHRM Certification', 'course', 'SHRM-CP and SHRM-SCP exam prep'), r('HRCI PHR Certification', 'course', 'HR Certification Institute exam prep'), r('SHRM Membership', 'article', 'Society for HR Management membership and resources')],
      },
    ],
  },

  'accountant': {
    keywords: ['accountant', 'accounting', 'cpa', 'auditor', 'tax', 'bookkeeper', 'controller', 'payroll', 'financial reporting', 'audit'],
    rootSkills: ['Numbers & Attention to Detail'],
    technicalSkills: [
      {
        name: 'Accounting Fundamentals',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '6-10 weeks',
        prereqs: ['numbers-detail'],
        skills: ['Double-Entry Bookkeeping', 'Debits & Credits', 'Journal Entries', 'Trial Balance', 'General Ledger'],
        resources: [r('Accounting Fundamentals', 'course', 'Coursera accounting fundamentals course'), r('Accounting Made Simple', 'book', 'Mike Piper accounting primer'), r('Financial Accounting', 'course', 'Wharton financial accounting on Coursera')],
      },
      {
        name: 'Financial Statements & Reporting',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['accounting-fundamentals'],
        skills: ['Income Statement', 'Balance Sheet', 'Cash Flow Statement', 'GAAP Standards', 'Financial Disclosures'],
        resources: [r('Intermediate Accounting (Kieso)', 'book', 'Kieso, Weygandt & Warfield accounting textbook'), r('FASB Accounting Standards', 'article', 'Financial Accounting Standards Board codification')],
      },
      {
        name: 'Tax Accounting & Preparation',
        level: 2, category: 'technical', difficulty: 'advanced', time: '8-12 weeks',
        prereqs: ['financial-reporting'],
        skills: ['Individual Tax Returns', 'Corporate Tax', 'Partnership Tax', 'Tax Planning', 'IRS Regulations'],
        resources: [r('IRS Volunteer Tax Assistance', 'practice', 'VITA program for hands-on tax prep experience'), r('Federal Taxation (Pratt)', 'book', 'Comprehensive tax accounting textbook'), r('AICPA Tax Section', 'article', 'AICPA tax resources and guidance')],
      },
      {
        name: 'Auditing & Assurance',
        level: 3, category: 'technical', difficulty: 'advanced', time: '8-12 weeks',
        prereqs: ['financial-reporting'],
        skills: ['Audit Planning', 'Risk Assessment', 'Internal Controls', 'Substantive Testing', 'Audit Reports'],
        resources: [r('Auditing & Assurance Services', 'book', 'Louwers & Ramsay auditing textbook'), r('AICPA Audit Guide', 'article', 'AICPA auditing standards and guides')],
      },
    ],
    domainSkills: [
      {
        name: 'CPA Exam Preparation',
        level: 3, category: 'domain', difficulty: 'expert', time: '6-18 months',
        prereqs: ['tax-accounting', 'auditing'],
        skills: ['FAR (Financial Accounting & Reporting)', 'REG (Regulation)', 'AUD (Auditing)', 'BEC (Business Environment)', 'Time Management'],
        resources: [r('Becker CPA Review', 'course', 'Leading CPA exam prep course'), r('Wiley CPAexcel', 'course', 'CPA exam review with adaptive learning'), r('AICPA CPA Exam Blueprints', 'article', 'Official CPA exam content outlines'), r('Ninja CPA Review', 'course', 'Affordable CPA exam prep')],
      },
      {
        name: 'Cost & Managerial Accounting',
        level: 2, category: 'domain', difficulty: 'intermediate', time: '6-8 weeks',
        prereqs: ['financial-reporting'],
        skills: ['Cost Allocation', 'Variance Analysis', 'Budgeting', 'Activity-Based Costing', 'Break-Even Analysis'],
        resources: [r('Managerial Accounting', 'course', 'Coursera managerial accounting course'), r('Managerial Accounting (Garrison)', 'book', 'Garrison, Noreen & Brewer managerial accounting')],
      },
    ],
    tools: [
      {
        name: 'Accounting Software & ERP',
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-4 weeks',
        prereqs: ['accounting-fundamentals'],
        skills: ['QuickBooks', 'SAP/Oracle ERP', 'Excel Advanced', 'Xero', 'Sage'],
        resources: [r('QuickBooks ProAdvisor Certification', 'course', 'Free QuickBooks certification'), r('Excel Skills for Accounting', 'course', 'Coursera Excel for business'), r('SAP Financial Accounting', 'course', 'SAP FICO training modules')],
      },
    ],
    softSkills: [
      {
        name: 'Professional Ethics & Communication',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['accounting-fundamentals'],
        skills: ['Ethical Decision Making', 'Client Communication', 'Presentation Skills', 'Attention to Detail', 'Confidentiality'],
        resources: [r('AICPA Code of Ethics', 'article', 'Professional conduct standards for CPAs'), r('Crucial Conversations', 'book', 'Patterson on professional communication')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Accounting Practicum & Internship',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '1-6 months',
        prereqs: ['cpa-exam', 'cost-accounting'],
        skills: ['Real Client Work', 'Audit Field Work', 'Tax Return Preparation', 'Financial Statement Analysis', 'Professional Documentation'],
        resources: [r('Accounting Internship', 'project', 'Intern at a CPA firm or corporate accounting department'), r('VITA Tax Clinic', 'project', 'Volunteer to prepare tax returns for low-income taxpayers'), r('AICPA Internship Guide', 'article', 'How to land and maximize accounting internships')],
      },
    ],
    careerSteps: [
      {
        name: 'CPA Licensure & Career Path',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['accounting-practicum'],
        skills: ['State CPA License Requirements', 'Experience Requirements', 'CPE Credits', 'Firm vs Industry', 'Networking'],
        resources: [r('AICPA CPA License Requirements', 'article', 'State-by-state CPA licensure requirements'), r('NASBA CPA Exam', 'article', 'National Association of State Boards of Accountancy'), r('Accounting Career Paths', 'article', 'Public accounting vs corporate vs government paths')],
      },
    ],
  },

  'nurse-healthcare': {
    keywords: ['nurse', 'nursing', 'rn', 'registered nurse', 'lpn', 'nurse practitioner', 'np', 'cna', 'healthcare', 'healthcare worker', 'patient care', 'nursing assistant'],
    rootSkills: ['Compassion & Science Foundation'],
    technicalSkills: [
      {
        name: 'Anatomy, Physiology & Microbiology',
        level: 1, category: 'foundation', difficulty: 'intermediate', time: '1-2 semesters',
        prereqs: ['compassion-science'],
        skills: ['Human Anatomy', 'Physiology', 'Microbiology', 'Pathophysiology', 'Nutrition Science'],
        resources: [r('Khan Academy Health & Medicine', 'course', 'Free anatomy and physiology videos'), r('Anatomy & Physiology (Saladin)', 'book', 'Kenneth Saladin A&P textbook'), r('Crash Course A&P', 'video', 'YouTube anatomy and physiology series')],
      },
      {
        name: 'Nursing Fundamentals & Skills',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '1-2 semesters',
        prereqs: ['anatomy-physiology'],
        skills: ['Patient Assessment', 'Vital Signs', 'Medication Administration', 'Wound Care', 'Infection Control', 'Patient Safety'],
        resources: [r('Fundamentals of Nursing (Taylor)', 'book', 'Carol Taylor nursing fundamentals textbook'), r('ATI Nursing Education', 'course', 'Nursing exam prep and skills assessment'), r('Nursing Skills Videos', 'video', 'RegisteredNurseRN nursing skills YouTube channel')],
      },
      {
        name: 'Clinical Rotations & Specialties',
        level: 3, category: 'technical', difficulty: 'advanced', time: '2-4 semesters',
        prereqs: ['nursing-fundamentals'],
        skills: ['Med-Surg', 'Pediatrics', 'Maternity', 'Mental Health', 'Critical Care', 'Community Health'],
        resources: [r('Clinical Companion for Fundamentals', 'book', 'Clinical pocket guide for nursing students'), r('Nursing Specialties Guide', 'article', 'Discover nursing specialties and career paths')],
      },
      {
        name: 'Pharmacology & IV Therapy',
        level: 3, category: 'technical', difficulty: 'advanced', time: '1-2 semesters',
        prereqs: ['nursing-fundamentals'],
        skills: ['Drug Classifications', 'Dosage Calculations', 'IV Insertion', 'Medication Safety', 'Adverse Reactions'],
        resources: [r('Pharmacology for Nurses', 'book', 'Nursing pharmacology textbook'), r('Dosage Calculations', 'course', 'Nursing math and dosage calculation practice')],
      },
    ],
    domainSkills: [
      {
        name: 'NCLEX-RN Exam Preparation',
        level: 4, category: 'domain', difficulty: 'expert', time: '2-3 months',
        prereqs: ['clinical-rotations', 'pharmacology'],
        skills: ['Test-Taking Strategy', 'NCLEX Question Formats', 'Safe Effective Care', 'Health Promotion', 'Psychosocial Integrity'],
        resources: [r('UWorld NCLEX RN', 'practice', 'Gold standard NCLEX question bank'), r('ATI NCLEX Prep', 'course', 'ATI comprehensive NCLEX review'), r('Mark Klimek NCLEX', 'course', 'Popular NCLEX audio review course'), r('Saunders NCLEX-RN', 'book', 'Linda Silvestri NCLEX review book')],
      },
      {
        name: 'Patient Education & Community Health',
        level: 3, category: 'domain', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['clinical-rotations'],
        skills: ['Health Literacy', 'Discharge Planning', 'Community Resources', 'Preventive Care', 'Chronic Disease Management'],
        resources: [r('Community & Public Health Nursing', 'book', 'Community health nursing textbook'), r('Healthy People 2030', 'article', 'US health promotion objectives and resources')],
      },
    ],
    tools: [
      {
        name: 'Healthcare Technology & EHR',
        level: 2, category: 'tools', difficulty: 'intermediate', time: '2-4 weeks',
        prereqs: ['nursing-fundamentals'],
        skills: ['Epic / Cerner EHR', 'Smart Pumps', 'Telemetry Monitoring', 'Telehealth Platforms', 'Medical Devices'],
        resources: [r('Epic EHR Training', 'course', 'Epic electronic health record training modules'), r('Nursing Technology Guide', 'article', 'Overview of common nursing technologies and devices')],
      },
    ],
    softSkills: [
      {
        name: 'Patient Communication & Advocacy',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['nursing-fundamentals'],
        skills: ['Therapeutic Communication', 'Cultural Competence', 'Patient Advocacy', 'Family Support', 'Team Collaboration', 'Self-Care & Resilience'],
        resources: [r('Therapeutic Communication', 'book', 'Nursing communication skills guide'), r('The Shift (Brown)', 'book', 'Theresa Brown on real nursing life'), r('ANA Self-Care Resources', 'article', 'American Nurses Association well-being resources')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Clinical Practicum & Capstone',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '1 semester',
        prereqs: ['nclex-prep'],
        skills: ['Preceptorship', 'Care Plans', 'Clinical Documentation', 'Patient Case Studies', 'Reflection Journals'],
        resources: [r('Nursing Capstone Project', 'project', 'Complete a nursing capstone or evidence-based practice project'), r('Clinical Practicum Guide', 'article', 'Maximize your nursing clinical rotations')],
      },
    ],
    careerSteps: [
      {
        name: 'Licensing & First Nursing Job',
        level: 4, category: 'career', difficulty: 'intermediate', time: '3-6 months',
        prereqs: ['clinical-practicum'],
        skills: ['NCLEX-RN Licensure', 'State Board Application', 'Resume & Portfolio', 'Nursing Interview Prep', 'New Grad Residency Programs'],
        resources: [r('NCSBN NCLEX Guide', 'article', 'National Council of State Boards of Nursing NCLEX info'), r('Nurse Residency Programs', 'article', 'Find new grad nurse residency programs'), r('Nursing Job Search Guide', 'article', 'How to land your first nursing job')],
      },
    ],
  },

  'graphic-designer': {
    keywords: ['graphic designer', 'graphic design', 'brand designer', 'visual designer', 'logo designer', 'branding', 'print designer', 'creative designer'],
    rootSkills: ['Visual & Creative Foundation'],
    technicalSkills: [
      {
        name: 'Design Theory & Color',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '4-6 weeks',
        prereqs: ['visual-foundation'],
        skills: ['Color Theory', 'Typography', 'Composition', 'Visual Hierarchy', 'Gestalt Principles'],
        resources: [r('Refactoring UI', 'book', 'Adam Wathan & Steve Schoger design guide'), r('The Elements of Typographic Style', 'book', 'Robert Bringhurst typography bible'), r('Interaction of Color (Albers)', 'book', 'Josef Albers color theory classic')],
      },
      {
        name: 'Adobe Creative Suite',
        level: 1, category: 'tools', difficulty: 'beginner', time: '4-8 weeks',
        prereqs: ['visual-foundation'],
        skills: ['Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'Bridge'],
        resources: [r('Adobe Creative Cloud Tutorials', 'course', 'Official Adobe tutorials for all CC apps'), r('Bring Your Own Laptop', 'video', 'Free Adobe software tutorials'), r('LinkedIn Learning Adobe', 'course', 'Comprehensive Adobe CC courses')],
      },
      {
        name: 'Brand Identity Design',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '8-12 weeks',
        prereqs: ['design-theory', 'adobe-suite'],
        skills: ['Logo Design', 'Brand Guidelines', 'Visual Identity Systems', 'Brand Strategy', 'Design Thinking'],
        resources: [r('Designing Brand Identity (Wheeler)', 'book', 'Alina Wheeler brand design guide'), r('Logo Modernism', 'book', 'Jens Muller history of logo design'), r('Brand New (UnderConsideration)', 'article', 'Brand identity critique and inspiration blog')],
      },
      {
        name: 'Print & Editorial Design',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['adobe-suite'],
        skills: ['Layout Design', 'Grid Systems', 'Typography for Print', 'Pre-press Production', 'Print Specifications'],
        resources: [r('Grid Systems (Müller-Brockmann)', 'book', 'Classic grid design textbook'), r('Thinking with Type (Lupton)', 'book', 'Ellen Lupton typography guide')],
      },
      {
        name: 'Motion & Digital Design',
        level: 3, category: 'specialization', difficulty: 'advanced', time: '8-12 weeks',
        prereqs: ['brand-identity'],
        skills: ['Motion Graphics', 'Social Media Design', 'Web Design Basics', 'Animation Principles', 'Interactive Design'],
        resources: [r('School of Motion', 'course', 'Motion design courses'), r('After Effects for Designers', 'video', 'Motion design tutorials'), r('Dribbble & Behance', 'article', 'Design inspiration and portfolio platforms')],
      },
    ],
    domainSkills: [
      {
        name: 'Design Production & Pre-press',
        level: 2, category: 'domain', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['print-design'],
        skills: ['CMYK vs RGB', 'Resolution & DPI', 'Bleed & Margins', 'Color Profiles', 'File Formats'],
        resources: [r('Print Production Guide', 'article', 'Comprehensive pre-press and print production guide'), r('Pantone Color Guides', 'article', 'Industry standard color matching system')],
      },
      {
        name: 'Client Management & Freelancing',
        level: 3, category: 'domain', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['brand-identity'],
        skills: ['Client Briefs', 'Project Proposals', 'Pricing & Contracts', 'Revision Management', 'Presentation Skills'],
        resources: [r('The Graphic Artist Guild Handbook', 'book', 'Pricing and ethical guidelines for designers'), r('Freelance Design Guide', 'article', 'How to start and run a freelance design business')],
      },
    ],
    tools: [
      {
        name: 'Advanced Design Tools',
        level: 2, category: 'tools', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['adobe-suite'],
        skills: ['Figma', 'Procreate', 'Cinema 4D Basics', 'Font Management', 'Design Asset Libraries'],
        resources: [r('Figma for Graphic Designers', 'course', 'Figma for brand and visual design'), r('Procreate for iPad', 'video', 'Digital illustration with Procreate')],
      },
    ],
    softSkills: [
      {
        name: 'Creative Collaboration & Critique',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['design-theory'],
        skills: ['Giving & Receiving Feedback', 'Creative Brainstorming', 'Art Direction', 'Client Communication', 'Time Management'],
        resources: [r('Discussing Design', 'book', 'Aaron Carnes on design critique'), r('Steal Like an Artist (Kleon)', 'book', 'Austin Kleon on creative influence')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Design Portfolio & Brand Projects',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '4-8 weeks',
        prereqs: ['brand-identity', 'motion-design', 'design-production'],
        skills: ['Portfolio Curation', 'Case Study Writing', 'Behance/Dribbble Presence', 'Personal Brand', 'Personal Website'],
        resources: [r('Build a Design Portfolio', 'project', 'Curate 5-8 polished case studies for your portfolio'), r('Bestfolios', 'article', 'Curated graphic design portfolio examples'), r('Behance Prosite', 'project', 'Create a portfolio website on Behance or Squarespace')],
      },
    ],
    careerSteps: [
      {
        name: 'Design Job Search & Networking',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['design-portfolio'],
        skills: ['Portfolio Presentation', 'Design Interviews', 'Creative Agencies vs In-house', 'Networking', 'Freelance vs Full-time'],
        resources: [r('Design Interview Guide', 'article', 'Common graphic design interview questions'), r('AIGA Career Resources', 'article', 'American Institute of Graphic Arts career guide'), r('Creative Networking Events', 'article', 'AIGA events, design meetups, and conferences')],
      },
    ],
  },

  'architect': {
    keywords: ['architect', 'architecture', 'building design', 'urban planner', 'urban planning', 'landscape architect', 'interior architect'],
    rootSkills: ['Spatial & Creative Thinking'],
    technicalSkills: [
      {
        name: 'Design Studio & Drawing',
        level: 1, category: 'foundation', difficulty: 'intermediate', time: 'Ongoing (2-3 years)',
        prereqs: ['spatial-thinking'],
        skills: ['Freehand Drawing', 'Technical Drawing', 'Scale & Proportion', 'Spatial Reasoning', 'Model Making'],
        resources: [r('Architecture: Form, Space, and Order (Ching)', 'book', 'Frank Ching foundational architecture text'), r('Architectural Graphics (Ching)', 'book', 'Ching on architectural drawing'), r('Drawing for Architects', 'course', 'Architectural drawing and sketching tutorials')],
      },
      {
        name: 'CAD & BIM Software',
        level: 1, category: 'tools', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['spatial-thinking'],
        skills: ['AutoCAD', 'Revit (BIM)', 'Rhino/Grasshopper', 'SketchUp', '3D Modeling'],
        resources: [r('Autodesk Revit Training', 'course', 'Official Autodesk Revit learning'), r('Rhino 3D Tutorials', 'video', 'Rhino 3D modeling tutorials'), r('AutoCAD Certification', 'course', 'Autodesk AutoCAD certified user prep')],
      },
      {
        name: 'Building Systems & Materials',
        level: 2, category: 'technical', difficulty: 'advanced', time: '1-2 years',
        prereqs: ['design-studio'],
        skills: ['Structural Systems', 'HVAC & MEP', 'Material Science', 'Sustainable Design', 'Building Envelope'],
        resources: [r('Architects Data (Neufert)', 'book', 'Ernst Neufert architectural data reference'), r('Building Construction Illustrated (Ching)', 'book', 'Ching on construction methods'), r('LEED Green Associate', 'course', 'Sustainable building certification')],
      },
      {
        name: 'Architectural History & Theory',
        level: 2, category: 'foundation', difficulty: 'intermediate', time: '1-2 semesters',
        prereqs: ['design-studio'],
        skills: ['Historical Styles', 'Modern Architecture', 'Urban Theory', 'Cultural Context', 'Critical Analysis'],
        resources: [r('A History of Architecture (Banister Fletcher)', 'book', 'Definitive architecture history reference'), r('Towards a New Architecture (Le Corbusier)', 'book', 'Foundational modernist architecture theory'), r('Architectural Theory', 'course', 'Coursera architecture history and theory')],
      },
    ],
    domainSkills: [
      {
        name: 'Building Codes & Regulations',
        level: 3, category: 'domain', difficulty: 'advanced', time: '4-8 weeks',
        prereqs: ['building-systems'],
        skills: ['IBC (International Building Code)', 'Zoning Laws', 'ADA Compliance', 'Fire Safety', 'Permit Process'],
        resources: [r('International Building Code', 'book', 'ICC International Building Code handbook'), r('Building Codes Illustrated (Ching)', 'book', 'Ching guide to building codes'), r('ICC Certification', 'course', 'International Code Council certifications')],
      },
      {
        name: 'Professional Practice & Project Management',
        level: 3, category: 'domain', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['building-codes'],
        skills: ['Construction Documents', 'Contract Administration', 'Project Scheduling', 'Cost Estimation', 'Client Management'],
        resources: [r('Architects Handbook of Professional Practice', 'book', 'AIA professional practice guide'), r('Construction Project Management', 'course', 'Coursera construction management course')],
      },
    ],
    tools: [
      {
        name: 'Rendering & Visualization',
        level: 2, category: 'tools', difficulty: 'intermediate', time: '4-8 weeks',
        prereqs: ['cad-bim'],
        skills: ['V-Ray / Lumion', 'Adobe Photoshop for Architecture', 'Physical Model Making', '3D Printing', 'VR Walkthroughs'],
        resources: [r('Lumion Tutorials', 'video', 'Architectural rendering with Lumion'), r('V-Ray for Rhino', 'course', 'V-Ray rendering tutorials for architecture'), r('Photoshop for Architects', 'video', 'Architectural visualization post-production')],
      },
    ],
    softSkills: [
      {
        name: 'Presentation & Client Skills',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['design-studio'],
        skills: ['Design Presentations', 'Client Pitching', 'Team Collaboration', 'Public Speaking', 'Negotiation'],
        resources: [r('Design Presentation Skills', 'article', 'How to present architectural designs effectively'), r('Architectural Presentations', 'video', 'Architecture presentation techniques and tips')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Architecture Portfolio & Studio Projects',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['building-codes', 'rendering'],
        skills: ['Design Portfolio', 'Studio Project Documentation', 'Competition Entries', 'Process Documentation', 'Personal Website'],
        resources: [r('Architecture Portfolio Guide', 'article', 'How to create a standout architecture portfolio'), r('ArchDaily & Dezeen', 'article', 'Architecture publications for inspiration and submission'), r('Architecture Competitions', 'project', 'Participate in architecture design competitions like eVolo')],
      },
    ],
    careerSteps: [
      {
        name: 'Licensure (ARE) & Career',
        level: 4, category: 'career', difficulty: 'expert', time: '2-5 years post-grad',
        prereqs: ['architecture-portfolio'],
        skills: ['ARE 5.0 Exams (6 divisions)', 'AXP Experience Hours', 'State Licensure', 'NCARB Certification', 'Firm vs Solo Practice'],
        resources: [r('ARE 5.0 Exam Prep', 'course', 'Architect Registration Examination prep materials'), r('NCARB AXP Guide', 'article', 'Architectural Experience Program requirements'), r('ARE Prep (Amber Book)', 'course', 'Popular ARE 5.0 video prep course'), r('Architect Licensing Guide', 'article', 'State-by-state architect licensure requirements')],
      },
    ],
  },

  'content-writer': {
    keywords: ['content writer', 'content writing', 'copywriter', 'copywriting', 'technical writer', 'content creator', 'blogger', 'writer', 'journalist', 'content marketing', 'editor', 'content strategist'],
    rootSkills: ['Language & Storytelling'],
    technicalSkills: [
      {
        name: 'Writing Fundamentals & Style',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '4-8 weeks',
        prereqs: ['language-storytelling'],
        skills: ['Grammar & Mechanics', 'Tone & Voice', 'Storytelling', 'Structural Editing', 'Style Guides (AP/Chicago)'],
        resources: [r('The Elements of Style (Strunk & White)', 'book', 'Classic writing style guide'), r('On Writing Well (Zinsser)', 'book', 'William Zinsser on writing with clarity'), r('AP Stylebook', 'book', 'Associated Press style guide for journalism')],
      },
      {
        name: 'SEO & Content Strategy',
        level: 1, category: 'technical', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['writing-fundamentals'],
        skills: ['Keyword Research', 'On-Page SEO', 'Content Calendars', 'Topic Clusters', 'Search Intent'],
        resources: [r('SEO Training (Ahrefs)', 'course', 'Free Ahrefs SEO training course'), r('Content Marketing Institute', 'article', 'Leading content marketing education resource'), r('HubSpot Content Marketing', 'course', 'Free content marketing certification')],
      },
      {
        name: 'Copywriting & Conversion',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '6-10 weeks',
        prereqs: ['seo-strategy'],
        skills: ['Headline Writing', 'Landing Page Copy', 'Email Sequences', 'Ad Copy', 'Sales Funnels', 'A/B Testing Copy'],
        resources: [r('The Copywriter\'s Handbook (Bly)', 'book', 'Robert Bly copywriting reference'), r('Made to Stick (Heath)', 'book', 'Chip & Dan Heath on memorable messaging'), r('Copyhackers', 'course', 'Conversion copywriting training programs'), r('Swipe Files', 'practice', 'Study winning copy examples and create your swipe file')],
      },
      {
        name: 'Technical & Long-Form Writing',
        level: 3, category: 'specialization', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['copywriting'],
        skills: ['Documentation Writing', 'White Papers', 'Case Studies', 'Industry Research', 'Thought Leadership'],
        resources: [r('Docs for Developers (Power)', 'book', 'Technical writing for software documentation'), r('Hacker\'s Guide to Writing', 'article', 'Free technical writing guide'), r('Write Better Documentation', 'article', 'Atlassian documentation writing guide')],
      },
    ],
    domainSkills: [
      {
        name: 'Content Research & Interviews',
        level: 2, category: 'domain', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['writing-fundamentals'],
        skills: ['Primary Research', 'Subject Matter Interviews', 'Data Sources', 'Fact Checking', 'Original Reporting'],
        resources: [r('The Journalist\'s Resource', 'article', 'Harvard research for journalists'), r('Interviewing Techniques', 'article', 'Journalistic interviewing best practices')],
      },
      {
        name: 'Editorial Planning & Management',
        level: 3, category: 'domain', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['seo-strategy', 'content-research'],
        skills: ['Editorial Calendar', 'Content Workflows', 'Freelance Management', 'Content Operations', 'Brand Voice Guidelines'],
        resources: [r('Content Strategy Guide', 'article', 'Content Marketing Institute strategy guide'), r('Editorial Calendar Templates', 'article', 'Content planning templates and workflows')],
      },
    ],
    tools: [
      {
        name: 'Writing & Content Tools',
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-4 weeks',
        prereqs: ['writing-fundamentals'],
        skills: ['Google Docs / Notion', 'Grammarly / Hemingway', 'WordPress / Webflow CMS', 'Ahrefs / SEMrush', 'Google Analytics'],
        resources: [r('Google Analytics for Content', 'course', 'Google Analytics for content performance tracking'), r('WordPress for Writers', 'course', 'Set up and manage a WordPress blog'), r('Grammarly Premium', 'article', 'AI writing assistant for editing and proofreading')],
      },
    ],
    softSkills: [
      {
        name: 'Client Communication & Collaboration',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['writing-fundamentals'],
        skills: ['Client Briefing', 'Feedback Incorporation', 'Stakeholder Interviews', 'Deadline Management', 'Freelance Pricing'],
        resources: [r('Freelance Writing Guide', 'article', 'How to start and run a freelance writing business'), r('Client Communication for Writers', 'article', 'Managing client expectations and revisions')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Writing Portfolio & Published Work',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['copywriting', 'editorial-planning'],
        skills: ['Writing Samples Portfolio', 'Published Articles', 'Content Case Studies', 'Personal Blog', 'LinkedIn Articles'],
        resources: [r('Build a Writing Portfolio', 'project', 'Create a portfolio website showcasing your best writing samples'), r('Medium Publication', 'project', 'Start writing on Medium to build an audience and portfolio'), r('Contently Portfolio', 'article', 'Create a professional writing portfolio on Contently')],
      },
    ],
    careerSteps: [
      {
        name: 'Writing Career & Specialization',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['writing-portfolio'],
        skills: ['Niche Selection', 'Pitching Publications', 'Freelance Platforms (Upwork/Contra)', 'Content Agency vs In-house', 'Personal Branding'],
        resources: [r('Freelance Writing Job Boards', 'article', 'ProBlogger, Contena, and freelance writing job boards'), r('How to Pitch Publications', 'article', 'Guide to pitching articles to magazines and websites'), r('Content Marketing Salary Guide', 'article', 'Content marketing career paths and salary expectations')],
      },
    ],
  },

  'real-estate': {
    keywords: ['real estate', 'realtor', 'real estate agent', 'property manager', 'real estate broker', 'real estate investor', 'realty', 'property', 'real estate developer'],
    rootSkills: ['Communication & Market Awareness'],
    technicalSkills: [
      {
        name: 'Real Estate Principles & Practices',
        level: 1, category: 'foundation', difficulty: 'beginner', time: '4-8 weeks',
        prereqs: ['market-awareness'],
        skills: ['Property Types', 'Market Analysis', 'Real Estate Law', 'Financing Basics', 'Investment Metrics'],
        resources: [r('Real Estate Express', 'course', 'Online real estate pre-licensing courses'), r('The Real Estate Investor\'s Handbook', 'book', 'Comprehensive real estate fundamentals guide'), r('BiggerPockets', 'article', 'Leading real estate investing education platform')],
      },
      {
        name: 'Real Estate Licensing',
        level: 1, category: 'technical', difficulty: 'intermediate', time: '2-6 months',
        prereqs: ['real-estate-principles'],
        skills: ['Pre-License Course Hours', 'State Exam Prep', 'Real Estate Law', 'Contracts & Agreements', 'Ethics'],
        resources: [r('Real Estate Exam Prep', 'course', 'State-specific real estate exam prep courses'), r('Kaplan Real Estate', 'course', 'Real estate licensing education'), r('Real Estate License Guide', 'article', 'State-by-state licensing requirements guide')],
      },
      {
        name: 'Property Valuation & Analysis',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['real-estate-licensing'],
        skills: ['Comparative Market Analysis (CMA)', 'Cap Rates', 'Cash-on-Cash Return', 'ROI Calculations', 'Property Appraisal'],
        resources: [r('Real Estate Investing for Beginners', 'course', 'BiggerPockets investment analysis course'), r('The Book on Rental Property Investing', 'book', 'Brandon Turner real estate investing guide'), r('Property Analysis Tools', 'article', 'DealCheck and BiggerPockets calculators')],
      },
      {
        name: 'Marketing & Lead Generation',
        level: 2, category: 'technical', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['real-estate-licensing'],
        skills: ['Social Media Marketing', 'Open Houses', 'Cold Calling', 'Door Knocking', 'Sphere of Influence', 'Online Listings'],
        resources: [r('Real Estate Marketing Guide', 'article', 'Comprehensive real estate marketing strategies'), r('Lab Coat Agents', 'course', 'Real estate marketing and lead generation training'), r('Zillow Premier Agent', 'article', 'Zillow agent marketing platform guide')],
      },
    ],
    domainSkills: [
      {
        name: 'Investment Strategies',
        level: 3, category: 'specialization', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['property-valuation'],
        skills: ['House Flipping', 'Buy & Hold', 'Wholesaling', 'Multi-Family Investing', 'REITs & Syndication'],
        resources: [r('The Book on Flipping Houses', 'book', 'J Scott house flipping guide'), r('BiggerPockets Podcast', 'video', 'Real estate investing podcast and education'), r('Real Estate Syndication', 'article', 'Guide to real estate syndication and passive investing')],
      },
      {
        name: 'Negotiation & Deal Structuring',
        level: 3, category: 'domain', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['property-valuation'],
        skills: ['Offer Writing', 'Contingencies', 'Creative Financing', 'Seller Financing', 'Contract Negotiation'],
        resources: [r('The Book on Negotiating Real Estate', 'book', 'J Scott real estate negotiation guide'), r('Never Split the Difference', 'book', 'Chris Voss negotiation tactics')],
      },
    ],
    tools: [
      {
        name: 'Real Estate Technology Stack',
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-4 weeks',
        prereqs: ['real-estate-licensing'],
        skills: ['MLS Access', 'CRM (Follow Up Boss/kvCORE)', 'Zillow/Redfin', 'DocuSign', 'Virtual Tour Software'],
        resources: [r('Follow Up Boss CRM', 'course', 'Real estate CRM training'), r('MLS Training', 'course', 'Multiple Listing Service training and certification'), r('Matterport 3D Tours', 'article', 'Virtual tour creation for property listings')],
      },
    ],
    softSkills: [
      {
        name: 'Client Relationship & Trust Building',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['real-estate-licensing'],
        skills: ['Active Listening', 'Needs Assessment', 'Emotional Intelligence', 'Patience', 'Closing Skills', 'Referral Generation'],
        resources: [r('The Millionaire Real Estate Agent', 'book', 'Gary Keller real estate agent guide'), r('How to Win Friends and Influence People', 'book', 'Dale Carnegie on relationship building')],
      },
    ],
    portfolioProjects: [
      {
        name: 'First Deals & Track Record',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['investment-strategies', 'negotiation-deals'],
        skills: ['Transaction Documentation', 'Client Testimonials', 'Deal Case Studies', 'Sales Statistics', 'Market Reports'],
        resources: [r('Build a Real Estate Portfolio', 'project', 'Document your first deals and create a track record'), r('Real Estate Agent Bio Guide', 'article', 'Write a compelling real estate agent bio')],
      },
    ],
    careerSteps: [
      {
        name: 'Broker\'s License & Scaling',
        level: 4, category: 'career', difficulty: 'advanced', time: '2-5 years',
        prereqs: ['first-deals'],
        skills: ['Broker\'s License Requirements', 'Team Building', 'Brokerage Management', 'Mentoring Agents', 'Business Operations'],
        resources: [r('Broker\'s License Guide', 'article', 'State broker licensing requirements'), r('Building a Real Estate Team', 'article', 'How to scale from agent to team to brokerage'), r('Real Estate Broker Salary', 'article', 'Broker career path and income expectations')],
      },
    ],
  },

  'fitness-trainer': {
    keywords: ['fitness', 'personal trainer', 'fitness trainer', 'fitness coach', 'strength coach', 'gym trainer', 'exercise physiologist', 'crossfit coach', 'yoga instructor', 'pilates instructor', 'nutrition coach'],
    rootSkills: ['Health & Fitness Foundation'],
    technicalSkills: [
      {
        name: 'Anatomy & Exercise Science',
        level: 1, category: 'foundation', difficulty: 'intermediate', time: '4-8 weeks',
        prereqs: ['fitness-foundation'],
        skills: ['Muscle Anatomy', 'Biomechanics', 'Exercise Physiology', 'Energy Systems', 'Motor Learning'],
        resources: [r('ACSM Guidelines', 'book', 'American College of Sports Medicine guidelines'), r('Essentials of Strength Training', 'book', 'NSCA strength training textbook'), r('NASM Anatomy', 'course', 'NASM anatomy and physiology modules')],
      },
      {
        name: 'Personal Training Certification',
        level: 1, category: 'technical', difficulty: 'intermediate', time: '3-6 months',
        prereqs: ['anatomy-science'],
        skills: ['Program Design', 'Exercise Selection', 'Client Assessment', 'Safety & Injury Prevention', 'Professional Conduct'],
        resources: [r('NASM CPT Certification', 'course', 'National Academy of Sports Medicine certified personal trainer'), r('ACE Personal Trainer', 'course', 'American Council on Exercise CPT certification'), r('ACSM Certified Personal Trainer', 'course', 'ACSM CPT certification program'), r('NSCA-CPT', 'course', 'National Strength & Conditioning CPT')],
      },
      {
        name: 'Program Design & Periodization',
        level: 2, category: 'technical', difficulty: 'advanced', time: '6-10 weeks',
        prereqs: ['pt-certification'],
        skills: ['Strength Periodization', 'Hypertrophy Programming', 'Endurance Training', 'Deload Strategies', 'Progressive Overload'],
        resources: [r('Periodization: Theory and Methodology', 'book', 'Bompa & Haff periodization textbook'), r('Scientific Principles of Strength Training', 'book', 'Juggernaut Training Systems strength guide'), r('NSCA Strength Training Manual', 'book', 'NSCA strength training reference')],
      },
      {
        name: 'Nutrition Coaching',
        level: 2, category: 'technical', difficulty: 'intermediate', time: '4-8 weeks',
        prereqs: ['pt-certification'],
        skills: ['Macronutrient Planning', 'Meal Planning', 'Weight Management', 'Supplement Knowledge', 'Dietary Assessment'],
        resources: [r('Precision Nutrition Certification', 'course', 'Leading nutrition coaching certification (PN1)'), r('ISSN Sports Nutrition', 'course', 'International Society of Sports Nutrition certification'), r('Renaissance Diet 2.0', 'book', 'Renaissance Periodization nutrition guide')],
      },
    ],
    domainSkills: [
      {
        name: 'Special Populations & Rehabilitation',
        level: 3, category: 'specialization', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['program-design'],
        skills: ['Post-Rehab Training', 'Senior Fitness', 'Pre/Postnatal Training', 'Chronic Conditions', 'Adaptive Exercise'],
        resources: [r('NASM Corrective Exercise Specialist', 'course', 'NASM CES certification for post-rehab training'), r('ACSM Special Populations', 'book', 'ACSM guidelines for special populations'), r('Senior Fitness Specialist', 'course', 'ACE senior fitness certification')],
      },
      {
        name: 'Behavior Change & Psychology',
        level: 2, category: 'domain', difficulty: 'intermediate', time: '4-6 weeks',
        prereqs: ['pt-certification'],
        skills: ['Motivational Interviewing', 'Habit Formation', 'Goal Setting', 'Accountability Systems', 'Adherence Strategies'],
        resources: [r('Precision Nutrition Coaching Psychology', 'course', 'Behavior change coaching methods'), r('Atomic Habits (Clear)', 'book', 'James Clear on habit formation'), r('NASM Behavior Change Specialist', 'course', 'NASM BCS certification')],
      },
    ],
    tools: [
      {
        name: 'Fitness Business & Training Tools',
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-4 weeks',
        prereqs: ['pt-certification'],
        skills: ['Trainerize / TrueCoach', 'MyFitnessPal Pro', 'Exercise Demo Libraries', 'Body Composition Tools', 'Social Media Marketing'],
        resources: [r('Trainerize Setup Guide', 'course', 'Online personal training platform tutorial'), r('TrueCoach Training', 'course', 'TrueCoach coaching platform guide'), r('Exercise Database (ExRx)', 'article', 'Exercise prescription database and reference')],
      },
    ],
    softSkills: [
      {
        name: 'Coaching & Client Communication',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['pt-certification'],
        skills: ['Cueing & Corrections', 'Motivation & Encouragement', 'Empathy', 'Active Listening', 'Boundary Setting'],
        resources: [r('The Coaching Habit (Stanier)', 'book', 'Michael Bungay Stanier on coaching questions'), r('NASM Coaching Guide', 'article', 'Client communication and coaching best practices')],
      },
    ],
    portfolioProjects: [
      {
        name: 'Client Success Stories & Case Studies',
        level: 3, category: 'portfolio', difficulty: 'advanced', time: 'Ongoing',
        prereqs: ['special-populations', 'behavior-change'],
        skills: ['Before/After Documentation', 'Program Case Studies', 'Client Testimonials', 'Transformation Stories', 'Social Proof'],
        resources: [r('Build a Fitness Portfolio', 'project', 'Document client transformations and success stories'), r('Fitness Marketing Guide', 'article', 'How to market your personal training business'), r('Instagram for Trainers', 'article', 'Social media marketing for fitness professionals')],
      },
    ],
    careerSteps: [
      {
        name: 'Building a Fitness Business',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: ['client-success-stories'],
        skills: ['Business Formation', 'Pricing & Packages', 'Online Training Business', 'Client Acquisition', 'Brand Building'],
        resources: [r('The Fitness Business Blueprint', 'article', 'How to build a profitable fitness business'), r('Online Trainer Academy', 'course', 'Online Personal Training certification by OTA'), r('PT Business Resources', 'article', 'Personal trainer business guides and templates')],
      },
    ],
  },

};

// Dynamic generic domain generator — creates a tailored roadmap
// using the actual job title the user entered, so it never feels
// like a vague placeholder.
export function generateGenericDomain(jobTitle: string, description: string): CareerDomain {
  const title = jobTitle.trim();
  const lower = title.toLowerCase();
  const field = title;

  // Try to detect the field/category from the title
  const isAcademic = /\b(professor|phd|researcher|scientist|postdoc|academic)\b/.test(lower);
  const isMedical = /\b(nurse|therapist|therapist|pharmacist|dentist|optometrist|vet|veterinary|medical|health)\b/.test(lower);
  const isCreative = /\b(artist|photographer|musician|filmmaker|video editor|animator|music producer|songwriter|actor|dancer)\b/.test(lower);
  const isBusiness = /\b(manager|director|executive|consultant|business|founder|owner|entrepreneur|operations)\b/.test(lower);
  const isTrades = /\b(electrician|plumber|carpenter|mechanic|welder|hvac|construction|contractor)\b/.test(lower);
  const isAviation = /\b(pilot|flight|aviation|aerospace|air traffic)\b/.test(lower);
  const isSocial = /\b(social worker|counselor|psychologist|therapist|community)\b/.test(lower);

  const rootSkill = isAcademic ? 'Research & Academic Foundation'
    : isMedical ? 'Healthcare & Science Foundation'
    : isCreative ? 'Creative Foundation'
    : isBusiness ? 'Business & Management Foundation'
    : isTrades ? 'Safety & Trade Fundamentals'
    : isAviation ? 'Aviation & Physics Foundation'
    : isSocial ? 'Human Behavior & Empathy'
    : 'Professional Foundation';

  return {
    keywords: [],
    rootSkills: [rootSkill],
    technicalSkills: [
      {
        name: `${field} Fundamentals`,
        level: 1, category: 'foundation', difficulty: 'beginner', time: '6-10 weeks',
        prereqs: ['professional-foundation'],
        skills: [
          `Core ${field} Concepts`,
          'Industry Terminology',
          'Key Processes & Workflows',
          'Industry Standards & Best Practices',
          'Regulatory & Compliance Basics',
        ],
        resources: [
          r(`Introduction to ${field}`, 'course', `Coursera or edX introductory courses on ${field}`),
          r(`${field} Industry Overview`, 'article', `Research ${field} on industry reports, trade publications, and professional association websites`),
          r(`${field} Primer Books`, 'book', `Search Amazon for the highest-rated introduction books on ${field}`),
          r(`YouTube: ${field} Beginners`, 'video', `Free beginner tutorials and career overview videos on YouTube`),
        ],
      },
      {
        name: `Core ${field} Skills`,
        level: 2, category: 'technical', difficulty: 'intermediate', time: '3-6 months',
        prereqs: [`${slugify(field)}-fundamentals`],
        skills: [
          `Hands-on ${field} Practice`,
          'Primary Tools & Techniques',
          'Quality Standards',
          'Problem-Solving in the Field',
          'Workflow Optimization',
        ],
        resources: [
          r(`${field} Skills Course`, 'course', `Udemy, LinkedIn Learning, or specialized ${field} training programs`),
          r(`${field} Certification Prep`, 'course', `Industry-recognized certifications for ${field}`),
          r(`${field} Practice Projects`, 'project', `Build real projects or complete case studies in ${field}`),
          r(`${field} Professional Forums`, 'article', `Join Reddit, Discord, or industry forums for ${field} professionals`),
        ],
      },
      {
        name: `Advanced ${field} Specialization`,
        level: 3, category: 'specialization', difficulty: 'advanced', time: '6-12 months',
        prereqs: [`core-${slugify(field)}-skills`],
        skills: [
          `Advanced ${field} Techniques`,
          'Niche Specialization',
          'Industry Innovation & Trends',
          'Complex Problem Solving',
          'Research & Development',
        ],
        resources: [
          r(`Advanced ${field} Certification`, 'course', `Pursue advanced or master-level certifications in ${field}`),
          r(`${field} Conferences & Workshops`, 'article', `Attend industry conferences, workshops, and seminars for ${field}`),
          r(`Advanced ${field} Books`, 'book', `Find advanced textbooks and professional guides on ${field}`),
          r(`${field} Mentorship`, 'practice', `Find a mentor in ${field} through professional networks or LinkedIn`),
        ],
      },
    ],
    domainSkills: [
      {
        name: `${field} Domain Expertise`,
        level: 2, category: 'domain', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: [`core-${slugify(field)}-skills`],
        skills: [
          `Deep ${field} Knowledge`,
          'Industry Regulations',
          'Professional Networks',
          'Case Studies & Analysis',
          'Ethics & Professional Standards',
        ],
        resources: [
          r(`${field} Industry Publications`, 'article', `Subscribe to trade journals, blogs, and newsletters for ${field}`),
          r(`${field} Professional Association`, 'article', `Join the relevant professional association for ${field} (e.g., search "${field} association")`),
          r(`${field} Case Studies`, 'article', `Study real-world case studies and success stories in ${field}`),
        ],
      },
      {
        name: 'Critical Thinking & Problem Solving',
        level: 3, category: 'domain', difficulty: 'advanced', time: 'Ongoing',
        prereqs: [`advanced-${slugify(field)}-specialization`],
        skills: [
          'Analytical Thinking',
          'Decision Making Under Pressure',
          'Root Cause Analysis',
          'Creative Solutions',
          'Strategic Planning',
        ],
        resources: [
          r('Thinking, Fast and Slow (Kahneman)', 'book', 'Daniel Kahneman on decision-making and cognitive biases'),
          r('Critical Thinking Course', 'course', 'Coursera critical thinking and problem-solving course'),
          r('The 5 Whys Technique', 'article', 'Root cause analysis methodology for professional problem-solving'),
        ],
      },
    ],
    tools: [
      {
        name: `${field} Tools & Technology`,
        level: 1, category: 'tools', difficulty: 'beginner', time: '2-6 weeks',
        prereqs: [`${slugify(field)}-fundamentals`],
        skills: [
          `Primary ${field} Software`,
          'Productivity & Collaboration Tools',
          'Data & Reporting Tools',
          `Industry-Specific Technology`,
          'Digital Communication Platforms',
        ],
        resources: [
          r(`${field} Software Tutorials`, 'video', `Search YouTube for tutorials on tools commonly used in ${field}`),
          r(`${field} Tool Reviews`, 'article', `Find the best tools for ${field} on G2, Capterra, or industry blogs`),
          r('Essential Productivity Tools', 'course', 'Master Notion, Slack, Google Workspace, and project management tools'),
        ],
      },
    ],
    softSkills: [
      {
        name: 'Professional Communication & Leadership',
        level: 2, category: 'soft-skills', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: [`${slugify(field)}-fundamentals`],
        skills: [
          'Effective Communication',
          'Leadership & Influence',
          'Teamwork & Collaboration',
          'Time Management',
          'Negotiation & Conflict Resolution',
          'Emotional Intelligence',
        ],
        resources: [
          r('Crucial Conversations', 'book', 'Patterson et al. on high-stakes professional communication'),
          r('Dale Carnegie Course', 'course', 'Professional development and interpersonal skills training'),
          r('Emotional Intelligence 2.0', 'book', 'Bradberry & Greaves on EQ for professionals'),
          r('How to Win Friends and Influence People', 'book', 'Dale Carnegie classic on professional relationships'),
        ],
      },
    ],
    portfolioProjects: [
      {
        name: `${field} Portfolio & Real-World Projects`,
        level: 3, category: 'portfolio', difficulty: 'advanced', time: '4-12 weeks',
        prereqs: [`advanced-${slugify(field)}-specialization`, `${slugify(field)}-domain-expertise`],
        skills: [
          `Portfolio Development`,
          'Project Documentation',
          'Case Study Writing',
          'Public Presentation',
          'Peer & Mentor Review',
        ],
        resources: [
          r(`Build a ${field} Portfolio`, 'project', `Create a portfolio website or document showcasing 3-5 real ${field} projects`),
          r(`${field} Internship or Apprenticeship`, 'project', `Gain hands-on experience through internships, apprenticeships, or volunteer work in ${field}`),
          r(`Personal ${field} Project`, 'project', `Design and execute an independent project that demonstrates your ${field} skills`),
          r('Portfolio Website Builder', 'article', `Use Squarespace, Wix, or Notion to build a professional portfolio website`),
        ],
      },
    ],
    careerSteps: [
      {
        name: 'Job Search, Networking & Career Growth',
        level: 4, category: 'career', difficulty: 'intermediate', time: 'Ongoing',
        prereqs: [`${slugify(field)}-portfolio-real-world-projects`],
        skills: [
          'Resume & Cover Letter Optimization',
          'LinkedIn Profile & Personal Branding',
          'Interview Skills',
          'Professional Networking',
          'Salary Negotiation',
          'Continuous Learning & Upskilling',
        ],
        resources: [
          r('LinkedIn Learning Career Courses', 'course', 'Professional development courses on job search and career growth'),
          r(`${field} Job Boards`, 'article', `Search for ${field} jobs on LinkedIn, Indeed, Glassdoor, and industry-specific job boards`),
          r('Interview Preparation Guide', 'article', 'Comprehensive guide to behavioral and technical interview preparation'),
          r(`${field} Salary Research`, 'article', `Research ${field} salary ranges on Glassdoor, Payscale, and Salary.com`),
          r('Never Split the Difference', 'book', 'Chris Voss on negotiation — applicable to salary and offer negotiation'),
        ],
      },
    ],
  };
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function findCareerDomain(jobTitle: string, description: string): string {
  const combined = `${jobTitle} ${description}`.toLowerCase();
  for (const [key, domain] of Object.entries(careerDomains)) {
    if (domain.keywords.some((kw) => combined.includes(kw))) {
      return key;
    }
  }
  return 'generic';
}
