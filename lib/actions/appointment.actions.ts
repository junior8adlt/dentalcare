'use server';
import { Appointment } from '@/types/appwrites.types';
import { revalidatePath } from 'next/cache';
import { ID, Query } from 'node-appwrite';
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from '../appwrite.config';
import { parseStringify } from '../utils';

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment,
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log('Error fetching appointment ', error);
  }
};

export const getAppointmentsList = async () => {
  try {
    const appointments = await databases.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [
      Query.orderDesc('$createdAt'),
    ]);
    const initialCount = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === 'scheduled') {
        acc.scheduleCount += 1;
      } else if (appointment.status === 'pending') {
        acc.pendingCount += 1;
      } else if (appointment.status === 'cancelled') {
        acc.cancelledCount += 1;
      }
      return acc;
    }, initialCount);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.log('Error fetching appointments list ', error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment,
    );

    if (!updateAppointment) {
      throw new Error('Appointment not found');
    }

    // sms notification

    revalidatePath(`/admin`);
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log('Error updating appointment ', error);
  }
};
