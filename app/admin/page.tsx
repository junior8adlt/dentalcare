import StatCard from '@/components/StatCard';
import { DataTable } from '@/components/table/DataTable';
import { columns } from '@/components/table/columns';
import { getAppointmentsList } from '@/lib/actions/appointment.actions';
import Image from 'next/image';
import Link from 'next/link';

const AdminPage = async () => {
  const appointments = await getAppointmentsList();

  console.log(appointments);
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href='/' className='cursor-pointer'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='logo'
            width={32}
            height={162}
            className='h-8 w-fit'
          />
        </Link>
        <p className='text-16-semibold'>Admin Dashboard</p>
      </header>
      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Bienvenido✌</h1>
          <p className='text-dark-700'>
            Empieza el día revisando las últimas citas y estadísticas de tu clínica.
          </p>
        </section>
        <section className='admin-stat'>
          <StatCard
            type='appointments'
            count={appointments?.scheduleCount}
            label='Citas confirmadas'
            icon='/assets/icons/appointments.svg'
          />
          <StatCard
            type='pending'
            count={appointments?.pendingCount}
            label='Citas pendientes'
            icon='/assets/icons/pending.svg'
          />
          <StatCard
            type='cancelled'
            count={appointments?.cancelledCount}
            label='Citas canceladas'
            icon='/assets/icons/cancelled.svg'
          />
        </section>
        <DataTable data={appointments?.documents} columns={columns} />
      </main>
    </div>
  );
};

export default AdminPage;
