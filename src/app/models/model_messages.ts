export interface Message {
    id: number;
    titulomsg: string;
    msg: string;
    likes: number;
    deslikes: number
    autor: string;
    autor_id: number;
    criada_em: Date;
    pontos: number;
    visibilidade_msg: string;
  }