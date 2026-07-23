'use client';

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import {
    ArrowRight,
    BarChart3,
    Check,
    ChevronRight,
    Code2,
    ExternalLink,
    FileText,
    Mail,
    Menu,
    Phone,
    Sparkles,
    Terminal,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import {
    SiDocker,
    SiGit,
    SiLinux,
    SiMongodb,
    SiNestjs,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPrisma,
    SiReact,
    SiRedis,
    SiTailwindcss,
    SiTypescript,
} from 'react-icons/si';

type TechName =
    | 'React'
    | 'Next.js'
    | 'TypeScript'
    | 'Node.js'
    | 'NestJS'
    | 'MongoDB'
    | 'Postgres'
    | 'Redis'
    | 'Docker'
    | 'Git'
    | 'Linux'
    | 'Prisma'
    | 'Tailwind';

type TechVisual = {
    icon: IconType;
    iconClassName: string;
    badgeClassName: string;
};

type TechItem = {
    name: TechName;
    detail: string;
};

type HighlightItem = {
    label: string;
    title: string;
    detail: string;
};

type HeroCard = {
    tech: TechName;
    label: string;
    position: string;
    depth: number;
};

type Locale = 'en' | 'vi';

type ProjectId = 'crm' | 'erp' | 'hrm' | 'ecommerce';

type NavItem = {
    label: string;
    href: string;
};

type TimelineItem = {
    year: string;
    company: string;
    tracks: string[];
};

type GithubStat = {
    label: string;
    value: string;
    detail: string;
};

type RepositoryItem = {
    name: string;
    type: string;
    note: string;
};

type ContactCard = {
    label: string;
    value: string;
    href: string;
    icon: IconType;
};

type SectionContent = {
    eyebrow: string;
    title: string;
    description: string;
};

type HeaderContent = {
    badge: string;
    name: string;
    role: string;
    description: string;
    resumeLabel: string;
    githubLabel: string;
    contactLabel: string;
    scrollLabel: string;
    languageLabel: string;
};

type AboutContent = SectionContent & {
    expertiseLabel: string;
    expertise: string[];
    timelineLabel: string;
    timeline: TimelineItem[];
};

type StackContent = SectionContent & {
    techStack: TechItem[];
};

type ProjectsContent = SectionContent & {
    projects: Project[];
    viewDetailsLabel: string;
};

type GithubContent = SectionContent & {
    stats: GithubStat[];
    surfaceLabel: string;
    surfaceTitle: string;
    snapshotLabel: string;
    snapshotTitle: string;
    repositories: RepositoryItem[];
};

type HighlightsContent = SectionContent & {
    highlights: HighlightItem[];
    ctaLabel: string;
};

type ContactContent = SectionContent & {
    cards: ContactCard[];
    collaborationLabel: string;
    collaborationTitle: string;
    collaborationDescription: string;
    emailLabel: string;
    downloadResumeLabel: string;
};

type ModalContent = {
    architectureLabel: string;
    galleryLabel: string;
    featureLabel: string;
    techLabel: string;
    problemLabel: string;
    solutionLabel: string;
    githubLabel: string;
    githubDetail: string;
};

type AccessibilityContent = {
    toggleMenu: string;
    closeProjectDetails: string;
    closeDeveloperMode: string;
};

type DeveloperModeContent = {
    title: string;
    detail: string;
    footer: string;
};

type Project = {
    id: ProjectId;
    title: string;
    category: string;
    year: string;
    overview: string;
    preview: string[];
    tech: string[];
    architecture: string[];
    features: string[];
    problemFlow: string[];
    solution: string;
    gallery: string[];
    accent: string;
};

const techVisuals: Record<TechName, TechVisual> = {
    React: {
        icon: SiReact,
        iconClassName: 'text-cyan-300',
        badgeClassName: 'border-cyan-400/30 bg-cyan-500/10',
    },
    TypeScript: {
        icon: SiTypescript,
        iconClassName: 'text-cyan-300',
        badgeClassName: 'border-cyan-400/30 bg-cyan-500/10',
    },
    'Next.js': {
        icon: SiNextdotjs,
        iconClassName: 'text-white',
        badgeClassName: 'border-white/15 bg-white/[0.06]',
    },
    'Node.js': {
        icon: SiNodedotjs,
        iconClassName: 'text-emerald-300',
        badgeClassName: 'border-emerald-400/30 bg-emerald-500/10',
    },
    NestJS: {
        icon: SiNestjs,
        iconClassName: 'text-rose-300',
        badgeClassName: 'border-rose-400/30 bg-rose-500/10',
    },
    MongoDB: {
        icon: SiMongodb,
        iconClassName: 'text-green-300',
        badgeClassName: 'border-green-400/30 bg-green-500/10',
    },
    Postgres: {
        icon: SiPostgresql,
        iconClassName: 'text-sky-300',
        badgeClassName: 'border-sky-400/30 bg-sky-500/10',
    },
    Redis: {
        icon: SiRedis,
        iconClassName: 'text-red-300',
        badgeClassName: 'border-red-400/30 bg-red-500/10',
    },
    Docker: {
        icon: SiDocker,
        iconClassName: 'text-blue-300',
        badgeClassName: 'border-blue-400/30 bg-blue-500/10',
    },
    Git: {
        icon: SiGit,
        iconClassName: 'text-orange-300',
        badgeClassName: 'border-orange-400/30 bg-orange-500/10',
    },
    Linux: {
        icon: SiLinux,
        iconClassName: 'text-amber-300',
        badgeClassName: 'border-amber-400/30 bg-amber-500/10',
    },
    Prisma: {
        icon: SiPrisma,
        iconClassName: 'text-zinc-100',
        badgeClassName: 'border-zinc-300/20 bg-zinc-400/10',
    },
    Tailwind: {
        icon: SiTailwindcss,
        iconClassName: 'text-cyan-300',
        badgeClassName: 'border-cyan-400/30 bg-cyan-500/10',
    },
};

type PortfolioContent = {
    navItems: NavItem[];
    header: HeaderContent;
    about: AboutContent;
    stack: StackContent;
    projectsSection: ProjectsContent;
    github: GithubContent;
    highlightsSection: HighlightsContent;
    contact: ContactContent;
    modal: ModalContent;
    accessibility: AccessibilityContent;
    developerMode: DeveloperModeContent;
    footerText: string;
};

const portfolioContent: Record<Locale, PortfolioContent> = {
    en: {
        navItems: [
            { label: 'About', href: '#about' },
            { label: 'Projects', href: '#projects' },
            { label: 'GitHub', href: '#github' },
            { label: 'Contact', href: '#contact' },
        ],
        header: {
            badge: 'Building scalable web applications',
            name: 'Tran Tan Minh',
            role: 'Full Stack Developer',
            description:
                'Building scalable web applications with React, Next.js, Node.js and modern backend technologies.',
            resumeLabel: 'Resume',
            githubLabel: 'GitHub',
            contactLabel: 'Contact',
            scrollLabel: 'Scroll',
            languageLabel: 'Language',
        },
        about: {
            eyebrow: 'About',
            title: 'Full stack delivery across CRM, ERP, HRM, and commerce systems',
            description:
                'Building scalable web applications with React, Next.js, Node.js, and modern backend technologies, backed by 3 years of product delivery across CRM, ERP, HRM, and E-Commerce systems.',
            expertiseLabel: 'Delivery Areas',
            expertise: [
                'CRM',
                'ERP',
                'HRM',
                'E-Commerce',
                'Full Stack',
                'React',
                'Next.js',
                'Node.js',
                'NestJS',
                'Docker',
            ],
            timelineLabel: 'Timeline',
            timeline: [
                {
                    year: '2023',
                    company: 'TD Solution',
                    tracks: ['E-commerce feature rollout'],
                },
                {
                    year: '2024',
                    company: 'Xhero',
                    tracks: ['ERP operations suite', 'CRM automation', 'HRM workspace'],
                },
            ],
        },
        stack: {
            eyebrow: 'Tech Stack',
            title: 'Full-stack technologies for product delivery',
            description:
                'Production technologies selected to ensure performance, maintainability, and development speed. From frontend to backend and infrastructure.',
            techStack: [
                { name: 'React', detail: 'Component-driven UX development' },
                { name: 'Next.js', detail: 'Full-stack framework with SSR/SSG' },
                { name: 'Node.js', detail: 'Server runtime and API services' },
                { name: 'NestJS', detail: 'Enterprise backend architecture' },
                { name: 'MongoDB', detail: 'NoSQL document database' },
                { name: 'Redis', detail: 'In-memory caching and sessions' },
                { name: 'Docker', detail: 'Containerization and deployment' },
                { name: 'TypeScript', detail: 'Type-safe JavaScript development' },
                { name: 'Tailwind', detail: 'Utility-first CSS framework' },
                { name: 'Git', detail: 'Version control and collaboration' },
                { name: 'Linux', detail: 'Server and deployment operations' },
                { name: 'Prisma', detail: 'Database ORM and query builder' },
            ],
        },
        projectsSection: {
            eyebrow: 'Featured Projects',
            title: 'Enterprise workflows shaped into polished product experiences',
            description:
                'Each project card previews the surface area. Click through to inspect architecture, features, technical constraints, and the problem-solving path behind the implementation.',
            viewDetailsLabel: 'View Details',
            projects: [
                {
                    id: 'crm',
                    title: 'CRM',
                    category: 'CRM automation',
                    year: '2024',
                    overview:
                        'CRM delivery focused on dashboard visibility, customer workflows, reporting surfaces, and day-to-day operational clarity.',
                    preview: ['Dashboard', 'Customer', 'Workflow', 'Report'],
                    tech: ['NextJS', 'NodeJS', 'MongoDB', 'Redux', 'Redis', 'Docker', 'Tailwind', 'antd'],
                    architecture: ['Frontend (Next.js)', 'REST API', 'Backend (Node.js)', 'Database(MongoDB)'],
                    features: [
                        'Dashboard visibility',
                        'Customer workflow',
                        'Role-based access',
                        'Reporting',
                        'Search',
                        'Pagination',
                    ],
                    problemFlow: [
                        'Growing customer data',
                        'Slow workflow queries',
                        'Tune MongoDB indexes',
                        'Improve API responsiveness',
                    ],
                    solution:
                        'Supported CRM automation with clearer customer flows, better reporting endpoints, and query tuning so the product stayed responsive under heavier usage.',
                    gallery: ['Customer dashboard', 'Workflow board', 'Reporting view'],
                    accent: 'from-blue-500/30 via-blue-500/10 to-transparent',
                },
                {
                    id: 'erp',
                    title: 'ERP',
                    category: 'Operations suite',
                    year: '2024',
                    overview:
                        'ERP product work spanning planning, task execution, project tracking, and operational statistics in a unified workspace.',
                    preview: ['Project Dashboard', 'Kanban', 'Task', 'Timeline', 'Statistics'],
                    tech: ['NextJS', 'NodeJS', 'MongoDB', 'Redux', 'Redis', 'Docker', 'Tailwind', 'antd'],
                    architecture: ['Frontend (Next.js)', 'REST API', 'Backend (Node.js)', 'Database(MongoDB)'],
                    features: [
                        'Task planning',
                        'Kanban flow',
                        'Milestone timeline',
                        'Role permissions',
                        'Operational statistics',
                        'Team workspace',
                    ],
                    problemFlow: [
                        'Fragmented task ownership',
                        'Low project visibility',
                        'Unify modules',
                        'Create dashboard metrics',
                    ],
                    solution:
                        'Connected planning and execution data into clearer dashboards so teams could track work, ownership, and project progress in one place.',
                    gallery: ['Program dashboard', 'Kanban flow', 'Project statistics'],
                    accent: 'from-cyan-400/25 via-blue-500/10 to-transparent',
                },
                {
                    id: 'hrm',
                    title: 'HRM',
                    category: 'People operations',
                    year: '2024',
                    overview:
                        'HRM workspace experience centered on attendance, leave requests, calendars, and schedule coordination for internal teams.',
                    preview: ['Attendance', 'Calendar', 'Leave', 'Worksheet', 'Setting'],
                    tech: ['NextJS', 'NodeJS', 'MongoDB', 'Redux', 'Redis', 'Docker', 'Tailwind', 'antd'],
                    architecture: ['Frontend (Next.js)', 'REST API', 'Backend (Node.js)', 'Database(MongoDB)', 'Queue'],
                    features: [
                        'Attendance tracking',
                        'Leave approval',
                        'Team calendar',
                        'Worksheet planning',
                        'Permissions',
                        'Notifications',
                    ],
                    problemFlow: [
                        'Manual leave handling',
                        'Inconsistent attendance data',
                        'Automate approval flows',
                        'Centralize policy rules',
                    ],
                    solution:
                        'Improved attendance consistency and built clearer approval and schedule flows so HR operations felt more reliable for employees and admins.',
                    gallery: ['Attendance console', 'Leave approval', 'Schedule workspace'],
                    accent: 'from-sky-500/25 via-indigo-500/10 to-transparent',
                },
                {
                    id: 'ecommerce',
                    title: 'E-Commerce',
                    category: 'Feature rollout',
                    year: '2023',
                    overview:
                        'E-commerce feature delivery across product discovery, cart flows, checkout, and order handling during work at TD Solution.',
                    preview: ['Home', 'Product', 'Cart', 'Checkout', 'Order'],
                    tech: ['NextJS', 'NestJS', 'MongoDB', 'Redis', 'Docker', 'Tailwind', 'antd'],
                    architecture: [
                        'Frontend (Next.js)',
                        'REST API',
                        'Backend (NestJS)',
                        'Database(MongoDB)',
                        'Cache(Redis)',
                    ],
                    features: [
                        'Catalog browsing',
                        'Product detail',
                        'Cart and checkout',
                        'Order tracking',
                        'Promotion rules',
                        'Inventory sync',
                    ],
                    problemFlow: [
                        'Cart drop-off',
                        'Slow product lookup',
                        'Optimize catalog queries',
                        'Streamline checkout',
                    ],
                    solution:
                        'Supported feature rollout by simplifying checkout steps, improving catalog responsiveness, and keeping order flow states clearer across the product.',
                    gallery: ['Landing page', 'Product grid', 'Checkout flow'],
                    accent: 'from-fuchsia-400/20 via-blue-500/10 to-transparent',
                },
            ],
        },
        github: {
            eyebrow: 'GitHub',
            title: 'GitHub profile and delivery snapshot',
            description:
                'A portfolio section aligned to the CV: public profile at github.com/minh0808, plus the domains and delivery areas reflected in recent work.',
            surfaceLabel: 'Profile Surface',
            surfaceTitle: 'Illustrative activity grid',
            snapshotLabel: 'Delivery Snapshot',
            snapshotTitle: 'Selected experience areas',
            stats: [
                {
                    label: 'Experience',
                    value: '3',
                    detail: 'Years of product delivery across frontend and backend work',
                },
                { label: 'Domains', value: '4', detail: 'CRM, ERP, HRM, and E-Commerce systems' },
                { label: 'Core Stack', value: '10', detail: 'Technologies explicitly listed in the CV core stack' },
                { label: 'GitHub', value: 'minh0808', detail: 'Public profile used for portfolio and code sharing' },
            ],
            repositories: [
                {
                    name: 'GitHub Profile',
                    type: 'Profile',
                    note: 'github.com/minh0808 for public profile updates and portfolio code.',
                },
                {
                    name: 'CRM Automation',
                    type: '2024',
                    note: 'Customer workflow design, dashboards, and reporting support at Xhero.',
                },
                {
                    name: 'ERP Operations Suite',
                    type: '2024',
                    note: 'Planning, task execution, and project tracking in one operational workspace.',
                },
                {
                    name: 'HRM Workspace',
                    type: '2024',
                    note: 'Attendance, leave, and schedule systems supporting internal team operations.',
                },
                {
                    name: 'E-Commerce Rollout',
                    type: '2023',
                    note: 'Feature delivery work shipped during time at TD Solution.',
                },
            ],
        },
        highlightsSection: {
            eyebrow: 'Highlights',
            title: 'Key resume highlights from recent product delivery',
            description:
                'Focused areas pulled directly from the CV: CRM, ERP, HRM, and performance work around MongoDB indexing and API optimization.',
            ctaLabel: 'CV highlight',
            highlights: [
                {
                    label: 'CRM',
                    title: 'Dashboard and customer workflow design',
                    detail: 'Supported CRM delivery with reporting surfaces and clearer customer visibility for internal teams.',
                },
                {
                    label: 'ERP',
                    title: 'Planning and project tracking experience',
                    detail: 'Worked on task flow, timeline visibility, and operational statistics inside an ERP workspace.',
                },
                {
                    label: 'HRM',
                    title: 'Attendance, leave, and schedule systems',
                    detail: 'Built experience around attendance consistency, leave handling, and day-to-day people operations.',
                },
                {
                    label: 'Performance',
                    title: 'MongoDB indexing and API optimization',
                    detail: 'Focused on query tuning and backend responsiveness to keep workflows fast as data volume increased.',
                },
            ],
        },
        contact: {
            eyebrow: 'Contact',
            title: 'Open to full stack product work and engineering collaboration',
            description:
                'Live contact details from the CV are wired into the portfolio for direct email, GitHub, and phone access.',
            collaborationLabel: 'Ready to collaborate',
            collaborationTitle: 'Building scalable web applications with clean workflows and dependable delivery.',
            collaborationDescription:
                'I build web applications from frontend to backend, focusing on clean architecture, high performance, and scalability. Each project in my portfolio showcases the development process, the technologies used, and the solutions I personally implemented.',
            emailLabel: 'Email Trần Tấn Minh',
            downloadResumeLabel: 'Download resume',
            cards: [
                {
                    label: 'Email',
                    value: 'tanminh080803@gmail.com',
                    href: 'mailto:tanminh080803@gmail.com',
                    icon: Mail,
                },
                { label: 'GitHub', value: 'github.com/minh0808', href: 'https://github.com/minh0808', icon: Code2 },
                { label: 'Phone', value: '+84 932 876 160', href: 'tel:+84932876160', icon: Phone },
            ],
        },
        modal: {
            architectureLabel: 'Architecture',
            galleryLabel: 'Gallery',
            featureLabel: 'Feature',
            techLabel: 'Tech',
            problemLabel: 'Problem',
            solutionLabel: 'Solution',
            githubLabel: 'GitHub',
            githubDetail: 'Private repository. Case study access and source walkthroughs can be shared on request.',
        },
        accessibility: {
            toggleMenu: 'Toggle menu',
            closeProjectDetails: 'Close project details',
            closeDeveloperMode: 'Close developer mode',
        },
        developerMode: {
            title: 'Developer Mode',
            detail: 'Konami code unlocked.',
            footer: 'Hidden detail for teams who inspect the interface carefully.',
        },
        footerText: 'Designed & Built by Tran Tan Minh · 2026',
    },
    vi: {
        navItems: [
            { label: 'Giới thiệu', href: '#about' },
            { label: 'Dự án', href: '#projects' },
            { label: 'GitHub', href: '#github' },
            { label: 'Liên hệ', href: '#contact' },
        ],
        header: {
            badge: 'Xây dựng ứng dụng web có khả năng mở rộng',
            name: 'Tran Tan Minh',
            role: 'Lập trình viên Full Stack',
            description:
                'Xây dựng ứng dụng web có khả năng mở rộng với React, Next.js, Node.js và các công nghệ backend hiện đại.',
            resumeLabel: 'CV',
            githubLabel: 'GitHub',
            contactLabel: 'Liên hệ',
            scrollLabel: 'Cuộn xuống',
            languageLabel: 'Ngôn ngữ',
        },
        about: {
            eyebrow: 'Giới thiệu',
            title: 'Kinh nghiệm full stack trên CRM, ERP, HRM, và thương mại điện tử',
            description:
                'Xây dựng ứng dụng web có khả năng mở rộng với React, Next.js, Node.js và các công nghệ backend hiện đại, cùng hơn 2 năm tham gia phát triển sản phẩm trong các hệ thống CRM, ERP, HRM, và Thương mại điện tử.',
            expertiseLabel: 'Mảng triển khai',
            expertise: [
                'CRM',
                'ERP',
                'HRM',
                'Thương mại điện tử',
                'Full Stack',
                'React',
                'Next.js',
                'Node.js',
                'NestJS',
                'Docker',
            ],
            timelineLabel: 'Hành trình',
            timeline: [
                {
                    year: '2023',
                    company: 'TD Solution',
                    tracks: ['Triển khai tính năng E-Commerce'],
                },
                {
                    year: '2024',
                    company: 'Xhero',
                    tracks: ['Bộ giải pháp ERP', 'Tự động hóa CRM', 'Workspace HRM'],
                },
            ],
        },
        stack: {
            eyebrow: 'Công nghệ',
            title: 'Công nghệ full-stack cho phát triển sản phẩm',
            description:
                'Công nghệ sản xuất được lựa chọn để đảm bảo hiệu năng, khả năng bảo trì và tốc độ phát triển. Từ frontend đến backend và hạ tầng.',
            techStack: [
                { name: 'React', detail: 'Phát triển giao diện thành phần' },
                { name: 'Next.js', detail: 'Framework full-stack với SSR/SSG' },
                { name: 'Node.js', detail: 'Runtime server và API services' },
                { name: 'NestJS', detail: 'Kiến trúc backend doanh nghiệp' },
                { name: 'MongoDB', detail: 'Cơ sở dữ liệu NoSQL' },
                { name: 'Redis', detail: 'Cache và quản lý phiên' },
                { name: 'Docker', detail: 'Containerization và triển khai' },
                { name: 'TypeScript', detail: 'Phát triển JavaScript an toàn kiểu' },
                { name: 'Tailwind', detail: 'Framework CSS utility-first' },
                { name: 'Git', detail: 'Quản lý phiên bản và cộng tác' },
                { name: 'Linux', detail: 'Vận hành máy chủ và triển khai' },
                { name: 'Prisma', detail: 'ORM và truy vấn cơ sở dữ liệu' },
            ],
        },
        projectsSection: {
            eyebrow: 'Dự án nổi bật',
            title: 'Quy trình doanh nghiệp được đóng gói thành trải nghiệm sản phẩm hoàn chỉnh',
            description:
                'Mỗi project card thể hiện bề mặt tính năng. Nhấn để xem kiến trúc, chức năng, ràng buộc kỹ thuật và cách giải quyết bài toán triển khai.',
            viewDetailsLabel: 'Xem chi tiết',
            projects: [
                {
                    id: 'crm',
                    title: 'CRM',
                    category: 'Tự động hóa CRM',
                    year: '2024',
                    overview:
                        'Triển khai CRM tập trung vào dashboard, luồng khách hàng, báo cáo và độ rõ ràng trong vận hành hằng ngày.',
                    preview: ['Dashboard', 'Khách hàng', 'Quy trình', 'Báo cáo'],
                    tech: ['NextJS', 'NodeJS', 'MongoDB', 'Redux', 'Redis', 'Docker', 'Tailwind', 'antd'],
                    architecture: ['Frontend (Next.js)', 'REST API', 'Backend (Node.js)', 'Database(MongoDB)'],
                    features: [
                        'Hiển thị dashboard',
                        'Luồng khách hàng',
                        'Phân quyền',
                        'Báo cáo',
                        'Tìm kiếm',
                        'Phân trang',
                    ],
                    problemFlow: [
                        'Dữ liệu khách hàng tăng nhanh',
                        'Truy vấn workflow chậm',
                        'Tối ưu chỉ mục MongoDB',
                        'Cải thiện tốc độ API',
                    ],
                    solution:
                        'Hỗ trợ tự động hóa CRM bằng cách làm rõ luồng khách hàng, tối ưu endpoint báo cáo và tuning truy vấn để hệ thống vẫn phản hồi tốt khi dữ liệu tăng.',
                    gallery: ['Dashboard khách hàng', 'Bảng workflow', 'Màn hình báo cáo'],
                    accent: 'from-blue-500/30 via-blue-500/10 to-transparent',
                },
                {
                    id: 'erp',
                    title: 'ERP',
                    category: 'Bộ giải pháp vận hành',
                    year: '2024',
                    overview:
                        'Công việc ERP bao gồm lập kế hoạch, thực thi tác vụ, theo dõi dự án và thống kê vận hành trong một không gian làm việc thống nhất.',
                    preview: ['Bảng dự án', 'Kanban', 'Công việc', 'Tiến độ', 'Thống kê'],
                    tech: ['NextJS', 'NodeJS', 'MongoDB', 'Redux', 'Redis', 'Docker', 'Tailwind', 'antd'],
                    architecture: ['Frontend (Next.js)', 'REST API', 'Backend (Node.js)', 'Database(MongoDB)'],
                    features: [
                        'Lập kế hoạch tác vụ',
                        'Luồng Kanban',
                        'Timeline cột mốc',
                        'Phân quyền',
                        'Thống kê vận hành',
                        'Không gian làm việc nhóm',
                    ],
                    problemFlow: [
                        'Quyền sở hữu tác vụ rời rạc',
                        'Thiếu góc nhìn dự án',
                        'Hợp nhất các module',
                        'Tạo chỉ số dashboard',
                    ],
                    solution:
                        'Kết nối dữ liệu lập kế hoạch và thực thi thành dashboard rõ ràng hơn để đội ngũ theo dõi công việc, ownership và tiến độ trong một nơi.',
                    gallery: ['Dashboard chương trình', 'Luồng Kanban', 'Thống kê dự án'],
                    accent: 'from-cyan-400/25 via-blue-500/10 to-transparent',
                },
                {
                    id: 'hrm',
                    title: 'HRM',
                    category: 'Vận hành nhân sự',
                    year: '2024',
                    overview:
                        'Trải nghiệm HRM tập trung vào chấm công, nghỉ phép, lịch và phối hợp lịch làm việc cho các nhóm nội bộ.',
                    preview: ['Chấm công', 'Lịch', 'Nghỉ phép', 'Worksheet', 'Cài đặt'],
                    tech: ['NextJS', 'NodeJS', 'MongoDB', 'Redux', 'Redis', 'Docker', 'Tailwind', 'antd'],
                    architecture: ['Frontend (Next.js)', 'REST API', 'Backend (Node.js)', 'Database(MongoDB)', 'Queue'],
                    features: [
                        'Theo dõi chấm công',
                        'Phê duyệt nghỉ phép',
                        'Lịch nhóm',
                        'Lập kế hoạch công việc',
                        'Phân quyền',
                        'Thông báo',
                    ],
                    problemFlow: [
                        'Xử lý nghỉ phép thủ công',
                        'Dữ liệu chấm công không nhất quán',
                        'Tự động hóa phê duyệt',
                        'Tập trung hóa quy định',
                    ],
                    solution:
                        'Cải thiện tính nhất quán của chấm công và xây dựng luồng phê duyệt, lịch làm việc rõ ràng hơn để vận hành HR ổn định cho cả nhân viên lẫn admin.',
                    gallery: ['Màn hình chấm công', 'Phê duyệt nghỉ phép', 'Workspace lịch làm việc'],
                    accent: 'from-sky-500/25 via-indigo-500/10 to-transparent',
                },
                {
                    id: 'ecommerce',
                    title: 'E-Commerce',
                    category: 'Triển khai tính năng',
                    year: '2023',
                    overview:
                        'Phát triển tính năng thương mại điện tử quanh tìm kiếm sản phẩm, giỏ hàng, checkout và xử lý đơn trong thời gian làm tại TD Solution.',
                    preview: ['Trang chủ', 'Sản phẩm', 'Giỏ hàng', 'Thanh toán', 'Đơn hàng'],
                    tech: ['NextJS', 'NestJS', 'MongoDB', 'Redis', 'Docker', 'Tailwind', 'antd'],
                    architecture: [
                        'Frontend (Next.js)',
                        'REST API',
                        'Backend (NestJS)',
                        'Database(MongoDB)',
                        'Cache(Redis)',
                    ],
                    features: [
                        'Duyệt catalog',
                        'Chi tiết sản phẩm',
                        'Giỏ hàng và thanh toán',
                        'Theo dõi đơn hàng',
                        'Quy tắc khuyến mãi',
                        'Đồng bộ tồn kho',
                    ],
                    problemFlow: [
                        'Tỷ lệ bỏ giỏ cao',
                        'Tìm kiếm sản phẩm chậm',
                        'Tối ưu truy vấn catalog',
                        'Tinh gọn checkout',
                    ],
                    solution:
                        'Hỗ trợ rollout tính năng bằng cách rút gọn các bước thanh toán, cải thiện tốc độ catalog và làm rõ trạng thái luồng đơn hàng trong toàn bộ sản phẩm.',
                    gallery: ['Trang đích', 'Lưới sản phẩm', 'Luồng thanh toán'],
                    accent: 'from-fuchsia-400/20 via-blue-500/10 to-transparent',
                },
            ],
        },
        github: {
            eyebrow: 'GitHub',
            title: 'Hồ sơ GitHub và bức tranh triển khai',
            description:
                'Khu vực portfolio đồng bộ với CV: hồ sơ công khai tại github.com/minh0808 cùng các domain và mảng công việc gần đây.',
            surfaceLabel: 'Bề mặt hồ sơ',
            surfaceTitle: 'Lưới hoạt động minh họa',
            snapshotLabel: 'Tóm tắt triển khai',
            snapshotTitle: 'Các mảng kinh nghiệm nổi bật',
            stats: [
                {
                    label: 'Kinh nghiệm',
                    value: '3',
                    detail: 'Năm tham gia phát triển sản phẩm ở cả frontend và backend',
                },
                { label: 'Domain', value: '4', detail: 'CRM, ERP, HRM, và Thương mại điện tử' },
                {
                    label: 'Core Stack',
                    value: '10',
                    detail: 'Các công nghệ được liệt kê trực tiếp trong phần core stack của CV',
                },
                {
                    label: 'GitHub',
                    value: 'minh0808',
                    detail: 'Hồ sơ công khai dùng cho portfolio và chia sẻ mã nguồn',
                },
            ],
            repositories: [
                {
                    name: 'GitHub Profile',
                    type: 'Profile',
                    note: 'github.com/minh0808 là nơi cập nhật hồ sơ công khai và source của portfolio.',
                },
                {
                    name: 'CRM Automation',
                    type: '2024',
                    note: 'Thiết kế workflow khách hàng, dashboard và báo cáo trong quá trình làm tại Xhero.',
                },
                {
                    name: 'ERP Operations Suite',
                    type: '2024',
                    note: 'Lập kế hoạch, thực thi tác vụ và theo dõi dự án trong một workspace vận hành thống nhất.',
                },
                {
                    name: 'HRM Workspace',
                    type: '2024',
                    note: 'Chấm công, nghỉ phép và lịch làm việc phục vụ vận hành nội bộ.',
                },
                {
                    name: 'E-Commerce Rollout',
                    type: '2023',
                    note: 'Các tính năng thương mại điện tử được triển khai trong thời gian làm tại TD Solution.',
                },
            ],
        },
        highlightsSection: {
            eyebrow: 'Điểm nhấn',
            title: 'Các điểm nhấn chính từ quá trình triển khai gần đây',
            description:
                'Nội dung được rút trực tiếp từ CV: CRM, ERP, HRM và tối ưu hiệu năng với MongoDB indexing cùng API optimization.',
            ctaLabel: 'Điểm nhấn CV',
            highlights: [
                {
                    label: 'CRM',
                    title: 'Thiết kế dashboard và luồng khách hàng',
                    detail: 'Hỗ trợ triển khai CRM với bề mặt báo cáo rõ ràng hơn và khả năng quan sát khách hàng tốt hơn cho team nội bộ.',
                },
                {
                    label: 'ERP',
                    title: 'Kinh nghiệm lập kế hoạch và theo dõi dự án',
                    detail: 'Làm việc với luồng tác vụ, khả năng nhìn timeline và các thống kê vận hành trong một workspace ERP.',
                },
                {
                    label: 'HRM',
                    title: 'Chấm công, nghỉ phép và hệ thống lịch làm việc',
                    detail: 'Xây dựng trải nghiệm quanh tính nhất quán của chấm công, xử lý nghỉ phép và vận hành nhân sự hằng ngày.',
                },
                {
                    label: 'Hiệu năng',
                    title: 'Tối ưu MongoDB indexing và API',
                    detail: 'Tập trung tuning truy vấn và độ phản hồi backend để workflow vẫn nhanh khi dữ liệu tăng lên.',
                },
            ],
        },
        contact: {
            eyebrow: 'Liên hệ',
            title: 'Sẵn sàng cho công việc sản phẩm full stack và cộng tác kỹ thuật',
            description:
                'Thông tin liên hệ từ CV đã được gắn trực tiếp vào portfolio để gửi email, vào GitHub và gọi điện.',
            collaborationLabel: 'Sẵn sàng hợp tác',
            collaborationTitle:
                'Xây dựng ứng dụng web có khả năng mở rộng với luồng làm việc rõ ràng và quá trình triển khai đáng tin cậy.',
            collaborationDescription:
                'Tôi xây dựng các ứng dụng web từ frontend đến backend với trọng tâm là kiến trúc rõ ràng, hiệu năng tốt và khả năng mở rộng. Mỗi dự án trong portfolio thể hiện quy trình phát triển, công nghệ sử dụng và những giải pháp tôi trực tiếp thực hiện.',
            emailLabel: 'Email Trần Tấn Minh',
            downloadResumeLabel: 'Tải CV',
            cards: [
                {
                    label: 'Email',
                    value: 'tanminh080803@gmail.com',
                    href: 'mailto:tanminh080803@gmail.com',
                    icon: Mail,
                },
                { label: 'GitHub', value: 'github.com/minh0808', href: 'https://github.com/minh0808', icon: Code2 },
                { label: 'Điện thoại', value: '+84 932 876 160', href: 'tel:+84932876160', icon: Phone },
            ],
        },
        modal: {
            architectureLabel: 'Kiến trúc',
            galleryLabel: 'Màn hình',
            featureLabel: 'Tính năng',
            techLabel: 'Công nghệ',
            problemLabel: 'Bài toán',
            solutionLabel: 'Giải pháp',
            githubLabel: 'GitHub',
            githubDetail: 'Bảo mật.',
        },
        accessibility: {
            toggleMenu: 'Mở menu',
            closeProjectDetails: 'Đóng chi tiết dự án',
            closeDeveloperMode: 'Đóng chế độ nhà phát triển',
        },
        developerMode: {
            title: 'Chế độ nhà phát triển',
            detail: 'Đã mở khóa bằng Konami code.',
            footer: 'Một chi tiết ẩn dành cho những team thích soi kỹ giao diện.',
        },
        footerText: 'Thiết kế & phát triển bởi Tran Tan Minh · 2026',
    },
};

const contributionCells = Array.from({ length: 84 }, (_, index) => {
    const levels = ['bg-white/5', 'bg-blue-500/20', 'bg-blue-500/35', 'bg-blue-400/55', 'bg-blue-300/80'];

    return levels[(index * 7 + Math.floor(index / 3)) % levels.length];
});

const heroCards: HeroCard[] = [
    {
        tech: 'React',
        label: 'React',
        position: 'left-[10%] top-[10%]',
        depth: 92,
    },
    {
        tech: 'Next.js',
        label: 'Next',
        position: 'right-[10%] top-[14%]',
        depth: 88,
    },
    {
        tech: 'TypeScript',
        label: 'TypeScript',
        position: 'left-[12%] top-[33%]',
        depth: 72,
    },
    {
        tech: 'MongoDB',
        label: 'Mongo',
        position: 'right-[12%] top-[38%]',
        depth: 98,
    },
    {
        tech: 'Node.js',
        label: 'Node',
        position: 'left-[14%] top-[53%]',
        depth: 50,
    },
    {
        tech: 'NestJS',
        label: 'NestJS',
        position: 'right-[12%] top-[64%]',
        depth: 60,
    },
    {
        tech: 'Docker',
        label: 'Docker',
        position: 'left-[18%] bottom-[10%]',
        depth: 30,
    },
];

const terminalLines = [
    '$ npm run dev',
    'ready - started server on http://localhost:3000',
    'event - compiled / in 548ms',
    'feature - Developer Mode unlocked',
];

const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

const localeOptions: Locale[] = ['vi', 'en'];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
    return (
        <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-blue-300">{eyebrow}</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
            <p className="text-base leading-7 text-zinc-400 sm:text-lg">{description}</p>
        </div>
    );
}

