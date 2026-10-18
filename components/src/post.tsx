import * as React from 'react';
import { cx, type Hue } from './util';
import { Badge, Icon, IconButton, MetaLine, type MetaItem } from './basics';
import type { IconName } from './icons';

/* -------------------------------------------------------------- PostHeader */

export interface PostHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** The post title, sentence case. */
  title: React.ReactNode;
  /** Status word(s) above the meta line; a string renders a Badge in the page accent. */
  badge?: React.ReactNode;
  /** Facts for the MetaLine: date, reading time… */
  meta?: MetaItem[];
  /** Optional one-sentence summary under the title, in lead type. */
  dek?: React.ReactNode;
  /** center (default, post pages) or start (index and category pages). */
  align?: 'center' | 'start';
  /** Heading element; h1 on a post page. */
  titleAs?: 'h1' | 'h2';
  /** Extra content under the title, e.g. an AuthorByline. */
  children?: React.ReactNode;
}

/** The top of a post: badge, meta line and the big title, centred, with an optional summary and byline. */
export function PostHeader({ title, badge, meta, dek, align = 'center', titleAs = 'h1', children, className, ...rest }: PostHeaderProps) {
  const H = titleAs;
  return (
    <header {...rest} className={cx('ag-postheader', align === 'start' && 'ag-postheader--start', className)}>
      <div className="ag-postheader__inner">
        {badge != null && <div className="ag-postheader__badge">{typeof badge === 'string' ? <Badge>{badge}</Badge> : badge}</div>}
        {meta && meta.length > 0 && <MetaLine items={meta} align={align === 'center' ? 'center' : 'start'} className="ag-postheader__meta" />}
        <H className="ag-postheader__title title">{title}</H>
        {dek && <p className="ag-postheader__dek lead">{dek}</p>}
        {children && <div className="ag-postheader__extra">{children}</div>}
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------- HeroArt */

export interface HeroArtProps extends React.HTMLAttributes<HTMLDivElement> {
  /** md: the post band (hero-height from 768px, 240px below). sm: 200px. card: 160px, for post cards. */
  size?: 'md' | 'sm' | 'card';
  /** Hairlines above and below (default true for md and sm). */
  bordered?: boolean;
}

/** The signature artwork: a hairline grid fading into the page, a glowing half-disc rising from the bottom edge and one spark, all in the current accent. */
export function HeroArt({ size = 'md', bordered, className, ...rest }: HeroArtProps) {
  const raw = React.useId();
  const id = raw.replace(/[^a-zA-Z0-9_-]/g, '');
  const edged = bordered !== undefined ? bordered : size !== 'card';
  return (
    <div {...rest} aria-hidden="true" className={cx('ag-hero', 'ag-hero--' + size, edged && 'ag-hero--bordered', className)}>
      <div className="ag-hero__grid" />
      <svg className="ag-hero__art" viewBox="0 0 640 344" preserveAspectRatio="xMidYMax meet" focusable="false">
        <defs>
          <linearGradient id={id + 'halo'} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--accent-glow)', stopOpacity: 0.7 }} />
            <stop offset="0.47" style={{ stopColor: 'var(--accent-glow)', stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id={id + 'dome'} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
            <stop offset="0.2" style={{ stopColor: 'var(--accent-glow)' }} />
            <stop offset="0.46" style={{ stopColor: 'var(--canvas)' }} />
          </linearGradient>
          <linearGradient id={id + 'rim'} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--accent)', stopOpacity: 1 }} />
            <stop offset="0.36" style={{ stopColor: 'var(--accent)', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <circle cx="320" cy="360" r="300" fill={'url(#' + id + 'halo)'} />
        <circle cx="320" cy="360" r="196" fill={'url(#' + id + 'dome)'} />
        <circle cx="320" cy="360" r="196" fill="none" stroke={'url(#' + id + 'rim)'} strokeWidth="1.5" />
        <circle className="ag-hero__spark" cx="446" cy="210" r="4" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------- Prose */

export interface ProseProps extends React.HTMLAttributes<HTMLElement> {
  /** Style the first paragraph as a lead. */
  lead?: boolean;
  /** Rendered HTML (from Markdown). Children are used when absent. */
  html?: string;
  as?: 'div' | 'article' | 'section';
}

/** Article typography for Markdown output: headings, paragraphs, lists, quotes, links, code, figures and tables at the reading measure. */
export function Prose({ lead, html, as = 'div', className, children, ...rest }: ProseProps) {
  const Tag = as as 'div';
  const cls = cx('ag-prose', lead && 'ag-prose--lead', className);
  return html !== undefined
    ? <Tag {...rest} className={cls} dangerouslySetInnerHTML={{ __html: html }} />
    : <Tag {...rest} className={cls}>{children}</Tag>;
}

/* ----------------------------------------------------------------- Callout */

export type CalloutType = 'note' | 'tip' | 'important' | 'warning' | 'caution';
const CALLOUTS: Record<CalloutType, { hue: Hue; icon: IconName; title: string }> = {
  note: { hue: 'blue', icon: 'info', title: 'Note' },
  tip: { hue: 'green', icon: 'lightbulb', title: 'Tip' },
  important: { hue: 'purple', icon: 'message-square-warning', title: 'Important' },
  warning: { hue: 'orange', icon: 'triangle-alert', title: 'Warning' },
  caution: { hue: 'red', icon: 'octagon-alert', title: 'Caution' },
};

export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** note (blue), tip (green), important (purple), warning (orange), caution (red). */
  type?: CalloutType;
  /** Overrides the type's word; keep it short. */
  title?: React.ReactNode;
  children?: React.ReactNode;
}

/** A tinted aside inside an article (Note, Tip, Important, Warning, Caution); its colour is fixed by its type, not the page accent. */
export function Callout({ type = 'note', title, children, className, ...rest }: CalloutProps) {
  const c = CALLOUTS[type] || CALLOUTS.note;
  return (
    <div {...rest} role="note" data-accent={c.hue} className={cx('ag-callout', className)}>
      <p className="ag-callout__title ui"><Icon name={c.icon} size={20} />{title != null ? title : c.title}</p>
      <div className="ag-callout__body body-sm">{children}</div>
    </div>
  );
}

/* --------------------------------------------------------------- CodeBlock */

export interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** Plain source text (escaped for you). */
  code?: string;
  /** Pre-highlighted HTML from Prism, highlight.js or Shiki (class-based). Used instead of code. */
  html?: string;
  /** Language label shown in the bar when there is no filename: "ts", "bash". */
  language?: string;
  /** File name shown in the bar. */
  filename?: string;
  /** Show the copy button (default true). */
  copy?: boolean;
}

/** A code sample on surface with a filename or language bar and a copy button; colours come from the code-* tokens. */
export function CodeBlock({ code, html, language, filename, copy = true, className, ...rest }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const preRef = React.useRef<HTMLPreElement>(null);
  const label = filename || language;
  const onCopy = () => {
    const text = code != null ? code : (preRef.current && preRef.current.textContent) || '';
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => {});
    } catch (e) { /* clipboard blocked */ }
  };
  return (
    <figure {...rest} className={cx('ag-code', className)}>
      {(label || copy) && (
        <figcaption className="ag-code__bar">
          <span className="ag-code__label meta">{label}</span>
          {copy && <IconButton size="sm" icon={copied ? 'check' : 'copy'} label={copied ? 'Copied' : 'Copy code'} onClick={onCopy} className="ag-code__copy" />}
          <span className="ag-visually-hidden" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
        </figcaption>
      )}
      <pre ref={preRef} className="ag-code__pre code" tabIndex={0}>
        {html !== undefined
          ? <code className={language ? 'language-' + language : undefined} dangerouslySetInnerHTML={{ __html: html }} />
          : <code className={language ? 'language-' + language : undefined}>{code}</code>}
      </pre>
    </figure>
  );
}

/* ------------------------------------------------------------ AuthorByline */

export interface Author {
  name: string;
  /** Shown under a single author's name. */
  role?: string;
  href?: string;
  /** Square image URL; initials are used without one. */
  avatar?: string;
}

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  author: Author;
  /** px: 40 (default), 32 or 24. */
  size?: 40 | 32 | 24;
}

const initials = (name: string, n: number) => name.split(/\s+/).filter(Boolean).slice(0, n).map((w) => w[0]).join('').toUpperCase();

/** A round author picture, or their initials on surface-strong (one letter at 24px). */
export function Avatar({ author, size = 40, className, ...rest }: AvatarProps) {
  return (
    <span {...rest} className={cx('ag-avatar', 'ag-avatar--' + size, className)}>
      {author.avatar ? <img src={author.avatar} alt="" /> : <span aria-hidden="true">{initials(author.name, size === 24 ? 1 : 2)}</span>}
    </span>
  );
}

export interface AuthorBylineProps extends React.HTMLAttributes<HTMLDivElement> {
  authors: Author[];
  /** md: 40px pictures, names and a role line. sm: 24px pictures, one line (cards). */
  size?: 'md' | 'sm';
}

const joinNames = (parts: React.ReactNode[]) =>
  parts.reduce<React.ReactNode[]>((acc, p, i) => {
    if (i > 0) acc.push(i === parts.length - 1 ? ' and ' : ', ');
    acc.push(p);
    return acc;
  }, []);

/** Who wrote the post: overlapping pictures and names, with the role of a single author. */
export function AuthorByline({ authors, size = 'md', className, ...rest }: AuthorBylineProps) {
  const names = authors.map((a) =>
    a.href ? <a key={a.name} href={a.href} className="ag-byline__name">{a.name}</a> : <span key={a.name} className="ag-byline__name">{a.name}</span>,
  );
  const role = authors.length === 1 ? authors[0].role : undefined;
  return (
    <div {...rest} className={cx('ag-byline', 'ag-byline--' + size, className)}>
      <span className="ag-byline__faces">
        {authors.slice(0, 3).map((a) => <Avatar key={a.name} author={a} size={size === 'sm' ? 24 : 40} />)}
      </span>
      <span className="ag-byline__text">
        <span className={size === 'sm' ? 'body-sm' : 'ui'}>{joinNames(names)}</span>
        {size === 'md' && role && <span className="ag-byline__role caption">{role}</span>}
      </span>
    </div>
  );
}
