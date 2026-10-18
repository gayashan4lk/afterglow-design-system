import type * as React from 'react';

/** The five accent hues. Each has <hue>, <hue>-ink, <hue>-soft and <hue>-glow tokens. */
export type Hue = 'red' | 'orange' | 'green' | 'blue' | 'purple';
export declare const HUES: Hue[];

/** Lucide outline icons bundled with Afterglow. */
export type IconName =
  | 'arrow-left' | 'arrow-right' | 'arrow-up' | 'arrow-up-right'
  | 'chevron-left' | 'chevron-right' | 'chevron-down'
  | 'search' | 'menu' | 'x' | 'sun' | 'moon'
  | 'info' | 'lightbulb' | 'triangle-alert' | 'octagon-alert' | 'message-square-warning'
  | 'rss' | 'mail' | 'copy' | 'check' | 'link' | 'external-link'
  | 'calendar' | 'clock' | 'list' | 'hash' | 'share-2';
export declare const ICON_NAMES: IconName[];

type AnchorOrButton = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  /** Which icon. */
  name: IconName;
  /** Size in px: 14 (badges, meta), 16 (fields, small buttons), 20 (buttons, nav, callouts; default). The stroke stays 1.75px at every size. */
  size?: number;
  /** Accessible name. Omit when the icon sits beside a word: it is then hidden from screen readers. */
  label?: string;
}
export declare function Icon(props: IconProps): React.ReactElement;

export interface ButtonProps extends AnchorOrButton {
  /** primary: inverse fill, at most once per view. secondary: outlined (default). ghost: text only. */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** md: 40px tall (default). sm: 32px. */
  size?: 'md' | 'sm';
  /** Icon before the label. */
  iconStart?: IconName;
  /** Icon after the label. */
  iconEnd?: IconName;
  /** Renders an <a href> instead of a <button>. */
  href?: string;
  /** The label: a verb, sentence case. */
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface IconButtonProps extends AnchorOrButton {
  /** Which icon. */
  icon: IconName;
  /** Required. Becomes aria-label and the tooltip ("Search", "Open menu"). */
  label: string;
  /** ghost (default) or secondary (outlined). */
  variant?: 'ghost' | 'secondary';
  /** md: 40px (default). sm: 32px. */
  size?: 'md' | 'sm';
  /** For toggles: sets aria-pressed. */
  pressed?: boolean;
  /** Renders an <a href>. */
  href?: string;
}
export declare function IconButton(props: IconButtonProps): React.ReactElement;

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** inline: prose (default, underlined). nav: header navigation. quiet: footer and meta. arrow: "Read the post →". */
  variant?: 'inline' | 'nav' | 'quiet' | 'arrow';
  /** nav only: marks the current page (aria-current="page"), drawn as ink with a 2px underline. */
  current?: boolean;
  /** Opens in a new tab and adds an arrow-up-right icon announced as "(opens in a new tab)". */
  external?: boolean;
}
export declare function Link(props: LinkProps): React.ReactElement;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** accent (default): follows the page's accent. A hue pins it. neutral: grey, for drafts and internal states. */
  hue?: 'accent' | Hue | 'neutral';
  /** Optional 14px icon before the word. */
  icon?: IconName;
  /** One or two words; rendered in capitals. */
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): React.ReactElement;

export interface TagProps extends Omit<AnchorOrButton, 'onClick'> {
  /** Category colour, drawn as a dot before the name. */
  hue?: Hue;
  /** In a filter row: the chosen tag. */
  selected?: boolean;
  /** Post count, after the name. */
  count?: number;
  /** Renders a link to the category. */
  href?: string;
  /** Renders a filter-chip button. */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** The category name, sentence case. */
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): React.ReactElement;

