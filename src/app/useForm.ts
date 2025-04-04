// useForm.ts
"use client";
import { useState, useCallback, ChangeEvent, FormEvent } from "react";

type Errors<T> = Partial<{ [K in keyof T]: string }>;

function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validate?: (values: T) => Errors<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touched, setTouched] = useState<Partial<{ [K in keyof T]: boolean }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (
    e: FormEvent,
    onSubmit: (values: T) => Promise<void> | void
  ) => {
    e.preventDefault();
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  };

  return { values, errors, touched, handleChange, handleSubmit, isSubmitting };
}

export default useForm;
