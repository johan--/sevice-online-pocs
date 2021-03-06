/**
 * Gambit API
 * The Gambit API offers Endpoints for an Mobile App and a Management UI.
 *
 * OpenAPI spec version: 0.1.2
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface OfferInfo {
    /**
     * Description of the offer
     */
    description: string;

    /**
     * Unique Id of the offer
     */
    id: number;

    /**
     * URL to image for the offer
     */
    image: string;

    /**
     * The provider of the offer
     */
    provider: string;

    /**
     * The points required to buy a voucher from that offer
     */
    requiredPoints: number;

    /**
     * Shops where a bought voucher can be redeemed
     */
    shops?: Array<models.ShopInfo>;

    /**
     * Title of the offer
     */
    title: string;

}
