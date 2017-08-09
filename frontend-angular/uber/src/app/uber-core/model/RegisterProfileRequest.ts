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
   * Status of the User
   */
  status?: string;

  /**
   * User country
   */
  country?: string;

  /**
   * User city
   */
  city?: string;

  /**
   * User street
   */
  street?: string;

  /**
   * User mobile-phone
   */
  mobilePhone?: string;

}
