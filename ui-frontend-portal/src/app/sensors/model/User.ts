/**
 * Domain Persistence API
 * This API is the common interface to access the persistence domain for all the platform components
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface User {
    email?: string;

    firstName?: string;

    groups?: Array<models.Group>;

    id?: string;

    lastName?: string;

    mobileNumber?: string;

    phoneNumber?: string;

    tenant?: models.Tenant;

}
