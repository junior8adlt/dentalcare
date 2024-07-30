'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Appointment } from '@/types/appwrites.types';
import { useState } from 'react';
import { AppointmentForm } from './forms/AppointmentForm';
import { Button } from './ui/button';

const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
  title,
  description,
}: {
  type: 'schedule' | 'cancel';
  patientId: string;
  userId: string;
  appointment?: Appointment;
  title: string;
  description: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className={`capitalize ${type === 'schedule' && 'text-green-500'}
            ${type === 'cancel' && 'text-red-500'}
          `}
        >
          {type === 'schedule' ? 'Agendar cita' : 'Cancelar cita'}
        </Button>
      </DialogTrigger>
      <DialogContent className='shad-dialog sm:max-w-md'>
        <DialogHeader className='mb-4 space-y-3 '>
          <DialogTitle className='capitalize'>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <AppointmentForm
          type={type}
          userId={userId}
          patientId={patientId}
          appointment={appointment}
          setOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
