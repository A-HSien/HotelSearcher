declare let $: any;
import { Subject }  from 'rxjs/Rx';

import { SearchResult, SearchTarget, SearchState } from '../search.model';


export function booking(
    $viewer: any,
    currentSearchTarget: SearchTarget

): Subject<SearchResult[]> {

    let subject = new Subject<SearchResult[]>();

    const whoIAm = 'booking';
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
    const hotels: any[] = $contents.find('.sr_item').toArray();

    let result: SearchResult[] = [];
    hotels.forEach(hotel => {

        hotel = $(hotel);
        const hotelName: string = hotel.find('.sr-hotel__name').text() as string;
        const price: string = hotel.find('.roomPrice .price').text().replace('TWD', '').trim().split(',').join('');
        const area: string = hotel.find('a.district_link').text();

        let star: number = 0;
        try {
            const startNumberClassName: string = 'ratings_stars_';
            const starClasses: string = hotel.find('.star_track').attr('class');
            const starClass: string = starClasses.split(startNumberClassName)[1][0];
            star = Number(starClass);

        }
        catch (err) {
            //console.log(`Parsing Error On: ${hotelName}`);
        }
        result.push(
            new SearchResult({
                webName: 'booking',
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

    const nextPage = $contents.find('.paging-next').attr('href');
    if (nextPage && hotels.length > 0) {
        $viewer[0].src = `http://www.booking.com${nextPage}`;
        
        setTimeout(() => {
            getContents(subject, $viewer, currentSearchTarget);
        }, 5500);

    } else {
        currentSearchTarget.searchState = SearchState.Finished
    }
    subject.next(result);
    return subject;
};
