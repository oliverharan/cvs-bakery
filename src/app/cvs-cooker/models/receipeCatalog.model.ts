export interface ReceipeCatalog {
  id?: string;
  title: string;
  active: boolean;
  static: boolean;
  subtopic: [{
    id?: string;
    title: string;
    active: boolean;
    static: boolean;
    children?: [{
      id?: string;
      title: string;
      active?: boolean;
      static?: boolean;
      description: string;
    }];
  }];
}
