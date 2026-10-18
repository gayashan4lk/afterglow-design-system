import * as React from 'react';
import { cx } from './util';
import { Button, Icon, IconButton, Link } from './basics';

/* ------------------------------------------------------------- shared types */

export interface NavItem {
  label: string;
  href: string;
  /** The page you're on. */
  current?: boolean;
}

export interface HeaderAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

/* ------------------------------------------------------------- ThemeToggle */

const THEME_KEY = 'afterglow-theme';

/** Sets data-theme on <html> from the reader's saved choice, else their OS setting. Call once, as early as possible. */
export function initTheme(storageKey: string = THEME_KEY) {
  if (typeof document === 'undefined') return;
  let saved: string | null = null;
  try { saved = localStorage.getItem(storageKey); } catch (e) { /* storage blocked */ }
  const prefersLight = typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: light)').matches;
  document.documentElement.setAttribute('data-theme', saved === 'light' || saved === 'dark' ? saved : prefersLight ? 'light' : 'dark');
}

export interface ThemeToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** localStorage key for the reader's choice. */
  storageKey?: string;
  size?: 'md' | 'sm';
}

/** Switches the page between the dark and light themes and remembers the reader's choice. */
export function ThemeToggle({ storageKey = THEME_KEY, size = 'md', ...rest }: ThemeToggleProps) {
  const read = () => (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  const [theme, setTheme] = React.useState<'dark' | 'light'>(read);
  React.useEffect(() => {
    const el = document.documentElement;
    const mo = new MutationObserver(() => setTheme(read()));
    mo.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <IconButton
      {...rest}
      size={size}
      icon={theme === 'dark' ? 'sun' : 'moon'}
      label={'Switch to ' + next + ' theme'}
      onClick={() => {
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem(storageKey, next); } catch (e) { /* storage blocked */ }
      }}
    />
  );
}

/* -------------------------------------------------------------- SiteHeader */

export interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** The site's name, set in plain type. */
  siteName: string;
  /** Optional section after a slash: "Blog", "Changelog". */
  section?: string;
  homeHref?: string;
  /** Optional single-ink mark, 24px, left of the name. */
  logo?: React.ReactNode;
  nav?: NavItem[];
  /** The one inverse button, rightmost. */
  primaryAction?: HeaderAction;
  /** The outlined button, left of the primary. */
  secondaryAction?: HeaderAction;
  /** Shows a search button that calls this. */
  onSearch?: () => void;
  /** Shows the theme switch (default true). */
  themeToggle?: boolean;
  /** Sticks to the top of the viewport (default true). */
  sticky?: boolean;
  /** Target of the "Skip to content" link shown on first Tab (default "#main"); false to leave it out. */
  skipHref?: string | false;
}

