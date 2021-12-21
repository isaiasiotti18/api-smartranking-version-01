import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// export const JogadorSchema = new mongoose.Schema({
//   telefoneCelular: { type: String, unique: true },
//   email: { Type: String, unique: true },
// });

@Schema({ timestamps: true, collection: 'jogadores' })
export class Jogador extends mongoose.Document {
  @Prop({ unique: true })
  telefoneCelular: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  nome: string;

  @Prop()
  ranking: string;

  @Prop()
  posicaoRanking: number;

  @Prop()
  urlFotoJogador: string;
}

export const JogadorSchema = SchemaFactory.createForClass(Jogador);
