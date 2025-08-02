export interface IDoctor {
  name: string;
  hospitalName: string;
  emailId: string;
  contactDetails: string;
  specialization: string;
  description: string;
  isAvailable: boolean;
}

export interface IPatient {
  doctorId: string;
  doctorName: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  description: string;
  date: string;
  time: string;
}
