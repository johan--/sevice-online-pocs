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

export interface RegisterShopRequest {
    /**
     * Address of the shop
     */
    address: string;

    /**
     * Coordinate of the shop
     */
    latitude: number;

    /**
     * Coordinate of the shop
     */
    longitude: number;

    /**
     * Name of the shop
     */
    provider: string;

  /**
   * Status of the shop
   */

    status?: string;

}
