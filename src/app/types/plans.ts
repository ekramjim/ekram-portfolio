export interface Plan {
  heading: string;
  price: {
    monthly: number;
    yearly: number;
  };
  user: string;
  features: {
    profiles: string;
    posts: string;
    templates: string;
    view: string;
    support: string;
  };
}

export type plansData = Plan[];