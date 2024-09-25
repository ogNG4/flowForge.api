import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { DateUnit } from '~/constans/common';

@Injectable()
export class CommonService {
    constructor() {}

    generateUniqueDigits(length: number) {
        const buffer = crypto.randomBytes(length);
        let result = '';
        for (let i = 0; i < length; i++) {
            result += buffer[i] % 10;
        }
        return result;
    }

    addToDate(date: Date, unit: DateUnit, value: number) {
        const newDate = new Date(date);
        switch (unit) {
            case DateUnit.Second:
                newDate.setSeconds(newDate.getSeconds() + value);
                break;
            case DateUnit.Minute:
                newDate.setMinutes(newDate.getMinutes() + value);
                break;
            case DateUnit.Hour:
                newDate.setHours(newDate.getHours() + value);
                break;
            case DateUnit.Day:
                newDate.setDate(newDate.getDate() + value);
                break;
            case DateUnit.Month:
                newDate.setMonth(newDate.getMonth() + value);
                break;
            case DateUnit.Year:
                newDate.setFullYear(newDate.getFullYear() + value);
                break;
        }
        return newDate;
    }
}
