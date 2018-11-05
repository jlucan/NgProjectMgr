export interface ProjectState {
  id: number;
  code: string;
  description: string;
  active?: boolean;
  createDate: Date;
  modDate?: Date;
}
