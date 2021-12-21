import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.schema';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    this.logger.log(`CriarJogadorDTO: ${JSON.stringify(criarJogadorDto)}`);

    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(`Jogador já cadastrado na base de dados.`);
    }

    const novoJogador = new this.jogadorModel(criarJogadorDto);

    return await novoJogador.save();
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id });

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não encontrado.`);
    }

    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizarJogadorDto })
      .exec();
  }

  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPorId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findById(_id);

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com o _id: ${_id}, não encontrado.`);
    }

    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findById(_id);

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não encontrado.`);
    } else {
      return await jogadorEncontrado.delete();
    }
  }
}
