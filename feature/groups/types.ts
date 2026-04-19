// feature/groups/types.ts
export interface Group {
  id: string;
  name: string;
  subject: string;
  teacherName: string;
  studentCount: number;
  schedule: string;
  color: string;
  isActive?: boolean; // ✅ qo'shildi
}

export type Student = {
  id: string;
  name: string;
  phone: string;
  parentPhone: string;  
  birthDate: string;    
  balance: number;
};

export type Grade = {
  id: string;
  studentId: string;
  date: string;       
  score: number;    
  comment?: string;
};

export type Attendance = {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
};