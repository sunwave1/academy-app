import {
  IsEmail,
  IsNotEmpty,
  Matches,
  IsBooleanString,
  Length,
} from 'class-validator';

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
