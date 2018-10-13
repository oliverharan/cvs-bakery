export interface ReceipeCatalog {
  items: [{
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
          active: boolean;
          static: boolean;
          description?: string;
          code: [{
            id?: string;
            language: string;
            script: string;
          }]
        }]
      }];
    }];
  }];
}
