import {
  IsEmail,
  IsNotEmpty,
  Matches,
  IsBooleanString,
  Length,
  IsOptional,
  Min,
  Max,
  IsDate,
  MinDate,
  MaxDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDTO {
  @IsNotEmpty()
  @Length(5, 255, {
    message: 'Senha deve conter de 5 a 255 caracteres',
  })
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 255, {
    message: 'Senha deve conter de 5 a 255 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número',
  })
  password: string;

  @IsBooleanString({
    message:
      'Você deve marcar se gostaria de receber nossos emails de oportunidades exclusivas!',
  })
  receive_marketing: boolean;
}

export class UpdateUserDTO {
  @IsNotEmpty()
  @Length(5, 255, {
    message: 'Senha deve conter de 5 a 255 caracteres',
  })
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Telefone deve ser preenchido' })
  @Matches(/^(55)?([1-9]{2})?(\d{4,5})(\d{4})$/, {
    message: 'Formato do telefone está incorreto',
  })
  phone: string;

  @Min(10, { message: 'Idade minima de 10 anos' })
  @Max(100, { message: 'Idade maxima de 100 anos' })
  age: number;

  @IsOptional()
  @Matches(/^(55)?([1-9]{2})?(\d{4,5})(\d{4})$/, {
    message: 'Formato do telefone está incorreto',
  })
  second_phone?: string;

  @IsNotEmpty()
  @Matches(
    /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/,
    {
      message: 'Formato do telefone está incorreto',
    },
  )
  cpf_cnpj: string;

  @IsBooleanString({
    message:
      'Você deve marcar se gostaria de receber nossos emails de oportunidades exclusivas!',
  })
  receive_marketing: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Deve ser uma data válida' })
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 100)), {
    message: 'Idade máxima permitida é 100 anos',
  })
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 5)), {
    message: 'Idade mínima permitida é 5 anos',
  })
  birth_date_at?: Date;
}
