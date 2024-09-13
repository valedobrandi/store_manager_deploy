export type RouteOptionsType = {
  [key: string]: {
    search?: {
      all: string;
      id: string;
      name?: string;
    };
    register: {
      url: string;
      method: 'POST';
      body: any;
    };
    update: {
      url: string;
      method: 'PUT';
      body: any;
    };
    delete: {
      url: string;
      method: 'DELETE';
    };
  };
};
