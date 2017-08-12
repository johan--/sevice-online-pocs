/**
 * Uber core API

 */

import * as models from './models';
import {Location} from "./Location";


export interface ServiceEditRequest {

  serviceTitle?: string;


  serviceCategory?: string;


  serviceDescription?: string;


  serviceCountry?: string;


  serviceCity?: string;


  serviceStreet?: string;


  serviceContact?: string;


}
