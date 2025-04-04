"use client";
import { useState } from "react";

function useForm(initialValues: any, validate?: (values: any) => any) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev: any) => ({ ...prev, [name]: value }));
    setTouched((prev: any) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent, onSubmit: (values: any) => Promise<void> | void) => {
    e.preventDefault();
    let validationErrors = {};
    if (validate) {
      validationErrors = validate(values);
      setErrors(validationErrors);
    }
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  };

  return { values, errors, touched, handleChange, handleSubmit, isSubmitting };
}

export default useForm;
