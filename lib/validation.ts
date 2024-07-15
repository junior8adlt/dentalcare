import { z } from 'zod';

export const UserFormValidation = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), 'Número de teléfono inválido'),
});

export const PatientFormValidation = z
  .object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Correo electrónico inválido'),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), 'Número de teléfono inválido'),
    birthDate: z.coerce.date(),
    gender: z.enum(['male', 'female', 'other']),
    address: z
      .string()
      .min(5, 'La dirección debe tener al menos 5 caracteres')
      .max(500, 'La dirección debe tener como máximo 500 caracteres'),
    occupation: z
      .string()
      .min(2, 'La ocupación debe tener al menos 2 caracteres')
      .max(500, 'La ocupación debe tener como máximo 500 caracteres'),
    emergencyContactName: z
      .string()
      .min(2, 'El nombre del contacto de emergencia debe tener al menos 2 caracteres'),
    emergencyContactNumber: z
      .string()
      .refine(
        (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
        'Número de teléfono inválido',
      ),
    primaryPhysician: z.string().min(2, 'Selecciona al menos un dentista'),
    insuranceProvider: z.string().optional(),
    insurancePolicyNumber: z.string().optional(),
    allergies: z.string().optional(),
    currentMedication: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    identificationType: z.string().optional(),
    identificationNumber: z.string().optional(),
    identificationDocument: z.custom<File[]>().optional(),
    treatmentConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: 'Debes consentir el tratamiento para proceder',
      }),
    disclosureConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: 'Debes consentir la divulgación para proceder',
      }),
    privacyConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: 'Debes consentir la privacidad para proceder',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.phone === data.emergencyContactNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El número de teléfono no puede ser igual al número de contacto de emergencia',
        fatal: true,
        path: ['emergencyContactNumber'],
      });
    }
  });

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Selecciona al menos un dentista'),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, 'La razón debe tener al menos 2 caracteres')
    .max(500, 'La razón debe tener como máximo 500 caracteres'),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Selecciona al menos un dentista'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Selecciona al menos un dentista'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, 'La razón debe tener al menos 2 caracteres')
    .max(500, 'La razón debe tener como máximo 500 caracteres'),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case 'create':
      return CreateAppointmentSchema;
    case 'cancel':
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
