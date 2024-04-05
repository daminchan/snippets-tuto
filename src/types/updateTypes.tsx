
export interface Detail {
    title: string;
    description: string;
  }
  
  export interface Update {
    date: string;
    details: Detail[];
  }
  
  export type GetDetailStyleFunction = (title: string) => { color: string; fontWeight: string };



  export interface Style {
    color: string;
    fontWeight: string;
  }