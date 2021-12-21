import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CriarJogadorDto {
  @IsPhoneNumber('BR', {
    message: 'Número de telefone/celular inválido.',
  })
  readonly telefoneCelular: string;

  @IsEmail(undefined, {
    message: 'O Email informado é inválido.',
  })
  readonly email: string;

  @IsNotEmpty()
  readonly nome: string;
}
