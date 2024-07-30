'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { decryptKey, encryptKey } from '../lib/utils';

const PassKeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const encryptedKey =
    typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null;

  const closeModal = () => {
    setIsOpen(false);
    router.push('/');
  };

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setIsOpen(false);
        router.push('/admin');
      } else {
        setIsOpen(true);
      }
    }
  }, [encryptedKey]);

  const validateOtp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (otp === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(otp);
      localStorage.setItem('accessKey', encryptedKey);
      setIsOpen(false);
      router.push('/admin');
    } else {
      setError('Clave incorrecta, por favor intente de nuevo.');
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between'>
            Acceso de administrador
            <Image
              src='/assets/icons/close.svg'
              alt='close icon'
              width={20}
              height={20}
              onClick={() => closeModal()}
              className='cursor-pointer'
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Para acceder a la página de administrador, por favor ingrese la clave de acceso.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
            <InputOTPGroup className='shad-otp'>
              <InputOTPSlot className='shad-otp-slot' index={0} />
              <InputOTPSlot className='shad-otp-slot' index={1} />
              <InputOTPSlot className='shad-otp-slot' index={2} />
              <InputOTPSlot className='shad-otp-slot' index={3} />
              <InputOTPSlot className='shad-otp-slot' index={4} />
              <InputOTPSlot className='shad-otp-slot' index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validateOtp(e)} className='shad-primary-btn'>
            Acceder
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
