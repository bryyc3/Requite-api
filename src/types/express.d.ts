
declare global {
    namespace Express {
      interface Request {
        user: {
          id: string;
          business_id?: string;
        };
      }
    }
  }
  
  export {};