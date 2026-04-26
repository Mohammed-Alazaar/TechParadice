import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...rest }, ref) => {
    const inputId = id ?? rest.name
    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-muted"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-12 rounded-md border border-border-light bg-white px-4 font-body text-[15px] text-void placeholder:text-void/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/40 dark:border-border-dark dark:bg-void dark:text-white dark:placeholder:text-white/40',
            error && 'border-danger focus:border-danger focus:ring-danger/40',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {hint && !error ? (
          <p className="text-[12px] text-muted">{hint}</p>
        ) : null}
        {error ? (
          <p id={`${inputId}-error`} className="text-[12px] text-danger">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)
Input.displayName = 'Input'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...rest }, ref) => {
    const tid = id ?? rest.name
    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={tid} className="text-[13px] font-medium text-muted">
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={tid}
          className={cn(
            'min-h-[140px] rounded-md border border-border-light bg-white px-4 py-3 font-body text-[15px] text-void placeholder:text-void/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/40 dark:border-border-dark dark:bg-void dark:text-white dark:placeholder:text-white/40',
            error && 'border-danger',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${tid}-error` : undefined}
          {...rest}
        />
        {error ? (
          <p id={`${tid}-error`} className="text-[12px] text-danger">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...rest }, ref) => {
    const sid = id ?? rest.name
    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={sid} className="text-[13px] font-medium text-muted">
            {label}
          </label>
        ) : null}
        <select
          ref={ref}
          id={sid}
          className={cn(
            'h-12 rounded-md border border-border-light bg-white px-4 font-body text-[15px] text-void focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/40 dark:border-border-dark dark:bg-void dark:text-white',
            error && 'border-danger',
            className,
          )}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="text-[12px] text-danger">{error}</p>
        ) : null}
      </div>
    )
  },
)
Select.displayName = 'Select'
