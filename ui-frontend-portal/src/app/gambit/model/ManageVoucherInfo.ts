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

export interface ManageVoucherInfo {
    /**
     * Unix timestamp when the voucher has been bought
     */
    boughtAt: number;

    /**
     * Which offer was bought with the voucher
     */
    offerId: number;

    /**
     * Whether the voucher has been redeemed
     */
    redeemed: boolean;

    /**
     * When the voucher has been redeemed by the partner or 0
     */
    redeemedAt: number;

    redeemedBy?: string;

    /**
     * Unique code of the voucher
     */
    voucherCode: string;

    /**
     * The points the voucher has cost the device
     */
    voucherPrice: number;

}