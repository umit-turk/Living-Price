// src/types.ts
export interface ExchangeRate {
    [key: string]: number;
  }
  
  export interface Price {
    good_id: number;
    item_name: string;
    category_id: number;
    category_name: string;
    min: number;
    avg: number;
    max: number;
    currency_code:string;
    usd: {
      measure: string;
      currency_code: string;
    };
  }
  
  export interface ApiResponse {
    city_id: number;
    city_name: string;
    state_code: string | null;
    country_name: string;
    exchange_rate: ExchangeRate;
    exchange_rates_updated: {
      date: string;
      timestamp: number;
    };
    prices: Price[];
  }
  