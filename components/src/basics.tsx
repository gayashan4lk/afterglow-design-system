import * as React from 'react';
import { ICONS, type IconName } from './icons';
import { cx, type Hue } from './util';

/* -------------------------------------------------------------------- Icon */

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  /** One of ICON_NAMES (Lucide outline icons). */
  name: IconName;
  /** Rendered size in px: 14 in badges and meta lines, 16 in fields and small buttons, 20 in buttons, nav and callouts. */
  size?: number;
  /** Accessible name. Omit for decorative icons beside a word (they are hidden from screen readers). */
  label?: string;
}

/** A Lucide outline icon drawn in currentColor at a constant 1.75px stroke. */
export function Icon({ name, size = 20, label, className, ...rest }: IconProps) {
  const nodes = ICONS[name] || [];
  const stroke = (1.75 * 24) / size; // keep the stroke 1.75px on screen at every size
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx('ag-icon', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      {nodes.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}

/* ------------------------------------------------------------------ Button */

export type AnchorOrButton = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export interface ButtonProps extends AnchorOrButton {
  /** primary = inverse fill, once per view; secondary = outlined (default); ghost = text only. */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** md = 40px (header, forms); sm = 32px (cards, inline rows). */
  size?: 'md' | 'sm';
  /** Icon before the label. */
  iconStart?: IconName;
  /** Icon after the label (arrows, external). */
  iconEnd?: IconName;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  children?: React.ReactNode;
}

/** The action control: one solid primary per view, outlined secondary, quiet ghost. */
export function Button({ variant = 'secondary', size = 'md', iconStart, iconEnd, href, className, children, disabled, type, ...rest }: ButtonProps) {
  const iconSize = size === 'sm' ? 16 : 20;
  const cls = cx('ag-btn', 'ag-btn--' + variant, size === 'sm' ? 'ag-btn--sm caption' : 'ui', className);
  const inner = (
    <>
      {iconStart && <Icon name={iconStart} size={iconSize} />}
      {children != null && <span className="ag-btn__label">{children}</span>}
      {iconEnd && <Icon name={iconEnd} size={iconSize} />}
    </>
  );
  if (href !== undefined) {
    return (
      <a {...rest} href={disabled ? undefined : href} aria-disabled={disabled || undefined} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button {...rest} type={type || 'button'} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

/* -------------------------------------------------------------- IconButton */

export interface IconButtonProps extends AnchorOrButton {
  icon: IconName;
  /** Required: becomes aria-label and the tooltip. */
  label: string;
  variant?: 'ghost' | 'secondary';
  size?: 'md' | 'sm';
  /** For toggles (theme switch, menu open): sets aria-pressed. */
  pressed?: boolean;
  href?: string;
}

/** A square, label-less button for search, menu, theme and close; always carries an aria-label. */
export function IconButton({ icon, label, variant = 'ghost', size = 'md', pressed, href, className, type, ...rest }: IconButtonProps) {
  const cls = cx('ag-iconbtn', 'ag-iconbtn--' + variant, size === 'sm' && 'ag-iconbtn--sm', className);
  const glyph = <Icon name={icon} size={size === 'sm' ? 16 : 20} />;
  if (href !== undefined) {
    return <a {...rest} href={href} aria-label={label} title={label} className={cls}>{glyph}</a>;
  }
  return (
    <button {...rest} type={type || 'button'} aria-label={label} title={label} aria-pressed={pressed} className={cls}>
      {glyph}
    </button>
  );
}

/* -------------------------------------------------------------------- Link */

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** inline = prose link (underlined); nav = header nav; quiet = footer/meta; arrow = "Read the post →". */
  variant?: 'inline' | 'nav' | 'quiet' | 'arrow';
  /** Nav only: the current page (sets aria-current="page"). */
  current?: boolean;
  /** Opens in a new tab and adds an arrow-up-right icon. */
  external?: boolean;
}

/** Every text link: underlined in prose, plain in navigation, with an arrow when it leads on. */
export function Link({ variant = 'inline', current, external, className, children, ...rest }: LinkProps) {
  const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a
      {...extra}
      {...rest}
      aria-current={variant === 'nav' && current ? 'page' : undefined}
      className={cx('ag-link', 'ag-link--' + variant, (variant === 'nav' || variant === 'arrow') && 'ui', className)}
    >
      {children}
      {variant === 'arrow' && !external && <Icon name="arrow-right" size={20} className="ag-link__arrow" />}
      {external && <Icon name="arrow-up-right" size={variant === 'inline' ? 16 : 20} className="ag-link__ext" label="(opens in a new tab)" />}
    </a>
  );
}

/* ------------------------------------------------------------------- Badge */

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** accent = follow the page's accent (default); a hue pins it; neutral = no colour (drafts). */
  hue?: 'accent' | Hue | 'neutral';
  icon?: IconName;
  children?: React.ReactNode;
}

/** One or two words of status above a post title, in mono capitals on the accent's tint. */
export function Badge({ hue = 'accent', icon, className, children, ...rest }: BadgeProps) {
  const pinned = hue !== 'accent' && hue !== 'neutral' ? hue : undefined;
  return (
    <span {...rest} data-accent={pinned} className={cx('ag-badge', 'label', hue === 'neutral' && 'ag-badge--neutral', className)}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}

/* --------------------------------------------------------------------- Tag */

export interface TagProps extends Omit<AnchorOrButton, 'onClick'> {
  /** Category colour, shown as a dot. Omit for a plain tag. */
  hue?: Hue;
  /** Filter rows: the chosen tag (aria-pressed on buttons, aria-current on links). */
  selected?: boolean;
  /** Number of posts, shown after the label. */
  count?: number;
  /** Renders a link. */
  href?: string;
  /** Renders a button (filter chips). */
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}

/** A category pill: a hue dot and a name; a link to the category, a filter chip, or a plain label. */
export function Tag({ hue, selected, count, href, onClick, className, children, type, ...rest }: TagProps) {
  const interactive = href !== undefined || !!onClick;
  const cls = cx('ag-tag', 'caption', interactive && 'ag-tag--interactive', selected && 'ag-tag--selected', className);
  const inner = (
    <>
      {hue && <span className="ag-tag__dot" data-accent={hue} aria-hidden="true" />}
      <span>{children}</span>
      {count != null && <span className="ag-tag__count">{count}</span>}
    </>
  );
  if (href !== undefined) {
    return <a {...rest} href={href} onClick={onClick} aria-current={selected ? 'page' : undefined} className={cls}>{inner}</a>;
  }
  if (onClick) {
    return <button {...rest} type={type || 'button'} onClick={onClick} aria-pressed={!!selected} className={cls}>{inner}</button>;
  }
  return <span {...(rest as React.HTMLAttributes<HTMLSpanElement>)} className={cls}>{inner}</span>;
}

/* ---------------------------------------------------------------- MetaLine */

export type MetaItem = React.ReactNode | { label: React.ReactNode; dateTime?: string; href?: string; icon?: IconName };

export interface MetaLineProps extends React.HTMLAttributes<HTMLElement> {
  /** The facts, in order: date first, then reading time, then anything else. */
  items: MetaItem[];
  align?: 'start' | 'center';
  as?: 'div' | 'p';
}

const isMetaObj = (x: MetaItem): x is { label: React.ReactNode; dateTime?: string; href?: string; icon?: IconName } =>
  !!x && typeof x === 'object' && !React.isValidElement(x) && 'label' in (x as object);

/** Facts about a post — date, reading time, author — in mono capitals joined by middle dots. */
export function MetaLine({ items, align = 'start', as = 'div', className, ...rest }: MetaLineProps) {
  const Tag = as as 'div';
  const parts: React.ReactNode[] = [];
  items.forEach((it, i) => {
    if (i > 0) parts.push(<span key={'s' + i} className="ag-meta__sep" aria-hidden="true">·</span>);
    if (isMetaObj(it)) {
      let body: React.ReactNode = it.dateTime ? <time dateTime={it.dateTime}>{it.label}</time> : it.label;
      if (it.icon) body = <>{<Icon name={it.icon} size={14} />}{body}</>;
      parts.push(it.href ? <a key={i} href={it.href} className="ag-meta__item ag-meta__link">{body}</a> : <span key={i} className="ag-meta__item">{body}</span>);
    } else {
      parts.push(<span key={i} className="ag-meta__item">{it}</span>);
    }
  });
  return <Tag {...rest} className={cx('ag-meta', 'meta', align === 'center' && 'ag-meta--center', className)}>{parts}</Tag>;
}

/* ----------------------------------------------------------------- Divider */

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical';
  /** Space above and below a horizontal rule: none, sm (space-6), md (space-12), lg (space-16). */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

/** The hairline that separates bands and groups; decorative, never a control's only edge. */
export function Divider({ orientation = 'horizontal', spacing = 'none', className, ...rest }: DividerProps) {
  if (orientation === 'vertical') {
    return <span {...rest} role="separator" aria-orientation="vertical" className={cx('ag-divider', 'ag-divider--vertical', className)} />;
  }
  return <hr {...(rest as React.HTMLAttributes<HTMLHRElement>)} className={cx('ag-divider', 'ag-divider--' + spacing, className)} />;
}

/* ------------------------------------------------------------------ Accent */

export interface AccentProps extends React.HTMLAttributes<HTMLElement> {
  /** The hue every accent token inside takes. */
  hue: Hue;
  /** Element to render; default div. Use 'article' for a post, 'main' for a category page. */
  as?: keyof React.JSX.IntrinsicElements;
  children?: React.ReactNode;
}

/** Re-points accent, accent-ink, accent-soft and accent-glow for everything inside it. */
export function Accent({ hue, as = 'div', children, ...rest }: AccentProps) {
  return React.createElement(as, { ...rest, 'data-accent': hue }, children);
}
