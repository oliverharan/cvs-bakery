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
      title?: string;
      active?: boolean;
      static?: boolean;
      description?: string;
      solution?: [{
        id?: string;
        title?: string;
        description?: string;
        language?: [{
          options: string
        }];
        code?: string;
        active: boolean;
        static: boolean;
      }]
    }];
  }];
}
