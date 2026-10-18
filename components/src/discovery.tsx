import * as React from 'react';
import { cx, type Hue } from './util';
import { Badge, Button, Icon, IconButton, Link, MetaLine, Tag, type MetaItem } from './basics';
import { AuthorByline, HeroArt, type Author } from './post';

/* ---------------------------------------------------------------- PostCard */

export interface PostSummary {
  href: string;
  title: string;
  excerpt?: string;
  /** Display date and its ISO form. */
  date?: { label: string; dateTime: string };
  /** "4 min read". */
  readingTime?: string;
  /** The category: its name and hue colour the card. */
  category?: { label: string; hue?: Hue };
  /** Status word, rendered as a Badge in the category hue. */
  badge?: string;
  /** A real image for the card; replaces the art. */
  image?: { src: string; alt: string };
  authors?: Author[];
}

export interface PostCardProps extends React.HTMLAttributes<HTMLElement> {
  post: PostSummary;
  /** default: grid card. featured: wide card with art beside the text. row: changelog list row. */
  variant?: 'default' | 'featured' | 'row';
  /** Show the hero art (or the image) at the top of a default card (default false; featured always shows it). */
  art?: boolean;
  /** Heading level for the title (default 3; use 2 when cards are the page's top-level list). */
  headingLevel?: 2 | 3;
}

/** A post in a list: category, title, excerpt and meta; the whole card is one link, coloured by its category. */
export function PostCard({ post, variant = 'default', art = false, headingLevel = 3, className, ...rest }: PostCardProps) {
  const H = ('h' + headingLevel) as 'h3';
  const hue = post.category && post.category.hue;
  const meta: MetaItem[] = [];
  if (post.date) meta.push({ label: post.date.label, dateTime: post.date.dateTime });
  if (post.readingTime) meta.push(post.readingTime);

  if (variant === 'row') {
    return (
      <article {...rest} data-accent={hue} className={cx('ag-card', 'ag-card--row', className)}>
        <div className="ag-card__frame">
        <div className="ag-card__when">{post.date && <MetaLine items={[{ label: post.date.label, dateTime: post.date.dateTime }]} />}</div>
        <div className="ag-card__body">
          {(post.badge || post.category) && (
            <div className="ag-card__top">
              {post.badge && <Badge>{post.badge}</Badge>}
              {post.category && <span className="ag-card__cat meta">{post.category.label}</span>}
            </div>
          )}
          <H className="ag-card__title h4"><a className="ag-card__link" href={post.href}>{post.title}</a></H>
          {post.excerpt && <p className="ag-card__excerpt body-sm">{post.excerpt}</p>}
        </div>
        </div>
      </article>
    );
  }

  const featured = variant === 'featured';
  const media = post.image
    ? <img className="ag-card__img" src={post.image.src} alt={post.image.alt} />
    : <HeroArt size="card" />;
  return (
    <article {...rest} data-accent={hue} className={cx('ag-card', 'ag-card--' + variant, className)}>
      <div className="ag-card__frame">
      {(featured || art) && <div className="ag-card__media">{media}</div>}
      <div className="ag-card__body">
        {(post.category || post.badge) && (
          <div className="ag-card__top">
            {post.category && <Tag hue={hue}>{post.category.label}</Tag>}
            {post.badge && <Badge>{post.badge}</Badge>}
          </div>
        )}
        <H className={cx('ag-card__title', featured ? 'title-sm' : 'h3')}><a className="ag-card__link" href={post.href}>{post.title}</a></H>
        {post.excerpt && <p className={cx('ag-card__excerpt', featured ? 'lead' : 'body-sm')}>{post.excerpt}</p>}
        <div className="ag-card__foot">
          {post.authors && post.authors.length > 0 && <AuthorByline authors={post.authors} size="sm" />}
          {meta.length > 0 && <MetaLine items={meta} />}
        </div>
      </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- PostGrid */

export interface PostGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** grid: 1, 2 or 3 columns by available width; a featured card spans the row. list: stacked rows. */
  layout?: 'grid' | 'list';
  children?: React.ReactNode;
}

/** Lays out PostCards: a responsive grid (1 → 2 → 3 columns by its own width) or a ruled list of rows. */
export function PostGrid({ layout = 'grid', className, children, ...rest }: PostGridProps) {
  return (
    <div {...rest} className={cx('ag-postgrid', 'ag-postgrid--' + layout, className)}>
      <div className="ag-postgrid__inner">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------- SearchField */

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue'> {
  /** Accessible label (visually hidden) and default placeholder. */
  label?: string;
  value?: string;
  defaultValue?: string;
  /** Key that focuses the field from anywhere on the page; false to disable. */
  shortcut?: string | false;
  /** Called when the clear button is pressed. */
  onClear?: () => void;
  size?: 'md' | 'sm';
}

/** A search input with an icon, a "/" shortcut hint and a clear button. */
export function SearchField({ label = 'Search posts', placeholder, value, defaultValue, shortcut = '/', onChange, onClear, size = 'md', className, id, ...rest }: SearchFieldProps) {
  const autoId = React.useId();
  const inputId = id || autoId;
  const [inner, setInner] = React.useState(defaultValue || '');
  const controlled = value !== undefined;
  const v = controlled ? value : inner;
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === shortcut && !e.metaKey && !e.ctrlKey && !(t && t.closest && t.closest('input, textarea, select, [contenteditable="true"]'))) {
        e.preventDefault();
        if (ref.current) ref.current.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shortcut]);
  return (
    <div role="search" className={cx('ag-search', size === 'sm' && 'ag-search--sm', className)}>
      <label className="ag-visually-hidden" htmlFor={inputId}>{label}</label>
      <Icon name="search" size={16} className="ag-search__icon" />
      <input
        {...rest}
        id={inputId}
        ref={ref}
        type="search"
        autoComplete="off"
        className="ag-search__input body-sm"
        placeholder={placeholder != null ? placeholder : label}
        value={v}
        onChange={(e) => { if (!controlled) setInner(e.target.value); if (onChange) onChange(e); }}
      />
      {v ? (
        <IconButton size="sm" icon="x" label="Clear search" className="ag-search__clear"
          onClick={() => { if (!controlled) setInner(''); if (onClear) onClear(); if (ref.current) ref.current.focus(); }} />
      ) : shortcut ? <kbd className="ag-kbd" aria-hidden="true">{shortcut}</kbd> : null}
    </div>
  );
}

