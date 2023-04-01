import { AdsModel } from './ads-model';
import { EventsModel } from './events-model';
import { PaidAdsModel } from './paid-ads-model';

export class PaymentAdsModel {
  id?: string;
  buyer?: string;
  ads_draft?: number;
  event_draft?: number;
  city?: number;
  position?: number;
  token?: any;
  price?: number;
  description?: string;
  app_token?: any;
  ad_date?: PaidAdsModel
  event_date?: EventsModel
}
