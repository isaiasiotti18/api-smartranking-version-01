import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './modules/jogadores/jogadores.module';

const LINK_CONEXAO =
  'mongodb+srv://admin:qK0xeqt6YpjC2TQe@api-smart-ranking.9k56p.mongodb.net/apismartrankingdatabase?retryWrites=true&w=majority';

@Module({
  imports: [MongooseModule.forRoot(LINK_CONEXAO), JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
