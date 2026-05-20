export interface Payment {
  id: string;

  title: string;

  description?: string;

  amount: number;

  currency: string;

  status: string;

  paidAt?: string | null;

  createdAt?: string;

  gateway?: string;

  gatewayOrderId?: string;

  gatewayPaymentId?: string;
}

export interface Milestone {
  id: string;

  title: string;

  description?: string;

  status: string;

  createdAt: string;

  payments?: Payment[];
}

export interface Project {
  id: string;

  projectName: string;

  status: string;

  progress: number;

  client: {
    fullName: string;

    email: string;
  };

  milestones: Milestone[];
}