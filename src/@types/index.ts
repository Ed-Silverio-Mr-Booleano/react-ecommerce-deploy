export interface IProduct {
  id: number;
  img: string;
  nome: string;
  preco: number;
  estoque: number;
  categoria: ICategory;
}

export interface ICategory {
  id: number;
  categoria: string;
}

