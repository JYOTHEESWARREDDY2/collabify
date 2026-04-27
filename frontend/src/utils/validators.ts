// ─── Individual Validators ────────────────────────────────────────────────────

export function required(label = 'This field'): (value: unknown) => string | undefined {
  return (value) => {
    if (value === null || value === undefined || String(value).trim() === '') {
      return `${label} is required`;
    }
  };
}

export function minLength(min: number, label = 'This field'): (value: string) => string | undefined {
  return (value) => {
    if (typeof value === 'string' && value.length < min) {
      return `${label} must be at least ${min} characters`;
    }
  };
}

export function maxLength(max: number, label = 'This field'): (value: string) => string | undefined {
  return (value) => {
    if (typeof value === 'string' && value.length > max) {
      return `${label} must be at most ${max} characters`;
    }
  };
}

export function isEmail(value: string): string | undefined {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) return 'Enter a valid email address';
}

export function isPositiveNumber(label = 'Amount'): (value: string) => string | undefined {
  return (value) => {
    const n = parseFloat(String(value).replace(/[$,]/g, ''));
    if (isNaN(n) || n <= 0) return `${label} must be a positive number`;
  };
}

export function isUrl(value: string): string | undefined {
  try {
    new URL(value);
  } catch {
    return 'Enter a valid URL (including https://)';
  }
}

// ─── Compose Validators ───────────────────────────────────────────────────────

type Validator<T> = (value: T) => string | undefined;

export function compose<T>(...validators: Validator<T>[]): Validator<T> {
  return (value) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
  };
}

// ─── Pre-built Rule Sets ──────────────────────────────────────────────────────

export const signupRules = {
  name: compose<string>(required('Name') as Validator<string>, minLength(2, 'Name')),
  email: compose<string>(required('Email') as Validator<string>, isEmail),
  password: compose<string>(required('Password') as Validator<string>, minLength(8, 'Password')),
};

export const dealRules = {
  brand: required('Brand name') as Validator<string>,
  deliverable: required('Deliverable') as Validator<string>,
  value: compose<string>(required('Deal value') as Validator<string>, isPositiveNumber('Deal value')),
};

export const invoiceRules = {
  brandName: required('Brand name') as Validator<string>,
  projectName: required('Project name') as Validator<string>,
  amount: compose<string>(required('Amount') as Validator<string>, isPositiveNumber()),
};

// ─── Formatters ───────────────────────────────────────────────────────────────

export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

export function parseCurrencyString(value: string): number {
  return parseFloat(value.replace(/[$,\s]/g, '')) || 0;
}
