import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PagePartnerInfo } from '../model/PagePartnerInfo';
import { PartnerStatistic } from '../model/PartnerStatistic';
import { RegisterPartnerRequest } from '../model/RegisterPartnerRequest';
import { PartnerInfo } from '../model/PartnerInfo';
import { RegisterOfferRequest } from '../model/RegisterOfferRequest';
import { ManageOfferInfo } from '../model/ManageOfferInfo';
import { VoucherInfo } from '../model/VoucherInfo';
import { OfferStatistic } from '../model/OfferStatistic';
import { StatisticsResponse } from '../model/StatisticsResponse';
import { ManageShopInfo } from '../model/ManageShopInfo';
import { RegisterShopRequest } from '../model/RegisterShopRequest';
import { ImInfo } from '../model/ImInfo';
import {ManageVoucherInfo} from '../model/ManageVoucherInfo';
import {VoucherRedeemedRequest} from '../model/VoucherRedeemedRequest';

export interface GameObjective {
  id: number;
  name: string;
  density: number;
  instructions: string;
  longitude: number;
  latitude: number;
  pollution: number;
  ranking: number;
}

@Injectable()
export class GambitApiService {

  baseUrl = '/manage';


  constructor(private http: Http) {
  }

  getGameObjectives(): Observable<GameObjective[]> {
    return this.http.get(this.baseUrl + '/statistics/objectives').map(res => res.json());
  }

  getImInfo(): Observable<ImInfo> {
    return this.http.get(this.baseUrl + '/partner/imInfo').map(res => res.json());
  }

  getPartner(id: string): Observable<PartnerInfo> {
    return this.http.get(this.baseUrl + '/partner/' + id).map(res => res.json());
  }

  getPartnerStatistics(partnerIds: number[]): Observable<PartnerStatistic> {
    const queryParams = [
      'partnerIds=' + partnerIds.join(',')
    ];
    return this.http.get(this.baseUrl + '/statistics/partners?' + queryParams.join('&')).map(res => res.json());
  }

  getOffersStatistics(partnerId: string, offerIds: number[]): Observable<OfferStatistic> {
    const queryParams = [
      'partnerId=' + partnerId,
      'offerIds=' + offerIds.join(',')
    ];
    return this.http.get(this.baseUrl + '/statistics/offers?' + queryParams.join('&')).map(res => res.json());
  }

  registerPartner(partnerData: RegisterPartnerRequest): Observable<PartnerInfo> {

    return this.http.post(this.baseUrl + '/partner', partnerData).map(res => res.json());
  }

  updatePartnerSetting(partnerSettingData: PartnerInfo): Observable<PartnerInfo> {
    return this.http.put(this.baseUrl + '/mysettings/', partnerSettingData).map(res => res.json());
  }

  updatePartner(partnerId: string, partnerData: PartnerInfo): Observable<PartnerInfo> {
    return this.http.put(this.baseUrl + '/partner/' + partnerId, partnerData).map(res => res.json());
  }

  updateOffer(partnerId: string, offerId: string, offerData: RegisterOfferRequest): Observable<ManageOfferInfo> {
    return this.http.put(this.baseUrl + '/partner/' + partnerId + '/offer/' + offerId, offerData).map(res => res.json());
  }

  updateShop(partnerId: string, shopId: string, shopData: RegisterOfferRequest): Observable<ManageShopInfo> {
    return this.http.put(this.baseUrl + '/partner/' + partnerId + '/shop/' + shopId, shopData).map(res => res.json());
  }

  registerOfferByPartner(offerData: RegisterOfferRequest, partnerId: string): Observable<ManageOfferInfo> {
    return this.http.post(this.baseUrl + '/partner/' + partnerId + '/offer', offerData).map(res => res.json());
  }

  registerShopByPartner(shopData: RegisterShopRequest, partnerId: string): Observable<ManageShopInfo> {
    return this.http.post(this.baseUrl + '/partner/' + partnerId + '/shop', shopData).map(res => res.json());
  }

  getOfferFromPartner(partnerId: string, offerId: string): Observable<ManageOfferInfo> {
    return this.http.get(this.baseUrl + '/partner/' + partnerId + '/offer/' + offerId).map(res => res.json());
  }

  getPartnerSetting(): Observable<PartnerInfo> {
    return this.http.get(this.baseUrl + '/mysettings').map(res => res.json());
  }

  getShopFromPartnerById(partnerId: string, shopId: string): Observable<ManageShopInfo> {
    return this.http.get(this.baseUrl + '/partner/' + partnerId + '/shop/' + shopId).map(res => res.json());
  }


  getPartners(page = 0, size = 20, sort = 'name', name = undefined): Observable<PagePartnerInfo> {
    const queryParams = [
      'page=' + page,
      'size=' + size,
      'sort=' + sort
    ];
    if (name !== undefined) {
      queryParams.push('name=' + encodeURIComponent(name));
    }
    return this.http.get(this.baseUrl + '/partner?' + queryParams.join('&')).map(res => res.json());
  }

  getOffersFromPartnerId(partnerId: string,
                         page = 0,
                         size = 21,
                         sort = 'title',
                         name = undefined): Observable<ManageOfferInfo> {
    const queryParams = [
      'page=' + page,
      'size=' + size,
      'sort=' + sort
    ];

    if (name !== undefined) {
      queryParams.push('name=' + encodeURIComponent(name));
    }
    return this.http.get(this.baseUrl + '/partner/' + partnerId + '/offer?' + queryParams.join('&')).map(res => res.json());
  }

  getShopsFromPartnerId(partnerId: string,
                        page = 0,
                        size = 21,
                        sort = 'address',
                        name = undefined): Observable<ManageShopInfo> {
    const queryParams = [
      'page=' + page,
      'size=' + size,
      'sort=' + sort
    ];

    if (name !== undefined) {
      queryParams.push('name=' + encodeURIComponent(name));
    }
    return this.http.get(this.baseUrl + '/partner/' + partnerId + '/shop?' + queryParams.join('&')).map(res => res.json());
  }

  getVouchers(partnerId: string,
              page = 0,
              size = 21,
              sort = 'boughtAt',
              offerId = undefined,
              name = undefined): Observable<VoucherInfo> {
    const queryParams = [
      'page=' + page,
      'size=' + size,
      'sort=' + sort
    ];
    if (offerId !== undefined) {
      queryParams.push('offerId=' + encodeURIComponent(offerId));
    }
    if (name !== undefined) {
      queryParams.push('name=' + encodeURIComponent(name));
    }
    return this.http.get(this.baseUrl + '/partner/' + partnerId + '/voucher?' + queryParams.join('&')).map(res => res.json());
  }

  getStatisticsResponse(entity: string,
                        aggregation: string,
                        start: number,
                        end: number,
                        partnerId = undefined): Observable<StatisticsResponse> {
    const queryParams = [
      'start=' + start,
      'end=' + end

    ];

    if (partnerId !== undefined) {
      queryParams.push('partnerId=' + encodeURIComponent(partnerId));
    }

    return this.http.get(this.baseUrl + '/statistics/' + entity + '/' + aggregation + '?' + queryParams.join('&'))
      .map(res => res.json());
  }

  redeemVoucher(voucherCode: String, partnerId: String, isRedeemed: VoucherRedeemedRequest):  Observable<ManageVoucherInfo> {
    return this.http.put(this.baseUrl + '/partner/' + partnerId + '/voucher/' + voucherCode, isRedeemed).map(res => res.json());
  }

}
