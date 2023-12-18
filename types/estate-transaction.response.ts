export interface EstateTransactionResponse {
  message: string | null;
  result: {
    prefCode: string;
    prefName: string;
    cityCode: string;
    cityName: string;
    displayType: string;
    years: Array<{
      year: number;
      value: number;
    }>;
  };
}
