import {Pipe, PipeTransform} from '@angular/core';
import {SettingsService} from '../../auth/settings.service';

export interface UnitInfo {
  unit: string,
  type: string,
  to: string[]
}

export const units: UnitInfo[] = [
  {unit: 'kmh', type: 'metric', to: ['mph']},
  {unit: 'mph', type: 'imperial', to: ['kmh']},

  {unit: 'm', type: 'metric', to: ['foot']},
  {unit: 'km', type: 'metric', to: ['mile']},
  {unit: 'cm', type: 'metric', to: ['inch']},
  {unit: 'mm', type: 'metric', to: ['inch']},

  {unit: 'foot', type: 'imperial', to: ['m']},
  {unit: 'yard', type: 'imperial', to: ['m']},
  {unit: 'inch', type: 'imperial', to: ['cm']},
  {unit: 'foot', type: 'imperial', to: ['m']},
  {unit: 'mile', type: 'imperial', to: ['km']},

  {unit: 'kg', type: 'metric', to: ['pound']},
  {unit: 'g', type: 'metric', to: ['ounce']},

  {unit: 'pound', type: 'imperial', to: ['kg']},
  {unit: 'ounce', type: 'imperial', to: ['g']},

  {unit: '°C', type: 'temperature', to: ['°F']},
  {unit: '°F', type: 'temperature', to: ['°C']},

];

export const unitAliases = {
  'C': '°C',
  'F': '°F'
};

export const converters = {
  'kmh_mph': (v) => v * 0.621371,
  'mph_kmh': (v) => v * 1.60934,
  'm_foot': (v) => v * 3.28084,
  'foot_m': (v) => v * 0.3048,
  'km_mile': (v) => v * 0.621371,
  'mile_km': (v) => v * 1.60934,
  'cm_inch': (v) => v * 0.393701,
  'inch_cm': (v) => v * 2.54,
  'mm_inch': (v) => v * 0.0393701,
  'pound_kg': (v) => v * 0.453592,
  'kg_pound': (v) => v * 2.20462,
  'ounce_g': (v) => v * 28.3495,
  'g_ounce': (v) => v * 0.035274,
  'C_F': (v) => v * 9 / 5 + 32,
  'F_C': (v) => (v - 32) * 5 / 9
};

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  constructor(private settings: SettingsService) {

  }

  getUnitInfo(unit: string) {
    if (unitAliases[unit]) {
      unit = unitAliases[unit];
    }
    return units.find(u => u.unit === unit);
  }

  getTargetUnit(info: UnitInfo, type: string) {
    const matchingUnits = info.to.filter(unit => this.getUnitInfo(unit).type === type);
    if (!matchingUnits.length) {
      return null;
    }
    return matchingUnits[0];
  }

  transform(value: number, unit: string): number {
    const targetUnit = this.transformUnit(unit);
    if (targetUnit !== unit) {
      return this.convert(unit, targetUnit, value);
    } else {
      return value;
    }
  }

  transformUnit(unit: string) {
    const info = this.getUnitInfo(unit);
    if (!info) {
      return unit;
    }

    let targetUnit = null;
    if (info.type === 'temperature') {
      targetUnit = unit !== this.settings.temperatureUnit ? this.getTargetUnit(info, 'temperature') : unit;
    } else if (info.type !== this.settings.units) {
      targetUnit = this.getTargetUnit(info, this.settings.units);
    }
    if (targetUnit) {
      return targetUnit;
    } else {
      return unit;
    }
  }

  convert(sourceUnit: string, targetUnit: string, value: any) {
    const converter = sourceUnit + '_' + targetUnit;
    if (converters[converter]) {
      return converters[converter](value);
    }
    return null;
  }


}
