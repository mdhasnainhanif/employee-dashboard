export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarUrl: string;
};

export type AttendanceRecord = {
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  totalMinutes: number;
  status: string;
};


export type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
};


export type CardProps = {
  employee: Employee;
  onUpdate: (updated: Employee) => void; 
};

export type PerformanceReview = {
  id: string;
  period: string;
  score: number;
  rating: "green" | "yellow" | "red" | string;
  reviewer: string;
};