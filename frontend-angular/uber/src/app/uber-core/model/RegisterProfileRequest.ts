/**
 * Uber core API

 */

import * as models from './models';

export interface RegisterProfileRequest {
  /**
   * Description of the offer
   */
  description?: string;

  /**
   * URL to image for the offer
   */
  image?: string;

  /**
   * The provider of the offer
   */
  provider?: string;

  /**
   * The points required to buy a voucher from that offer
   */
  requiredPoints?: number;

  /**
   * Status of the offer
   */
  status?: string;

  /**
   * Title of the offer
   */
  title?: string;

}
