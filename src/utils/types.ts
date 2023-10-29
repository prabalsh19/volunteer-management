export type VolunteerState = {
  volunteers: Volunteer[];
  status: string;
  error: null | string;
  formData: {
    name: string;
    phone: number;
    email: string;
    skills: string;
    availability: number;
    interest: string;
    associatedEvent: "";
  };
};

export type Volunteer = {
  name: string;
  phone: number;
  email: string;
  skills: string;
  availability: number;
  interest: string;
  associatedEvent: [string];
  _id?: string;
};

export type EventState = {
  events: Event[];
  status: string;
  error: null | string;
  formData: Event;
};

export type Event = {
  eventName: string;
  date: string;
  location: string;
  description: string;
  volunteersRequired: number;
  _id?: string;
};
