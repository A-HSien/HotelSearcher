"use strict";
function merge(source, target) {
    Object.getOwnPropertyNames(source)
        .forEach((prop) => {
        target[prop] = source[prop];
    });
}
;
var SearchState;
(function (SearchState) {
    SearchState[SearchState["Waiting"] = 0] = "Waiting";
    SearchState[SearchState["Searching"] = 1] = "Searching";
    SearchState[SearchState["Finished"] = 2] = "Finished";
})(SearchState = exports.SearchState || (exports.SearchState = {}));
;
class SearchTargetBase {
    constructor() {
        this.name = '';
        this.citys = new Map();
        this.searchState = SearchState.Waiting;
    }
    getSrc(form) {
        return '';
    }
    ;
}
;
class SearchTarget extends SearchTargetBase {
    constructor(data) {
        super();
        if (data) {
            merge(data, this);
        }
    }
    ;
    is(searchState) {
        return this.searchState === searchState;
    }
    ;
}
exports.SearchTarget = SearchTarget;
;
class SearchTargets {
    constructor() {
        /**
         * 全部的搜尋標的
         */
        this.targets = [
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
                    if (!this.citys.has(form.city))
                        return '';
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
                    if (!this.citys.has(form.city))
                        return '';
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
    }
    /**
     * 下一個正在等待搜尋的目標
     */
    get next() {
        return this.targets.find((target) => target.is(SearchState.Waiting));
    }
    /**
     *  全部都在等待搜尋嗎?
     */
    get isAllUnderWaiting() {
        return this.targets.every((target) => target.is(SearchState.Waiting));
    }
    ;
    /**
     *  全部都完成搜尋了嗎?
     */
    get isAllFinished() {
        return this.targets.every((target) => target.is(SearchState.Finished));
    }
    ;
}
exports.SearchTargets = SearchTargets;
;
class SearchResultBase {
    constructor() {
        this.webName = '';
        this.area = '';
        this.hotelName = '';
        this.hotelStar = null;
        this.specialRank = '';
        this.roomTypeName = '';
        this.hasBreakfirst = null;
        this.price = null;
    }
}
;
class SearchResult extends SearchResultBase {
    constructor(data) {
        super();
        if (data) {
            merge(data, this);
        }
    }
    ;
}
exports.SearchResult = SearchResult;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxlQUFlLE1BQVcsRUFBRSxNQUFXO0lBQ25DLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7U0FDN0IsT0FBTyxDQUFDLENBQUMsSUFBWTtRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUFBLENBQUM7QUFHRixJQUFZLFdBSVg7QUFKRCxXQUFZLFdBQVc7SUFDbkIsbURBQU8sQ0FBQTtJQUNQLHVEQUFTLENBQUE7SUFDVCxxREFBUSxDQUFBO0FBQ1osQ0FBQyxFQUpXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBSXRCO0FBQUEsQ0FBQztBQUdGO0lBQUE7UUFDSSxTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBcUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUlwQyxnQkFBVyxHQUFnQixXQUFXLENBQUMsT0FBTyxDQUFDO0lBRW5ELENBQUM7SUFMRyxNQUFNLENBQUMsSUFBVTtRQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBQUEsQ0FBQztDQUdMO0FBQUEsQ0FBQztBQUdGLGtCQUEwQixTQUFRLGdCQUFnQjtJQUM5QyxZQUFZLElBQXVCO1FBQy9CLEtBQUssRUFBRSxDQUFDO1FBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFBQSxDQUFDO0lBQ0YsRUFBRSxDQUFDLFdBQXdCO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQztJQUM1QyxDQUFDO0lBQUEsQ0FBQztDQUNMO0FB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