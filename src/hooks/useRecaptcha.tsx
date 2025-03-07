'use client';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type UseRecaptchaProps = {
  isOpen: boolean;
  onVerify?: (token: string) => void;
};

export const useRecaptcha = ({ isOpen, onVerify }: UseRecaptchaProps) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      resetRecaptcha();
    }
  }, [isOpen]);

  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setRecaptchaToken('');
  };

  const executeRecaptcha = (token: string | null) => {
    const validToken = token || '';
    console.log('Setting recaptcha token:', validToken);
    setRecaptchaToken(validToken);

    if (validToken && onVerify) {
      onVerify(validToken);
    }

    return validToken;
  };

  return {
    recaptchaRef,
    recaptchaToken,
    setRecaptchaToken,
    resetRecaptcha,
    executeRecaptcha,
    isLoading
  };
};