import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  private jogadores: IJogador[] = [];

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.logger.log(`CriarJogadorDTO: ${JSON.stringify(criarJogadorDto)}`);

    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      await this.atualizar(jogadorEncontrado, criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarJogadores(): Promise<IJogador[]> {
    return await this.jogadores;
  }

  async consultarJogadorPorEmail(email: string): Promise<IJogador[]> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com o email: ${email}, não encontrado.`,
      );
    }

    return await [jogadorEncontrado];
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    const indexJogador = this.jogadores.indexOf(jogadorEncontrado);

    if (indexJogador === -1) {
      throw new NotFoundException(
        `Jogador com o email: ${email}, não encontrado.`,
      );
    }

    this.jogadores.splice(indexJogador, 1);
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, email, telefoneCelular } = criarJogadorDto;

    const jogador: IJogador = {
      _id: `${email}.${Date.now()}`,
      nome,
      email,
      telefoneCelular,
      ranking: 'NIVEL AA+',
      posicaoRanking: 3,
      urlFotoJogador: `www.cloud.aws.com/${Date.now()}-${nome
        .toLowerCase()
        .replace(' ', '')}.png`,
    };

    this.jogadores.push(jogador);
  }

  private atualizar(
    jogadorEncontrado: IJogador,
    criarJogadorDto: CriarJogadorDto,
  ): void {
    const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome;
  }
}
