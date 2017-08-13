/**
 * Uber core API

 */

import * as models from './models';


export interface RegisterProfileRequest {
  /**
   * User fullname
   */
  fullName?: string;

  /**
   * User Profession
   */
  jobTitle?: string;

  /**
   * User country
   */
  userCountry?: string;

  /**
   * User city
   */
  userCity?: string;

  /**
   * User mobile-phone
   */
  mobilePhone?: string;

}
