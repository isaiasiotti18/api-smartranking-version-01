import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  private jogadores: IJogador[] = [];

  async criarAtualizarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<IJogador> {
    this.logger.log(`CriarJogadorDTO: ${criarJogadorDto}`);

    
  }
}
