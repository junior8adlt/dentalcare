'use client';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control } from 'react-hook-form';
import PhoneInput, { type Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FormFieldType } from './forms/PatientForm';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface CustomFormFieldProps {
  control: Control<any>;
  fieldType?: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomFormFieldProps }) => {
  const {
    name,
    fieldType,
    iconAlt,
    iconSrc,
    placeholder,
    disabled,
    dateFormat,
    showTimeSelect,
    renderSkeleton,
    children,
    label,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image src={iconSrc} alt={iconAlt || 'icon'} width={24} height={24} className='ml-2' />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              disabled={disabled}
              className='shad-input border-0'
              {...field}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='MX'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as Value | undefined}
            onChange={field.onChange}
            className='input-phone'
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          <Image
            src='/assets/icons/calendar.svg'
            alt='calendar icon'
            width={24}
            height={24}
            className='ml-2'
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat || 'MM/dd/yyyy'}
              showTimeSelect={showTimeSelect || false}
              timeInputLabel='Hora:'
              wrapperClassName='date-picker'
              isClearable
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton && renderSkeleton(field);

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='shad-select-trigger'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='shad-select-content'>{children}</SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className='shad-textArea border-0'
            disabled={disabled}
            {...field}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox id={name} checked={field.value} onCheckedChange={field.onChange} />
            <label htmlFor={name} className='checkbox-label'>
              {label}
            </label>
          </div>
        </FormControl>
      );

    default:
      break;
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel htmlFor={name}>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