function LanguageToggle({
    locale,
    onChange,
    label,
    compact = false,
}: {
    locale: Locale;
    onChange: (nextLocale: Locale) => void;
    label: string;
    compact?: boolean;
}) {
    return (
        <div className={`flex items-center ${compact ? '' : 'gap-3'}`}>
            {!compact ? <span className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">{label}</span> : null}
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
                {localeOptions.map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onChange(option)}
                        aria-pressed={locale === option}
                        className={`rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.24em] transition ${
                            locale === option ? 'bg-white text-zinc-950' : 'text-zinc-400 hover:text-white'
                        }`}
                    >
                        {option.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}

function ProjectPreview({ project }: { project: Project }) {
    return (
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/50 p-5">
            <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-90 transition duration-500 group-hover:scale-110`}
            />
            <div className="relative space-y-4">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-white/45">
                    <span>{project.title}</span>
                    <span>{project.year}</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/45 p-3">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm text-zinc-200">
                        {project.preview.map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-white/8 bg-white/[0.04] px-3 py-4 text-left transition duration-300 group-hover:-translate-y-0.5"
                            >
                                <div className="mb-2 h-1.5 w-12 rounded-full bg-white/15" />
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PortfolioPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [locale, setLocale] = useState<Locale>('en');
    const [selectedProjectId, setSelectedProjectId] = useState<ProjectId | null>(null);
    const [developerMode, setDeveloperMode] = useState(false);
    const [supportsAmbientMotion, setSupportsAmbientMotion] = useState(false);
    const sequenceRef = useRef<string[]>([]);
    const reduceMotion = useReducedMotion();
    const allowAmbientMotion = supportsAmbientMotion && !reduceMotion;
    const content = portfolioContent[locale];
    const selectedProject =
        content.projectsSection.projects.find((project) => project.id === selectedProjectId) ?? null;
    const hoverLiftSmall = allowAmbientMotion ? { scale: 1.02, y: -2 } : undefined;
    const hoverLiftCard = allowAmbientMotion ? { y: -8, scale: 1.01 } : undefined;
    const hoverLiftSimple = allowAmbientMotion ? { y: -6 } : undefined;
    const tapPressCard = allowAmbientMotion ? { scale: 0.995 } : undefined;
    const cursorX = useMotionValue(-144);
    const cursorY = useMotionValue(-144);
    const cursorOpacity = useMotionValue(0);
    const smoothCursorX = useSpring(cursorX, { stiffness: 220, damping: 34, mass: 0.55 });
    const smoothCursorY = useSpring(cursorY, { stiffness: 220, damping: 34, mass: 0.55 });
    const smoothCursorOpacity = useSpring(cursorOpacity, { stiffness: 260, damping: 30, mass: 0.4 });

    const reveal = (delay = 0, axis: 'x' | 'y' = 'y') => ({
        initial: allowAmbientMotion ? { opacity: 0, [axis]: axis === 'y' ? 24 : -24 } : false,
        whileInView: allowAmbientMotion ? { opacity: 1, x: 0, y: 0 } : undefined,
        viewport: allowAmbientMotion ? { once: true, amount: 0.2 } : undefined,
        transition: allowAmbientMotion ? { duration: 0.6, delay } : undefined,
    });

    useEffect(() => {
        if (reduceMotion) {
            cursorOpacity.set(0);
            return;
        }

        const pointerQuery = window.matchMedia('(pointer: fine)');

        if (!pointerQuery.matches) {
            cursorOpacity.set(0);
            return;
        }

        const offset = 144;

        const onPointerMove = (event: PointerEvent) => {
            cursorX.set(event.clientX - offset);
            cursorY.set(event.clientY - offset);
            cursorOpacity.set(0.5);
        };

        const onPointerLeave = () => {
            cursorOpacity.set(0);
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerleave', onPointerLeave);

        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerleave', onPointerLeave);
        };
    }, [cursorOpacity, cursorX, cursorY, reduceMotion]);

    useEffect(() => {
        const ambientQuery = window.matchMedia('(min-width: 1024px) and (pointer: fine)');

        // Defer setState to avoid cascading renders
        queueMicrotask(() => {
            setSupportsAmbientMotion(ambientQuery.matches);
        });

        const onAmbientMotionChange = (event: MediaQueryListEvent) => {
            setSupportsAmbientMotion(event.matches);
        };

        ambientQuery.addEventListener('change', onAmbientMotionChange);

        return () => {
            ambientQuery.removeEventListener('change', onAmbientMotionChange);
        };
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
            const next = [...sequenceRef.current, key].slice(-konamiCode.length);

            sequenceRef.current = next;

            if (next.join('|') === konamiCode.join('|')) {
                setDeveloperMode(true);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen || selectedProject ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mobileMenuOpen, selectedProjectId, selectedProject]);

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_44%)]" />
            <motion.div
                className="pointer-events-none fixed left-0 top-0 hidden h-72 w-72 rounded-full bg-blue-500/18 blur-3xl md:block"
                style={{
                    x: smoothCursorX,
                    y: smoothCursorY,
                    opacity: smoothCursorOpacity,
                    willChange: 'transform, opacity',
                }}
            />

            <header className="fixed top-0 z-50 w-full border-b border-white/8 bg-black/40 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
                    <a href="#home" className="font-display text-lg font-semibold tracking-[0.22em] text-white">
                        TTM
                    </a>
                    <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
                        {content.navItems.map((item) => (
                            <a key={item.href} href={item.href} className="transition hover:text-white">
                                {item.label}
                            </a>
                        ))}
                        <a href="/Tran-Tan-Minh.pdf" download className="transition hover:text-white">
                            {content.header.resumeLabel}
                        </a>
                        <LanguageToggle locale={locale} onChange={setLocale} label={content.header.languageLabel} />
                    </nav>
                    <div className="flex items-center gap-3 md:hidden">
                        <LanguageToggle
                            locale={locale}
                            onChange={setLocale}
                            label={content.header.languageLabel}
                            compact
                        />
                        <button
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white"
                            aria-label={content.accessibility.toggleMenu}
                            onClick={() => setMobileMenuOpen((current) => !current)}
                        >
                            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {mobileMenuOpen ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/80 px-6 py-24 backdrop-blur-xl md:hidden"
                    >
                        <div className="card-surface mx-auto flex max-w-sm flex-col rounded-[28px] p-6">
                            {content.navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center justify-between border-b border-white/8 py-4 text-lg text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                    <ChevronRight size={18} className="text-zinc-500" />
                                </a>
                            ))}
                            <a
                                href="/Tran-Tan-Minh.pdf"
                                download
                                className="mt-4 button-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FileText size={16} />
                                {content.header.resumeLabel}
                            </a>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pb-24 sm:px-8 lg:px-10">
                <section
                    id="home"
                    className="grid min-h-[calc(100vh-84px)] mt-5 items-center gap-16 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-16"
                >
                    <motion.div {...reveal(0)} className="max-w-2xl space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
                            <Sparkles size={14} className="text-blue-300" />
                            {content.header.badge}
                        </div>

                        <div className="space-y-5">
                            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">{content.header.name}</p>
                            <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                                {content.header.role}
                            </h1>
                            <p className="max-w-xl text-lg leading-8 text-zinc-400 sm:text-xl">
                                {content.header.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a href="/Tran-Tan-Minh.pdf" download className="button-primary">
                                <FileText size={18} />
                                {content.header.resumeLabel}
                            </a>
                            <a
                                href="https://github.com/minh0808"
                                target="_blank"
                                rel="noreferrer"
                                className="button-secondary"
                            >
                                <Code2 size={18} />
                                {content.header.githubLabel}
                            </a>
                            <a href="#contact" className="button-secondary">
                                <Mail size={18} />
                                {content.header.contactLabel}
                            </a>
                        </div>

                        <a
                            href="#about"
                            className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-zinc-500 transition hover:text-white"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-base">
                                ↓
                            </span>
                            {content.header.scrollLabel}
                        </a>
                    </motion.div>

                    <motion.div
                        {...reveal(0.12)}
                        className="relative flex min-h-[420px] items-center justify-center [perspective:1400px]"
                    >
                        <motion.div
                            animate={
                                !allowAmbientMotion
                                    ? undefined
                                    : { y: [-8, 8, -8], rotateX: [8, 10, 8], rotateY: [-14, -8, -14] }
                            }
                            transition={
                                !allowAmbientMotion
                                    ? undefined
                                    : { duration: 9, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
                            }
                            className="relative h-[500px] w-full max-w-[500px] [transform-style:preserve-3d]"
                        >
                            <div className="absolute inset-6 rounded-[36px] border border-white/10 bg-white/[0.03] shadow-[0_40px_100px_rgba(0,0,0,0.38)] backdrop-blur-2xl" />
                            <div className="absolute inset-12 rounded-[32px] border border-white/8 bg-gradient-to-br from-white/[0.08] to-transparent" />
                            {heroCards.map((card, index) => {
                                const visual = techVisuals[card.tech];
                                const Icon = visual.icon;

                                return (
                                    <motion.div
                                        key={card.label}
                                        animate={
                                            !allowAmbientMotion
                                                ? undefined
                                                : { y: [0, index % 2 === 0 ? -8 : 8, 0], rotateZ: [0, index - 2, 0] }
                                        }
                                        transition={
                                            !allowAmbientMotion
                                                ? undefined
                                                : {
                                                      duration: 4 + index,
                                                      repeat: Number.POSITIVE_INFINITY,
                                                      ease: 'easeInOut',
                                                  }
                                        }
                                        className={`absolute ${card.position}`}
                                        style={{ transform: `translateZ(${card.depth}px)` }}
                                    >
                                        <div className="flex min-w-40 items-center justify-center gap-3 rounded-3xl border border-white/10 bg-zinc-950/85 px-5 py-4 text-center shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
                                            <span
                                                className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 ${visual.badgeClassName}`}
                                            >
                                                <Icon className={`h-5 w-5 ${visual.iconClassName}`} />
                                            </span>
                                            <span className="text-lg font-medium text-white">{card.label}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/18 blur-3xl" />
                        </motion.div>
                    </motion.div>
                </section>

                <section id="about" className="deferred-section section-divider py-24">
                    <motion.div {...reveal(0)}>
                        <SectionHeading
                            eyebrow={content.about.eyebrow}
                            title={content.about.title}
                            description={content.about.description}
                        />
                    </motion.div>

                    <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                        <motion.div {...reveal(0.08)} className="card-surface rounded-[32px] p-6 sm:p-8">
                            <p className="mb-6 text-sm uppercase tracking-[0.28em] text-zinc-500">
                                {content.about.expertiseLabel}
                            </p>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {content.about.expertise.map((item, index) => (
                                    <motion.div
                                        key={item}
                                        whileHover={hoverLiftSmall}
                                        className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-zinc-200"
                                        {...reveal(index * 0.04)}
                                    >
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/14 text-blue-300">
                                            <Check size={16} />
                                        </span>
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div {...reveal(0.14, 'x')} className="card-surface rounded-[32px] p-6 sm:p-8">
                            <p className="mb-8 text-sm uppercase tracking-[0.28em] text-zinc-500">
                                {content.about.timelineLabel}
                            </p>
                            <div className="relative pl-5.5">
                                <div className="absolute left-2 top-1 h-[calc(100%-0.25rem)] w-px bg-gradient-to-b from-blue-500 via-blue-400/50 to-transparent" />
                                {content.about.timeline.map((item, index) => (
                                    <motion.div
                                        key={item.year}
                                        {...reveal(index * 0.08, 'x')}
                                        className="relative pb-10 last:pb-0"
                                    >
                                        <span className="absolute left-[-1.45rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-blue-400/40 bg-background">
                                            <span className="h-2 w-2 rounded-full bg-blue-400" />
                                        </span>
                                        <p className="font-display text-2xl text-white">{item.year}</p>
                                        <p className="mt-2 text-lg text-zinc-200">{item.company}</p>
                                        <div className="mt-4 space-y-3 text-zinc-400">
                                            {item.tracks.map((track) => (
                                                <div key={track} className="flex items-center gap-3">
                                                    <span className="text-blue-300">↓</span>
                                                    <span>{track}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="stack" className="deferred-section section-divider py-24">
                    <motion.div {...reveal(0)}>
                        <SectionHeading
                            eyebrow={content.stack.eyebrow}
                            title={content.stack.title}
                            description={content.stack.description}
                        />
                    </motion.div>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {content.stack.techStack.map((item, index) => {
                            const visual = techVisuals[item.name];
                            const Icon = visual.icon;

                            return (
                                <motion.div
                                    key={item.name}
                                    {...reveal(index * 0.03)}
                                    whileHover={hoverLiftCard}
                                    className="group card-surface rounded-[28px] p-5"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="font-display text-xl text-white">{item.name}</p>
                                            <p className="mt-2 text-sm leading-6 text-zinc-400">{item.detail}</p>
                                        </div>
                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-full border transition duration-500 group-hover:rotate-360 ${visual.badgeClassName}`}
                                        >
                                            <Icon className={`h-6 w-6 ${visual.iconClassName}`} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                <section id="projects" className="deferred-section section-divider py-24">
                    <motion.div {...reveal(0)}>
                        <SectionHeading
                            eyebrow={content.projectsSection.eyebrow}
                            title={content.projectsSection.title}
                            description={content.projectsSection.description}
                        />
                    </motion.div>

                    <div className="mt-12 grid gap-6 xl:grid-cols-2">
                        {content.projectsSection.projects.map((project, index) => (
                            <motion.button
                                key={project.id}
                                type="button"
                                {...reveal(index * 0.05)}
                                whileHover={hoverLiftCard}
                                whileTap={tapPressCard}
                                onClick={() => setSelectedProjectId(project.id)}
                                className="group card-surface w-full rounded-[32px] p-6 text-left transition"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                            {project.category}
                                        </p>
                                        <h3 className="font-display mt-3 text-3xl text-white">{project.title}</h3>
                                    </div>
                                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-zinc-400">
                                        {project.year}
                                    </span>
                                </div>

                                <div className="mt-6 overflow-hidden rounded-[28px] transition duration-500 group-hover:scale-[1.015]">
                                    <ProjectPreview project={project} />
                                </div>

                                <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">{project.overview}</p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-zinc-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-blue-300">
                                    {content.projectsSection.viewDetailsLabel}
                                    <ArrowRight size={15} />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </section>

                <section id="github" className="deferred-section section-divider py-24">
                    <motion.div {...reveal(0)}>
                        <SectionHeading
                            eyebrow={content.github.eyebrow}
                            title={content.github.title}
                            description={content.github.description}
                        />
                    </motion.div>

                    <div className="mt-12 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
                        <motion.div {...reveal(0.08)} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {content.github.stats.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        {...reveal(index * 0.04)}
                                        className="card-surface rounded-[28px] p-6"
                                    >
                                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">{item.label}</p>
                                        <p className="font-display mt-4 text-3xl text-white">{item.value}</p>
                                        <p className="mt-2 text-sm leading-6 text-zinc-400">{item.detail}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="card-surface rounded-[32px] p-6 sm:p-8">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                            {content.github.surfaceLabel}
                                        </p>
                                        <h3 className="font-display mt-3 text-2xl text-white">
                                            {content.github.surfaceTitle}
                                        </h3>
                                    </div>
                                    <BarChart3 className="text-blue-300" />
                                </div>
                                <div className="mt-8 grid grid-cols-12 gap-2 sm:grid-cols-14">
                                    {contributionCells.map((cell, index) => (
                                        <div key={`${cell}-${index}`} className={`aspect-square rounded-sm ${cell}`} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div {...reveal(0.14)} className="card-surface rounded-[32px] p-6 sm:p-8">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                        {content.github.snapshotLabel}
                                    </p>
                                    <h3 className="font-display mt-3 text-2xl text-white">
                                        {content.github.snapshotTitle}
                                    </h3>
                                </div>
                                <Code2 className="text-blue-300" />
                            </div>

                            <div className="mt-8 space-y-4">
                                {content.github.repositories.map((repo) => (
                                    <div
                                        key={repo.name}
                                        className="rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-5"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="font-display text-xl text-white">{repo.name}</p>
                                                <p className="mt-2 text-sm text-zinc-400">{repo.note}</p>
                                            </div>
                                            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-zinc-500">
                                                {repo.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="blog" className="deferred-section section-divider py-24">
                    <motion.div {...reveal(0)}>
                        <SectionHeading
                            eyebrow={content.highlightsSection.eyebrow}
                            title={content.highlightsSection.title}
                            description={content.highlightsSection.description}
                        />
                    </motion.div>

                    <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {content.highlightsSection.highlights.map((item, index) => (
                            <motion.article
                                key={item.title}
                                {...reveal(index * 0.04)}
                                whileHover={hoverLiftSimple}
                                className="card-surface flex flex-col justify-between rounded-[28px] p-5"
                            >
                                <>
                                    <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">{item.label}</p>
                                    <h3 className="font-display mt-5 text-xl text-white">{item.title}</h3>
                                    <p className="mt-4 text-sm leading-6 text-zinc-400">{item.detail}</p>
                                </>
                                <div className="mt-5 inline-flex items-center gap-2 text-sm text-blue-300">
                                    {content.highlightsSection.ctaLabel}
                                    <ChevronRight size={16} />
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                <section id="contact" className="deferred-section section-divider py-24">
                    <motion.div {...reveal(0)}>
                        <SectionHeading
                            eyebrow={content.contact.eyebrow}
                            title={content.contact.title}
                            description={content.contact.description}
                        />
                    </motion.div>

                    <div className="mt-12 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {content.contact.cards.map((item, index) => {
                                const Icon = item.icon;
                                const isExternal = item.href.startsWith('http');

                                return (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        target={isExternal ? '_blank' : undefined}
                                        rel={isExternal ? 'noreferrer' : undefined}
                                        {...reveal(index * 0.04)}
                                        whileHover={hoverLiftSimple}
                                        className="card-surface rounded-[28px] p-5"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/12 text-blue-300">
                                                <Icon size={18} />
                                            </span>
                                            <ExternalLink size={16} className="text-zinc-500" />
                                        </div>
                                        <p className="mt-6 text-sm uppercase tracking-[0.28em] text-zinc-500">
                                            {item.label}
                                        </p>
                                        <p className="mt-3 font-display text-lg text-white">{item.value}</p>
                                    </motion.a>
                                );
                            })}
                        </div>

                        <motion.div {...reveal(0.16)} className="card-surface rounded-[32px] p-6 sm:p-8">
                            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                {content.contact.collaborationLabel}
                            </p>
                            <h3 className="font-display mt-4 text-3xl text-white">
                                {content.contact.collaborationTitle}
                            </h3>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
                                {content.contact.collaborationDescription}
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a href="mailto:tanminh080803@gmail.com" className="button-primary">
                                    <Mail size={18} />
                                    {content.contact.emailLabel}
                                </a>
                                <a href="/Tran-Tan-Minh.pdf" download className="button-secondary">
                                    <FileText size={18} />
                                    {content.contact.downloadResumeLabel}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/8 px-6 py-8 text-center text-sm text-zinc-500 sm:px-8 lg:px-10">
                {content.footerText}
            </footer>

            <AnimatePresence>
                {selectedProject ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] overflow-y-auto bg-black/85 px-4 py-10 backdrop-blur-xl sm:px-6"
                    >
                        <motion.div
                            initial={reduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            className="card-surface mx-auto max-w-5xl rounded-[36px] p-6 sm:p-8"
                        >
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                        {selectedProject.category}
                                    </p>
                                    <h2 className="font-display mt-3 text-4xl text-white">{selectedProject.title}</h2>
                                    <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400">
                                        {selectedProject.overview}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedProjectId(null)}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white"
                                    aria-label={content.accessibility.closeProjectDetails}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_0.95fr]">
                                <div className="space-y-8">
                                    <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
                                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                            {content.modal.architectureLabel}
                                        </p>
                                        <div className="mt-6 flex flex-col items-start gap-3">
                                            {selectedProject.architecture.map((step, index) => (
                                                <div key={step} className="flex flex-col items-start gap-3">
                                                    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white">
                                                        {step}
                                                    </div>
                                                    {index < selectedProject.architecture.length - 1 ? (
                                                        <span className="pl-4 text-blue-300">↓</span>
                                                    ) : null}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
                                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                            {content.modal.galleryLabel}
                                        </p>
                                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                            {selectedProject.gallery.map((item) => (
                                                <div
                                                    key={item}
                                                    className="rounded-[22px] border border-white/8 bg-black/35 px-4 py-6 text-center text-zinc-200"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
                                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                            {content.modal.featureLabel}
                                        </p>
                                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                            {selectedProject.features.map((feature) => (
                                                <div key={feature} className="flex items-start gap-3 text-zinc-200">
                                                    <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-blue-500/12 text-blue-300">
                                                        <Check size={15} />
                                                    </span>
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
                                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                            {content.modal.techLabel}
                                        </p>
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {selectedProject.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
                                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                            {content.modal.problemLabel}
                                        </p>
                                        <div className="mt-6 flex flex-col gap-3">
                                            {selectedProject.problemFlow.map((step, index) => (
                                                <div key={step} className="flex flex-col gap-3">
                                                    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-200">
                                                        {step}
                                                    </div>
                                                    {index < selectedProject.problemFlow.length - 1 ? (
                                                        <span className="pl-3 text-blue-300">↓</span>
                                                    ) : null}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
                                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                                            {content.modal.solutionLabel}
                                        </p>
                                        <p className="mt-5 leading-7 text-zinc-300">{selectedProject.solution}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {developerMode ? (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        className="fixed bottom-6 right-6 z-[70] w-[min(92vw,380px)] rounded-[28px] border border-blue-400/30 bg-zinc-950/90 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm uppercase tracking-[0.28em] text-blue-300">
                                    {content.developerMode.title}
                                </p>
                                <p className="mt-2 text-sm text-zinc-400">{content.developerMode.detail}</p>
                            </div>
                            <button
                                type="button"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white"
                                onClick={() => setDeveloperMode(false)}
                                aria-label={content.accessibility.closeDeveloperMode}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="mt-5 rounded-[22px] border border-white/8 bg-black/55 p-4 terminal-text text-sm text-zinc-300">
                            {terminalLines.map((line, index) => (
                                <motion.p
                                    key={line}
                                    initial={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: reduceMotion ? 0 : index * 0.1 }}
                                    className="mb-2 last:mb-0"
                                >
                                    {line}
                                </motion.p>
                            ))}
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
                            <Terminal size={16} className="text-blue-300" />
                            {content.developerMode.footer}
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