export type MetaItem = React.ReactNode | { label: React.ReactNode; dateTime?: string; href?: string; icon?: IconName };
export interface MetaLineProps extends React.HTMLAttributes<HTMLElement> {
  /** The facts in order: date, reading time, then author or anything else. Objects with dateTime render <time>. */
  items: MetaItem[];
  /** start (default) or center (post header). */
  align?: 'start' | 'center';
  /** Element: div (default) or p. */
  as?: 'div' | 'p';
}
export declare function MetaLine(props: MetaLineProps): React.ReactElement;

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /** horizontal (default, an <hr>) or vertical (between inline items). */
  orientation?: 'horizontal' | 'vertical';
  /** Margin around a horizontal rule: none (default), sm (space-6), md (space-12), lg (space-16). */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}
export declare function Divider(props: DividerProps): React.ReactElement;

export interface AccentProps extends React.HTMLAttributes<HTMLElement> {
  /** The hue accent, accent-ink, accent-soft and accent-glow take inside this element. */
  hue: Hue;
  /** Element to render: div (default), article, main, section… */
  as?: string;
  children?: React.ReactNode;
}
export declare function Accent(props: AccentProps): React.ReactElement;

/* ---------------------------------------------------------------- Navigation */

export interface NavItem {
  label: string;
  href: string;
  /** The page you're on. */
  current?: boolean;
}
export interface HeaderAction { label: string; href?: string; onClick?: () => void }

/** Applies the saved theme (localStorage), else the OS preference, to <html data-theme>. Call before first paint. */
export declare function initTheme(storageKey?: string): void;

export interface ThemeToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** localStorage key for the reader's choice (default "afterglow-theme"). */
  storageKey?: string;
  /** md (header, default) or sm (footer). */
  size?: 'md' | 'sm';
}
export declare function ThemeToggle(props: ThemeToggleProps): React.ReactElement;

export interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** The site's name, set in plain type. */
  siteName: string;
  /** Section after a slash: "Blog". */
  section?: string;
  /** Default "/". */
  homeHref?: string;
  /** Optional single-ink 24px mark left of the name. */
  logo?: React.ReactNode;
  /** Main navigation; mark the current page. */
  nav?: NavItem[];
  /** The one inverse button, rightmost. */
  primaryAction?: HeaderAction;
  /** The outlined button, left of the primary (hidden 768–1023px). */
  secondaryAction?: HeaderAction;
  /** Shows a search icon button that calls this. */
  onSearch?: () => void;
  /** Theme switch (default true). */
  themeToggle?: boolean;
  /** Sticks to the top (default true). */
  sticky?: boolean;
  /** Target of the "Skip to content" link shown on first Tab (default "#main"); false to leave it out. */
  skipHref?: string | false;
}
export declare function SiteHeader(props: SiteHeaderProps): React.ReactElement;

export interface BackLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Destination without the arrow: "Back to changelog". */
  children: React.ReactNode;
}
export declare function BackLink(props: BackLinkProps): React.ReactElement;

export interface TocItem {
  /** The heading's id. */
  id: string;
  label: string;
  /** 2 (default) or 3 (indented). */
  level?: 2 | 3;
}
export interface TableOfContentsProps extends React.HTMLAttributes<HTMLElement> {
  items: TocItem[];
  /** Default "On this page". */
  title?: string;
  /** Controlled current item; omit to follow the scroll position. */
  activeId?: string;
  /** Follow the scroll position (default true). */
  spy?: boolean;
  /** auto (rail from 1100px, collapsible below; default), rail or collapsible. */
  mode?: 'auto' | 'rail' | 'collapsible';
  /** Rail sticks below the header (default true). */
  sticky?: boolean;
  /** Px from the top at which a heading becomes current (default 120). */
  offset?: number;
}
export declare function TableOfContents(props: TableOfContentsProps): React.ReactElement;

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Current page, 1-based; page 1 holds the newest posts. */
  page: number;
  pageCount: number;
  /** Renders links: URL for a page. */
  hrefFor?: (page: number) => string;
  /** Renders buttons: called with the new page. */
  onPageChange?: (page: number) => void;
  /** Default "Newer posts". */
  prevLabel?: string;
  /** Default "Older posts". */
  nextLabel?: string;
}
export declare function Pagination(props: PaginationProps): React.ReactElement;

