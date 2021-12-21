import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.schema';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarAJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPorId(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadorPorId(_id);
  }

  @Put('/:_id/atualizar')
  async atualizarJogador(
    @Param('_id') _id: string,
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    return await this.jogadoresService.atualizarJogador(
      _id,
      atualizarJogadorDto,
    );
  }

  @Delete('/:_id/deletar')
  async deletarJogador(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    return await this.jogadoresService.deletarJogador(_id);
  }
}
