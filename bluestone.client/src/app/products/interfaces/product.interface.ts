export interface IProduct {
  id: number,
  imageUrl?: string,
  name?: string,
  code?: string,
  barcode?: string,
  model?: string,
  stock?: number,
  averageCost?: number,
  rsp?: number,
  lastUpdated: Date
}