export interface FooterColumn { title: string; links: NavItem[] }
export interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
  siteName: string;
  /** One sentence under the name. */
  tagline?: React.ReactNode;
  /** Two to four link columns. */
  columns?: FooterColumn[];
  /** "© 2026 Signal Labs". */
  legal?: React.ReactNode;
  /** Small links on the bottom row. */
  bottomLinks?: NavItem[];
  /** Adds an RSS icon link. */
  rssHref?: string;
  /** Theme switch (default true). */
  themeToggle?: boolean;
}
export declare function SiteFooter(props: SiteFooterProps): React.ReactElement;

/* ---------------------------------------------------------------------- Post */

export interface PostHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Sentence case, under ~70 characters. */
  title: React.ReactNode;
  /** A string renders a Badge in the page accent. */
  badge?: React.ReactNode;
  /** MetaLine items: date, reading time… */
  meta?: MetaItem[];
  /** One-sentence summary in lead type. */
  dek?: React.ReactNode;
  /** center (default) or start. */
  align?: 'center' | 'start';
  /** h1 (default) or h2. */
  titleAs?: 'h1' | 'h2';
  /** Under the title: usually an AuthorByline. */
  children?: React.ReactNode;
}
export declare function PostHeader(props: PostHeaderProps): React.ReactElement;

export interface HeroArtProps extends React.HTMLAttributes<HTMLDivElement> {
  /** md (post band, default), sm (200px) or card (160px). */
  size?: 'md' | 'sm' | 'card';
  /** Hairlines above and below (default true except card). */
  bordered?: boolean;
}
export declare function HeroArt(props: HeroArtProps): React.ReactElement;

export interface ProseProps extends React.HTMLAttributes<HTMLElement> {
  /** First paragraph in lead type. */
  lead?: boolean;
  /** Rendered Markdown HTML; children are used when absent. */
  html?: string;
  /** div (default), article or section. */
  as?: 'div' | 'article' | 'section';
}
export declare function Prose(props: ProseProps): React.ReactElement;

export type CalloutType = 'note' | 'tip' | 'important' | 'warning' | 'caution';
export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** note (blue, default), tip (green), important (purple), warning (orange), caution (red). */
  type?: CalloutType;
  /** Replaces the type's word. */
  title?: React.ReactNode;
  /** One or two short paragraphs. */
  children?: React.ReactNode;
}
export declare function Callout(props: CalloutProps): React.ReactElement;

export interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** Plain source text. */
  code?: string;
  /** Pre-highlighted HTML (Prism, highlight.js or class-based Shiki). */
  html?: string;
  /** Shown when there is no filename; also sets language-* on <code>. */
  language?: string;
  /** Shown in the bar. */
  filename?: string;
  /** Copy button (default true). */
  copy?: boolean;
}
export declare function CodeBlock(props: CodeBlockProps): React.ReactElement;

export interface Author {
  name: string;
  /** Shown under a single author's name. */
  role?: string;
  /** Links the name. */
  href?: string;
  /** Square picture URL; initials without one. */
  avatar?: string;
}
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  author: Author;
  /** 40 (default), 32 or 24. */
  size?: 40 | 32 | 24;
}
export declare function Avatar(props: AvatarProps): React.ReactElement;

export interface AuthorBylineProps extends React.HTMLAttributes<HTMLDivElement> {
  authors: Author[];
  /** md (default: 40px pictures, role line) or sm (24px, one line). */
  size?: 'md' | 'sm';
}
export declare function AuthorByline(props: AuthorBylineProps): React.ReactElement;

/* ----------------------------------------------------------------- Discovery */

