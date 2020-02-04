import { Form } from './form.model';
import * as moment from 'moment';


function merge(source: any, target: any) {
    Object.getOwnPropertyNames(source)
        .forEach((prop: string) => {
            target[prop] = source[prop];
        });
};


export enum SearchState {
    Waiting,
    Searching,
    Finished,
};


abstract class SearchTargetBase {
    name: string = '';
    citys: Map<string, any> = new Map();
    getSrc(form: Form): string {
        return '';
    };
    searchState: SearchState = SearchState.Waiting;

};


export class SearchTarget extends SearchTargetBase {
    constructor(data?: SearchTargetBase) {
        super();
        if (data) {
            merge(data, this);
        }
    };
    is(searchState: SearchState): boolean {
        return this.searchState === searchState;
    };
};


export class SearchTargets {
    /**
     * 全部的搜尋標的
     */
    targets: SearchTarget[] = [
        new SearchTarget({
            name: 'agoda',
            citys: new Map([
                ['taipei', 4951],
                ['taichung', 12080],
                ['tainan', 18347],
                ['kaohsiung', 756],
                ['kenting', 18343],
                ['ilan', 88773,],
                ['hualien', 23127]
            ]),
            getSrc(form) {
                if (!this.citys.has(form.city)) return '';

                const city = this.citys.get(form.city);
                const dateFormat = 'YYYY-MM-DD';
                return `
https://www.agoda.com/zh-tw/pages/agoda/default/DestinationSearchResult.aspx?
city=${city}&
checkIn=${form.startDate.format(dateFormat)}&
checkout=${form.endDate.format(dateFormat)}&
rooms=1&
adults=2`.trim();

            },
            searchState: SearchState.Waiting,
        }),


        new SearchTarget({
            name: 'booking',
            citys: new Map([
                ['taipei', -2637882],
                ['taichung', -2637824],
                ['tainan', -2637882],
                ['kaohsiung', -2632378],
                ['kenting', -2637868],
                ['ilan', -900048295],
                ['hualien', -2631690]
            ]),
            getSrc(form) {
                if (!this.citys.has(form.city)) return '';

                const city = this.citys.get(form.city);

                return `
http://www.booking.com/searchresults.zh-tw.html?
src=city&
city=${city}&
checkin_year=${form.startDate.format('YYYY')}&
checkin_month=${form.startDate.format('MM')}&
checkin_monthday=${form.startDate.format('DD')}&
checkout_year=${form.endDate.format('YYYY')}&
checkout_month=${form.endDate.format('MM')}&
checkout_monthday=${form.endDate.format('DD')}
`.trim();

            },
            searchState: SearchState.Waiting,
        })
    ];

    /**
     * 下一個正在等待搜尋的目標
     */
    get next(): SearchTarget {
        return this.targets.find((target: SearchTarget) => target.is(SearchState.Waiting));
    }

    /**
     *  全部都在等待搜尋嗎?
     */
    get isAllUnderWaiting(): boolean {
        return this.targets.every((target: SearchTarget) => target.is(SearchState.Waiting));
    };

    /**
     *  全部都完成搜尋了嗎?
     */
    get isAllFinished(): boolean {
        return this.targets.every((target: SearchTarget) => target.is(SearchState.Finished));
    };

};

abstract class SearchResultBase {
    webName: string = '';
    area: string = '';
    hotelName: string = '';
    hotelStar: number = null;
    specialRank: string = '';
    roomTypeName: string = '';
    hasBreakfirst: boolean = null;
    price: number = null;
};
export class SearchResult extends SearchResultBase {

    constructor(data?: SearchResultBase) {
        super();
        if (data) {
            merge(data, this);
        }
    };
};