import { Body, Controller, Get, Post } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    const { nome, email } = criarJogadorDto;

    return JSON.stringify({
      nome,
      email,
    });
  }
}
