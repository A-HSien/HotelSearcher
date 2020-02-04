declare let $: any;
import { Subject }  from 'rxjs/Rx';

import { SearchResult, SearchTarget, SearchState } from '../search.model';


export function agoda(
    $viewer: any,
    currentSearchTarget: SearchTarget

): Subject<SearchResult[]> {

    let subject = new Subject<SearchResult[]>();

    const whoIAm = 'agoda';
    if (currentSearchTarget.name !== whoIAm) {
        console.error(`wrong proccessor!! I'm ${whoIAm} not [${currentSearchTarget.name}].`);
        return subject;
    }

    if (currentSearchTarget.searchState === SearchState.Waiting) {
        currentSearchTarget.searchState = SearchState.Searching;
        getContents(subject, $viewer, currentSearchTarget);
    };
    return subject;
};

function getContents(
    subject: Subject<SearchResult[]>,
    $viewer: any,
    currentSearchTarget: SearchTarget

): Subject<SearchResult[]> {
    const $contents = $viewer.contents();
    const hotels: any[] = $contents.find('.hotel-item-box').toArray();

    let result: SearchResult[] = [];
    hotels.forEach(hotel => {

        hotel = $(hotel);
        const hotelName: string = hotel.find('.hotel-name').text() as string;
        const price: string = hotel.find('.price.soft-red').text().split(',').join('');
        const area: string = hotel.find('.areacity-name-text').text();
        
        let star: number = 0;

        try {
            const startNumberClassName: string = 'ficon-star-';
            const starClasses: string = hotel.find('.ficon.orange-yellow').attr('class');
            const starClass: string = starClasses.split(startNumberClassName)[1].split(' ')[0];
            star = Number(starClass);
            star = (star >= 10) ? star / 10 : star;

        }
        catch (err) {
            //console.log(`Parsing Error On: ${hotelName}`);
        }
        result.push(
            new SearchResult({
                webName: 'agoda',
                area: area,
                hotelName: hotelName,
                hotelStar: star,
                specialRank: '',
                roomTypeName: '',
                hasBreakfirst: null,
                price: Number(price)
            })
        );
    });

    const nextPage = $contents.find('#paginationNext');
    if (nextPage && hotels.length > 0) {
        nextPage.click();

        setTimeout(() => {
            getContents(subject, $viewer, currentSearchTarget);
        }, 5500);

    } else {
        currentSearchTarget.searchState = SearchState.Finished
    }
    subject.next(result);
    return subject;
};