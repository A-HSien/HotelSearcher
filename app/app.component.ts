import { Component, AfterViewInit } from '@angular/core';
import { Subject }  from 'rxjs/Rx';
import * as moment from 'moment';
declare let $: any;


import * as Proccessor from './processor/processor.facade';
import { Form } from './form.model';
import { SearchTargets, SearchTarget, SearchResult, SearchState} from './search.model';


@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
})
export class AppComponent implements AfterViewInit {

    dateFormat = 'YYYY-MM-DD';
    serverErrorMsg = '';


    /**
     * 全部的搜尋標的大容器
     */
    searchTargets: SearchTargets = new SearchTargets();

    /**
     * 當前的搜尋標的
     */
    private currentSearchTarget: SearchTarget = null;

    /**
     * 訂房網顯示區塊
     */
    $viewer: any = null;

    form: Form = new Form();

    searchResult: SearchResult[] = [];


    constructor() {
        let cityList = this.form.cityList;
        this.searchTargets.targets.forEach(target => {
            target.citys.forEach((value, cityName) => {
                if (cityList.indexOf(cityName) < 0) {
                    cityList.push(cityName);
                }
            });

        });
    };

    ngAfterViewInit() {
        $('input[name="daterange"]').daterangepicker(
            {
                locale: {
                    format: this.dateFormat
                },
                startDate: this.form.startDate,
                endDate: this.form.endDate,
                minDate: moment().format(this.dateFormat)
            },
            (start: moment.Moment, end: moment.Moment, label: string) => {
                this.form.startDate = start;
                this.form.endDate = end;
            }
        );

        let $viewer = this.$viewer = $('#viewer');
        $viewer.on("load", this.$viewerLoaded.bind(this));
    };

    /**
     * 驅動畫面重載的事件
     */
    reloadEvevtHandler() {
        location.reload();
    };

    /**
     * 驅動搜尋的事件
     */
    searchEvevtHandler() {
        this.searchTargets = new SearchTargets();
        this.searchResult = [];
        this.startANewSearch();
    };
    /**
     * 開工囉
     */
    private startANewSearch() {
        let {searchTargets, $viewer} = this;

        // 設定搜尋目標為下一個
        let currentSearchTarget = this.currentSearchTarget = searchTargets.next;

        //沒下一家了
        if (!currentSearchTarget) { return; };

        //取得連結
        let src = currentSearchTarget.getSrc(this.form);

        //這家無法取得連結
        if (!src) {
            currentSearchTarget.searchState = SearchState.Finished;
            this.startANewSearch();
            return;
        }

        //設定連結
        $viewer[0].src = src;
    };

    /**
     * $viewer(訂房網區塊)下載完了
     */
    private $viewerLoaded() {
        // 設定搜尋目標
        let currentSearchTarget = this.currentSearchTarget;
        //currentSearchTarget = (
        //    currentSearchTarget.searchState === SearchState.Finished
        //) ? this.searchTargets.next : currentSearchTarget;

        if (!currentSearchTarget) return;


        // 尋找搜尋方法
        let searchProccessor: (($viewer: any, currentSearchTarget: SearchTarget) => (Subject<SearchResult[]>)) =
            Proccessor[currentSearchTarget.name];
        if (!searchProccessor) { // 沒找到搜尋方法
            console.error(`no proccessor for [${currentSearchTarget.name}]!!`);
        } else {  // 執行搜尋
            const subject = searchProccessor(this.$viewer, currentSearchTarget);
            subject.subscribe((searchResult) => {
                this.searchResult = this.searchResult.concat(searchResult);

                // 結束了就換下一家
                if (currentSearchTarget.searchState === SearchState.Finished) {
                    subject.unsubscribe();
                    this.startANewSearch();
                }
            });


        }

    };


};