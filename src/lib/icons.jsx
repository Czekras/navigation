import {
  Copy,
  CopyCheck,
  ChevronRight,
  RotateCcw,
  GripVertical,
  Trash2,
  Info,
} from 'lucide-react'
import { cx } from './cx'

/**
 * Thin re-exports around lucide-react: every call site keeps its existing name and
 * (color, size) API, but the actual glyphs now come from one shared icon library.
 * className is an extra escape hatch (Basic Auth's version doesn't need it) so call
 * sites can still hook into component-specific CSS, e.g. CodeCard's rotating chevron.
 */
export function CopyIcon({ color = 'currentColor', size = 15, className }) {
  return <Copy color={color} size={size} className={cx('icon', className)} />
}

export function CheckIcon({ color = 'currentColor', size = 15, className }) {
  return (
    <CopyCheck color={color} size={size} className={cx('icon', className)} />
  )
}

export function ChevronRightIcon({
  color = 'currentColor',
  size = 12,
  className,
}) {
  return (
    <ChevronRight
      color={color}
      size={size}
      strokeWidth={3}
      className={cx('icon', className)}
    />
  )
}

export function ResetIcon({ color = 'currentColor', size = 16, className }) {
  return (
    <RotateCcw color={color} size={size} className={cx('icon', className)} />
  )
}

export function GripIcon({ color = 'currentColor', size = 14, className }) {
  return (
    <GripVertical color={color} size={size} className={cx('icon', className)} />
  )
}

export function TrashIcon({ color = 'currentColor', size = 14, className }) {
  return <Trash2 color={color} size={size} className={cx('icon', className)} />
}

export function InfoIcon({ color = 'currentColor', size = 14, className }) {
  return (
    <Info
      color={color}
      size={size}
      strokeWidth={2.5}
      className={cx('icon', className)}
    />
  )
}
