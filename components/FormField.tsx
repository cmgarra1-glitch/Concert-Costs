type FormFieldProps = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
};

export function FormField({ label, htmlFor, children, hint }: FormFieldProps) {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-[9rem_1fr] md:items-center md:gap-3">
      <label htmlFor={htmlFor} className="text-sm font-medium md:text-right">
        {label}
      </label>
      <div>
        {children}
        {hint && <p className="mt-1 text-xs text-base-content/60">{hint}</p>}
      </div>
    </div>
  );
}