/* -------------------------------------------------------- NewsletterSignup */

export interface NewsletterSignupProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSubmit' | 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttonLabel?: string;
  /** Small print under the form: how often, how to leave. */
  finePrint?: React.ReactNode;
  /** Receives the address; resolve on success, throw or reject on failure. */
  onSubmit?: (email: string) => Promise<void> | void;
  successMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
}

/** An email signup box: a short pitch, one field and one primary button, with sending, success and error states. */
export function NewsletterSignup({
  title = 'Get new posts by email',
  description = 'A short email when we publish. Unsubscribe any time.',
  buttonLabel = 'Subscribe',
  finePrint,
  onSubmit,
  successMessage = 'Check your inbox to confirm your subscription.',
  errorMessage = "That didn't work. Check the address and try again.",
  className,
  ...rest
}: NewsletterSignupProps) {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [email, setEmail] = React.useState('');
  const headingId = React.useId();
  const inputId = React.useId();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      if (onSubmit) await onSubmit(email);
      setStatus('done');
    } catch (err) {
      setStatus('error');
    }
  };
  return (
    <section {...rest} aria-labelledby={headingId} className={cx('ag-newsletter', className)}>
      <div className="ag-newsletter__inner">
        <div className="ag-newsletter__text">
          <h2 id={headingId} className="ag-newsletter__title h3">{title}</h2>
          {description && <p className="ag-newsletter__desc body-sm">{description}</p>}
        </div>
        <div className="ag-newsletter__action">
          {status === 'done' ? (
            <p className="ag-newsletter__status body-sm" data-accent="green" role="status"><Icon name="check" size={20} />{successMessage}</p>
          ) : (
            <form className="ag-newsletter__form" onSubmit={submit}>
              <label className="ag-visually-hidden" htmlFor={inputId}>Email address</label>
              <input
                id={inputId}
                className="ag-input body-sm"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                aria-invalid={status === 'error' || undefined}
              />
              <Button variant="primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Subscribing…' : buttonLabel}</Button>
            </form>
          )}
          {status === 'error' && <p className="ag-newsletter__status body-sm" data-accent="red" role="alert"><Icon name="octagon-alert" size={20} />{errorMessage}</p>}
          {finePrint && status !== 'done' && <p className="ag-newsletter__fine caption">{finePrint}</p>}
        </div>
      </div>
    </section>
  );
}
