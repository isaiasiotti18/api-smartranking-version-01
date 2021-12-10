import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);

    return [criarJogadorDto];
  }

  @Get()
  async consultarJogadores(@Query('email') email: string): Promise<IJogador[]> {
    return (await email)
      ? this.jogadoresService.consultarJogadorPorEmail(email)
      : this.jogadoresService.consultarJogadores();
  }

  @Delete()
  async deletarJogador(@Query('email') email: string): Promise<void> {
    await this.jogadoresService.deletarJogador(email);
  }
}
