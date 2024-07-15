import { z } from 'zod';

export const UserFormValidation = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('El email no es válido'),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), 'El teléfono no es válido'),
});
