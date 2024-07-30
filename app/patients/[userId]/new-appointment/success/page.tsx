import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const SuccessPage = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || '';
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);

  console.log(appointment);
  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Link href='/'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='Logo'
            width={1000}
            height={1000}
            className='h-10 w-fit'
          />
        </Link>
        <section className='flex flex-col items-center'>
          <Image src='/assets/gifs/success.gif' alt='Success' width={280} height={300} />
          <h2 className='header mb-6 max-w-[600px] text-center'>
            Tu <span className='text-green-500'>cita</span> ha sido agendada con éxito!
          </h2>
          <p>Estaremos en contacto contigo para confirmar la cita y brindarte más información.</p>
        </section>
        <section className='request-details'>
          <p>Detalles de la cita:</p>
          <div className='flex items-center gap-3'>
            <Image src={doctor?.image!} alt='Doctor' width={100} height={100} className='size-6' />
            <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
            <div className='flex gap-2'>
              <Image src='/assets/icons/calendar.svg' alt='Calendar' width={24} height={24} />
              <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
          </div>
        </section>
        <Button variant='outline' className='shad-primary-btn' asChild>
          <Link href={`/patients/${userId}/new-appointment`}>Agendar otra cita</Link>
        </Button>
        <p className='copyright'>© 2024 DentalCare</p>
      </div>
    </div>
  );
};

export default SuccessPage;