/** The site's top bar: name, navigation, search, theme switch and up to two buttons; a menu button below 768px. */
export function SiteHeader({
  siteName, section, homeHref = '/', logo, nav = [], primaryAction, secondaryAction, onSearch,
  themeToggle = true, sticky = true, skipHref = '#main', className, ...rest
}: SiteHeaderProps) {
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();
  const action = (a: HeaderAction | undefined, variant: 'primary' | 'secondary') =>
    a ? <Button variant={variant} href={a.href} onClick={a.onClick}>{a.label}</Button> : null;
  const hasMenu = nav.length > 0 || !!primaryAction || !!secondaryAction;
  return (
    <header {...rest} className={cx('ag-header', sticky && 'ag-header--sticky', className)}>
      {skipHref && <a className="ag-skip ui" href={skipHref}>Skip to content</a>}
      <div className="ag-header__bar">
        <a className="ag-header__brand" href={homeHref}>
          {logo && <span className="ag-header__logo" aria-hidden="true">{logo}</span>}
          <span className="ag-header__name">{siteName}</span>
          {section && <span className="ag-header__section"> / {section}</span>}
        </a>
        {nav.length > 0 && (
          <nav className="ag-header__nav" aria-label="Main">
            {nav.map((n) => <Link key={n.href + n.label} variant="nav" href={n.href} current={n.current}>{n.label}</Link>)}
          </nav>
        )}
        <div className="ag-header__tools">
          {onSearch && <IconButton icon="search" label="Search" onClick={onSearch} />}
          {themeToggle && <ThemeToggle />}
          {(primaryAction || secondaryAction) && (
            <div className="ag-header__actions">{action(secondaryAction, 'secondary')}{action(primaryAction, 'primary')}</div>
          )}
          {hasMenu && (
            <IconButton
              className="ag-header__menu"
              icon={open ? 'x' : 'menu'}
              label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
      </div>
      {hasMenu && (
        <div id={panelId} className="ag-header__panel" hidden={!open}>
          {nav.length > 0 && (
            <nav className="ag-header__panel-nav" aria-label="Main">
              {nav.map((n) => <Link key={n.href + n.label} variant="nav" href={n.href} current={n.current}>{n.label}</Link>)}
            </nav>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="ag-header__panel-actions">{action(secondaryAction, 'secondary')}{action(primaryAction, 'primary')}</div>
          )}
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------- BackLink */

export interface BackLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Where it goes, without the arrow: "Back to changelog". */
  children: React.ReactNode;
}

/** The "← Back to changelog" link above a post, in mono capitals. */
export function BackLink({ children, className, ...rest }: BackLinkProps) {
  return (
    <a {...rest} className={cx('ag-back', 'meta', className)}>
      <span aria-hidden="true">←</span>
      <span>{children}</span>
    </a>
  );
}

/* --------------------------------------------------------- TableOfContents */

export interface TocItem {
  /** The heading's id in the page. */
  id: string;
  label: string;
  /** 2 for h2 (default), 3 for h3 (indented). */
  level?: 2 | 3;
}

export interface TableOfContentsProps extends React.HTMLAttributes<HTMLElement> {
  items: TocItem[];
  title?: string;
  /** Controlled active item. Leave undefined to follow the scroll position. */
  activeId?: string;
  /** Follow the scroll position (default true, ignored when activeId is set). */
  spy?: boolean;
  /** auto: rail from 1100px, collapsible below. rail / collapsible force one. */
  mode?: 'auto' | 'rail' | 'collapsible';
  /** Rail sticks below the header (default true). */
  sticky?: boolean;
  /** Distance from the viewport top at which a heading counts as reached (default 120). */
  offset?: number;
}

/** "On this page": a sticky rail of the article's sections with a sliding accent bar; a collapsible row on smaller screens. */
export function TableOfContents({
  items, title = 'On this page', activeId, spy = true, mode = 'auto', sticky = true, offset = 120, className, ...rest
}: TableOfContentsProps) {
  const [spied, setSpied] = React.useState<string | undefined>(items[0] && items[0].id);
  const [open, setOpen] = React.useState(false);
  const [bar, setBar] = React.useState<{ top: number; height: number } | null>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const listId = React.useId();
  const current = activeId !== undefined ? activeId : spied;
  const key = items.map((i) => i.id).join('|');

  React.useEffect(() => {
    if (!spy || activeId !== undefined || typeof window === 'undefined') return;
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      let cur = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top - offset <= 1) cur = el.id;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight > window.innerHeight + 2;
      if (scrollable && window.innerHeight + window.scrollY >= doc.scrollHeight - 2) cur = els[els.length - 1].id;
      setSpied(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [spy, activeId, key, offset]);

  React.useLayoutEffect(() => {
    const track = trackRef.current;
    const a = track && (track.querySelector('[aria-current="true"]') as HTMLElement | null);
    setBar(a && a.offsetHeight ? { top: a.offsetTop, height: a.offsetHeight } : null);
  }, [current, key, open, mode]);

  return (
    <nav {...rest} aria-label={title} className={cx('ag-toc', 'ag-toc--' + mode, sticky && 'ag-toc--sticky', open && 'ag-toc--open', className)}>
      <p className="ag-toc__title meta">{title}</p>
      <button type="button" className="ag-toc__toggle ui" aria-expanded={open} aria-controls={listId} onClick={() => setOpen(!open)}>
        <Icon name="list" size={20} />
        <span className="ag-toc__toggle-label">{title}</span>
        <Icon name="chevron-down" size={20} className="ag-toc__chev" />
      </button>
      <div className="ag-toc__track" ref={trackRef}>
        <ol id={listId} className="ag-toc__list body-sm">
          {items.map((i) => (
            <li key={i.id} className={cx('ag-toc__item', i.level === 3 && 'ag-toc__item--sub')}>
              <a href={'#' + i.id} aria-current={i.id === current ? 'true' : undefined} onClick={() => setOpen(false)}>{i.label}</a>
            </li>
          ))}
        </ol>
        {bar && <span className="ag-toc__bar" aria-hidden="true" style={{ transform: 'translateY(' + bar.top + 'px)', height: bar.height }} />}
      </div>
    </nav>
  );
}

/* -------------------------------------------------------------- Pagination */

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Current page, 1-based. */
  page: number;
  pageCount: number;
  /** Link for a page number (renders links). */
  hrefFor?: (page: number) => string;
  /** Called with the new page (renders buttons when hrefFor is absent). */
  onPageChange?: (page: number) => void;
  /** Labels for the two ends. Page 1 holds the newest posts. */
  prevLabel?: string;
  nextLabel?: string;
}

function pageList(page: number, count: number): Array<number | '…'> {
  const set = Array.from(new Set([1, page - 1, page, page + 1, count])).filter((p) => p >= 1 && p <= count).sort((a, b) => a - b);
  const out: Array<number | '…'> = [];
  set.forEach((p, i) => { if (i > 0 && p - set[i - 1] > 1) out.push('…'); out.push(p); });
  return out;
}

/** Newer / older links with page numbers between them; numbers give way to "Page 3 of 12" when narrow. */
export function Pagination({ page, pageCount, hrefFor, onPageChange, prevLabel = 'Newer posts', nextLabel = 'Older posts', className, ...rest }: PaginationProps) {
  const go = (p: number) => (hrefFor ? { href: hrefFor(p) } : { onClick: () => onPageChange && onPageChange(p) });
  const num = (p: number) => {
    const isCur = p === page;
    const props = { className: 'ag-pages__num', 'aria-current': isCur ? ('page' as const) : undefined, 'aria-label': 'Page ' + p };
    return hrefFor
      ? <a {...props} href={hrefFor(p)}>{p}</a>
      : <button {...props} type="button" onClick={() => onPageChange && onPageChange(p)}>{p}</button>;
  };
  return (
    <nav {...rest} aria-label="Pagination" className={cx('ag-pages', className)}>
      <div className="ag-pages__inner">
        <Button variant="ghost" iconStart="arrow-left" disabled={page <= 1} className="ag-pages__prev" {...go(page - 1)}>{prevLabel}</Button>
        <ol className="ag-pages__list">
          {pageList(page, pageCount).map((p, i) => (
            <li key={i}>{p === '…' ? <span className="ag-pages__gap" aria-hidden="true">…</span> : num(p)}</li>
          ))}
        </ol>
        <span className="ag-pages__status meta">Page {page} of {pageCount}</span>
        <Button variant="ghost" iconEnd="arrow-right" disabled={page >= pageCount} className="ag-pages__next" {...go(page + 1)}>{nextLabel}</Button>
      </div>
    </nav>
  );
}

/* -------------------------------------------------------------- SiteFooter */

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
  siteName: string;
  /** One sentence under the name. */
  tagline?: React.ReactNode;
  columns?: FooterColumn[];
  /** "© 2026 Signal Labs". */
  legal?: React.ReactNode;
  /** Small links on the bottom row: Privacy, Terms. */
  bottomLinks?: NavItem[];
  /** Adds an RSS icon link. */
  rssHref?: string;
  /** Shows the theme switch (default true). */
  themeToggle?: boolean;
}

/** The closing band: name and tagline, link columns, then legal text, small links, RSS and the theme switch. */
export function SiteFooter({ siteName, tagline, columns = [], legal, bottomLinks = [], rssHref, themeToggle = true, className, ...rest }: SiteFooterProps) {
  return (
    <footer {...rest} className={cx('ag-footer', className)}>
      <div className="ag-footer__inner">
        <div className="ag-footer__top">
          <div className="ag-footer__brand">
            <p className="ag-footer__name">{siteName}</p>
            {tagline && <p className="ag-footer__tagline body-sm">{tagline}</p>}
          </div>
          {columns.map((c) => (
            <nav key={c.title} className="ag-footer__col" aria-label={c.title}>
              <p className="ag-footer__coltitle meta">{c.title}</p>
              <ul className="body-sm">
                {c.links.map((l) => <li key={l.href + l.label}><Link variant="quiet" href={l.href}>{l.label}</Link></li>)}
              </ul>
            </nav>
          ))}
        </div>
        <div className="ag-footer__bottom">
          {legal && <p className="ag-footer__legal caption">{legal}</p>}
          <div className="ag-footer__tools">
            {bottomLinks.map((l) => <Link key={l.href + l.label} variant="quiet" href={l.href} className="caption">{l.label}</Link>)}
            {rssHref && <IconButton icon="rss" label="RSS feed" href={rssHref} size="sm" />}
            {themeToggle && <ThemeToggle size="sm" />}
          </div>
        </div>
      </div>
    </footer>
  );
}
