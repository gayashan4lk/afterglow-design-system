import * as React from 'react';
import { cx } from './util';
import { TableOfContents, type TocItem } from './navigation';

/* --------------------------------------------------------------- Container */

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** container (default, 1280px), wide (1040px) or measure (680px). */
  width?: 'container' | 'wide' | 'measure';
  /** Element to render: div (default), section, main… */
  as?: 'div' | 'section' | 'main' | 'header' | 'footer' | 'article';
  children?: React.ReactNode;
}

/** Centres content at one of the layout widths with the page gutters (space-4, space-8 from 768px). */
export function Container({ width = 'container', as = 'div', className, children, ...rest }: ContainerProps) {
  const Tag = as as 'div';
  return <Tag {...rest} className={cx('ag-container', 'ag-container--' + width, className)}>{children}</Tag>;
}

/* ------------------------------------------------------------- ArticleBody */

export interface ArticleBodyProps extends React.HTMLAttributes<HTMLElement> {
  /** Sections for "On this page"; omit for no table of contents. */
  toc?: TocItem[];
  tocTitle?: string;
  /** The article: usually a Prose, then anything that follows it (a NewsletterSignup). */
  children?: React.ReactNode;
}

/** The post body grid: the article centred at the reading measure, with "On this page" as a sticky rail to its right from 1100px and a collapsible row above it below. */
export function ArticleBody({ toc, tocTitle, className, children, ...rest }: ArticleBodyProps) {
  const hasToc = !!toc && toc.length > 0;
  return (
    <div {...rest} className={cx('ag-articlebody', hasToc && 'ag-articlebody--toc', className)}>
      {hasToc && (
        <div className="ag-articlebody__toc">
          <TableOfContents items={toc as TocItem[]} title={tocTitle} mode="auto" />
        </div>
      )}
      <div className="ag-articlebody__main">{children}</div>
    </div>
  );
}
