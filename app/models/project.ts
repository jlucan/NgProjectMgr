export interface Project {
  id: number;
  projectCode: string;
  projectName: string;
  projectDescription: string;
  projectComment: string;
  projectTypeId?: number;
  projectStateId?: number;
  projectStatusId?: number;
  clientId?: number;
  projectDueDate?: Date;
  projectEstStartDate?: Date;
  projectEstCompDate?: Date;
  projectActStartDate?: Date;
  projectActCompDate?: Date;
  estTimeHours?: number;
  estTimeDays?: number;
  wklySched: number;
  daySched1: number;
  daySched2: number;
  projectNotes: string;
  active?: boolean;
  deleted?: boolean;
  projectEnterDate: Date;
  projectModDate?: Date;
}
