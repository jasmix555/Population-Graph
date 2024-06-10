export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface PopulationData {
  year: number;
  value: number;
}

export interface PopulationResponse {
  label: string;
  data: PopulationData[];
}

export interface ResasApiResponse<T> {
  message: string;
  result: T;
}

export interface PopulationResult {
  boundaryYear: number;
  data: PopulationResponse[];
}

export interface PopulationDataByPrefecture {
  [prefCode: number]: PopulationResponse[];
}
