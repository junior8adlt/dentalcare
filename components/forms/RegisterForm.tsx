'use client';

import { Form, FormControl } from '@/components/ui/form';
import { Doctors, GenderOptions, IdentificationTypes } from '@/constants';
import { createUser } from '@/lib/actions/patient.actions';
import { UserFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomFormField from '../CustomFormField';
import { FileUploader } from '../FileUploader';
import SubmitButton from '../SubmitButton';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { SelectItem } from '../ui/select';
import { FormFieldType } from './PatientForm';

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      console.log(newUser);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-12 flex-1'>
        <section className='space-y-4 '>
          <h1 className='header'>Bienvenido 👋</h1>
          <p className='text-dark-700'>
            Hola <span className='font-bold'>{user.name}</span>, por favor completa los siguientes
            campos para continuar.
          </p>
        </section>
        <section className='space-y-6 '>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Información personal</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='name'
          label='Nombre completo'
          placeholder='Aljenadro Perez'
          iconSrc='/assets/icons/user.svg'
          iconAlt='User icon'
        />

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='email'
            label='Correo electrónico'
            placeholder='alejandroperez@gmail.com'
            iconSrc='/assets/icons/email.svg'
            iconAlt='Email icon'
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name='phone'
            label='Número de teléfono'
            placeholder='3331039342'
          />
        </div>

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name='birthDate'
            label='Fecha de nacimiento'
            placeholder='DD/MM/AAAA'
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name='gender'
            label='Género'
            renderSkeleton={(field) => (
              <FormControl {...field}>
                <RadioGroup
                  className='flex h-11 gap-6 xl:justify-between'
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className='radio-group'>
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className='text-dark-700 cursor-pointer'>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='address'
            label='Dirección'
            placeholder='Calle 123, Colonia Centro'
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='occupation'
            label='Ocupación'
            placeholder='Estudiante'
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='emergencyContactName'
            label='Nombre de contacto de emergencia'
            placeholder='Juan Perez'
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name='emergencyContactPhone'
            label='Número de teléfono de contacto de emergencia'
            placeholder='3331039342'
          />
        </div>
        <section className='space-y-6 '>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Información médica</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name='primaryPhysician'
          label='Dentista de cabecera'
          placeholder='Selecciona tu dentista de cabecera'
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className='flex cursor-pointer items-center gap-2'>
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={32}
                  height={32}
                  className='rounded-full border border-dark-500'
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='insuranceProvider'
            label='Aseguradora'
            placeholder='AXA Seguros'
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='insurancePolicyNumber'
            label='Número de póliza'
            placeholder='123456789'
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name='allergies'
            label='Alergias'
            placeholder='Escribe tus alergias'
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name='currentMedication'
            label='Medicamentos actuales'
            placeholder='Escribe tus medicamentos actuales que tomas'
          />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name='familyMedicalHistory'
            label='Historial médico familiar'
            placeholder='Escribe tu historial médico familiar ejemplo padre: diabetes, madre: hipertensión etc..'
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name='pastMedicalHistory'
            label='Historial médico previo'
            placeholder='Escribe tu historial médico previo ejemplo cirugías, enfermedades etc..'
          />
        </div>
        <section className='space-y-6 '>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Identificación y Verificación</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name='identificationType'
          label='Tipo de identificación'
          placeholder='Selecciona tu tipo de identificación'
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='identificationNumber'
          label='Número de identificación'
          placeholder='123456789'
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name='identificationDocument'
          label='Imagen de identificación'
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <section className='space-y-6 '>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Consentimiento y autorización</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name='treatmentConsent'
          label='Doy mi consentimiento para el tratamiento dental'
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name='disclosureConsent'
          label='Doy mi consentimiento para la divulgación de mi información médica para fines de tratamiento'
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name='privacyConsent'
          label='Doy mi consentimiento que he leído y acepto los términos y condiciones'
        />

        <SubmitButton isLoading={isLoading}>Empezar</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