export interface PostSummary {
  href: string;
  title: string;
  excerpt?: string;
  date?: { label: string; dateTime: string };
  /** "4 min read". */
  readingTime?: string;
  /** Name and hue; the hue colours the card. */
  category?: { label: string; hue?: Hue };
  /** Status word, shown as a Badge. */
  badge?: string;
  /** Replaces the art. */
  image?: { src: string; alt: string };
  authors?: Author[];
}
export interface PostCardProps extends React.HTMLAttributes<HTMLElement> {
  post: PostSummary;
  /** default, featured (spans the grid; art beside the text) or row (changelog). */
  variant?: 'default' | 'featured' | 'row';
  /** HeroArt (or the image) on top of a default card (default false). */
  art?: boolean;
  /** Title heading level (default 3). */
  headingLevel?: 2 | 3;
}
export declare function PostCard(props: PostCardProps): React.ReactElement;

export interface PostGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** grid (1 → 2 → 3 columns by its own width; default) or list (rows). */
  layout?: 'grid' | 'list';
  /** PostCards, newest first. */
  children?: React.ReactNode;
}
export declare function PostGrid(props: PostGridProps): React.ReactElement;

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue'> {
  /** Accessible name and default placeholder (default "Search posts"). */
  label?: string;
  value?: string;
  defaultValue?: string;
  /** Key that focuses the field (default "/"); false to disable. */
  shortcut?: string | false;
  onClear?: () => void;
  /** md (40px, default) or sm (32px). */
  size?: 'md' | 'sm';
}
export declare function SearchField(props: SearchFieldProps): React.ReactElement;

export interface NewsletterSignupProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSubmit' | 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Default "Subscribe". */
  buttonLabel?: string;
  /** How often you send and how to leave. */
  finePrint?: React.ReactNode;
  /** Resolve on success; reject or throw on failure. */
  onSubmit?: (email: string) => Promise<void> | void;
  successMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
}
export declare function NewsletterSignup(props: NewsletterSignupProps): React.ReactElement;

/* -------------------------------------------------------------------- Layout */

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** container (1280px, default), wide (1040px) or measure (680px); gutters are added outside. */
  width?: 'container' | 'wide' | 'measure';
  /** Element: div (default), section, main, header, footer, article. */
  as?: 'div' | 'section' | 'main' | 'header' | 'footer' | 'article';
  children?: React.ReactNode;
}
export declare function Container(props: ContainerProps): React.ReactElement;

export interface ArticleBodyProps extends React.HTMLAttributes<HTMLElement> {
  /** The article's h2 sections for "On this page"; omit for none. */
  toc?: TocItem[];
  tocTitle?: string;
  /** The article (a Prose) and what follows it. */
  children?: React.ReactNode;
}
export declare function ArticleBody(props: ArticleBodyProps): React.ReactElement;

declare global {
  interface Window {
    Afterglow: {
      Button: typeof Button; IconButton: typeof IconButton; Link: typeof Link;
      Badge: typeof Badge; Tag: typeof Tag; MetaLine: typeof MetaLine;
      Divider: typeof Divider; Icon: typeof Icon; Accent: typeof Accent;
      SiteHeader: typeof SiteHeader; ThemeToggle: typeof ThemeToggle; BackLink: typeof BackLink;
      TableOfContents: typeof TableOfContents; Pagination: typeof Pagination; SiteFooter: typeof SiteFooter;
      PostHeader: typeof PostHeader; HeroArt: typeof HeroArt; Prose: typeof Prose; Callout: typeof Callout;
      CodeBlock: typeof CodeBlock; AuthorByline: typeof AuthorByline; Avatar: typeof Avatar;
      PostCard: typeof PostCard; PostGrid: typeof PostGrid; SearchField: typeof SearchField;
      NewsletterSignup: typeof NewsletterSignup; Container: typeof Container; ArticleBody: typeof ArticleBody;
      initTheme: typeof initTheme;
      HUES: Hue[]; ICON_NAMES: IconName[];
    };
  }
}
