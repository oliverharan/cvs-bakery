export interface ReceipeCatalog {
  id: number;
  title: string;
  active: boolean;
  static: boolean;
  subtopic: {
    id: number;
    title: string;
    active: boolean;
    static: boolean;
  };
}
