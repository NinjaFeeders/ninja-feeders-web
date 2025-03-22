export interface Users{
  
    username:string;
    id: number; // Adiciona o campo ID para associar com o backend
    isFriend: boolean; // Adiciona o campo isFriend para determinar o estado da amizade
    sttFriends:string;
  }