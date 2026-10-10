import type { ExportOptions } from 'dompdf.js';

const POINTS_PER_CSS_PIXEL = 0.75;
const A4_WIDTH_PT = 595.5;
const A4_HEIGHT_PT = 842.25;
const PAGE_MARGIN_PT = 36;

export const RESUME_PAGE_WIDTH_PX = A4_WIDTH_PT / POINTS_PER_CSS_PIXEL;
export const RESUME_PAGE_HEIGHT_PX = A4_HEIGHT_PT / POINTS_PER_CSS_PIXEL;
export const RESUME_PAGE_MARGIN_PX = PAGE_MARGIN_PT / POINTS_PER_CSS_PIXEL;
export const RESUME_PAGE_GUTTER_PX = 20;
export const RESUME_PREVIEW_PAGE_FLOW_GAP_PX = RESUME_PAGE_GUTTER_PX + RESUME_PAGE_MARGIN_PX * 2;
export const RESUME_CONTENT_WIDTH_PX = (A4_WIDTH_PT - PAGE_MARGIN_PT * 2) / POINTS_PER_CSS_PIXEL;
export const RESUME_CONTENT_HEIGHT_PX = (A4_HEIGHT_PT - PAGE_MARGIN_PT * 2) / POINTS_PER_CSS_PIXEL;

export const RESUME_PDF_OPTIONS: ExportOptions = {
  backgroundColor: '#ffffff',
  format: 'a4',
  marginPt: [PAGE_MARGIN_PT, PAGE_MARGIN_PT, PAGE_MARGIN_PT, PAGE_MARGIN_PT],
  pageConfig: {},
  pagination: true,
};
