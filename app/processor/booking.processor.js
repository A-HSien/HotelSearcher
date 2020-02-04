"use strict";
const Rx_1 = require("rxjs/Rx");
const search_model_1 = require("../search.model");
function booking($viewer, currentSearchTarget) {
    let subject = new Rx_1.Subject();
    const whoIAm = 'booking';
    if (currentSearchTarget.name !== whoIAm) {
        console.error(`wrong proccessor!! I'm ${whoIAm} not [${currentSearchTarget.name}].`);
        return subject;
    }
    if (currentSearchTarget.searchState === search_model_1.SearchState.Waiting) {
        currentSearchTarget.searchState = search_model_1.SearchState.Searching;
        getContents(subject, $viewer, currentSearchTarget);
    }
    ;
    return subject;
}
exports.booking = booking;
;
function getContents(subject, $viewer, currentSearchTarget) {
    const $contents = $viewer.contents();
    const hotels = $contents.find('.sr_item').toArray();
    let result = [];
    hotels.forEach(hotel => {
        hotel = $(hotel);
        const hotelName = hotel.find('.sr-hotel__name').text();
        const price = hotel.find('.roomPrice .price').text().replace('TWD', '').trim().split(',').join('');
        const area = hotel.find('a.district_link').text();
        let star = 0;
        try {
            const startNumberClassName = 'ratings_stars_';
            const starClasses = hotel.find('.star_track').attr('class');
            const starClass = starClasses.split(startNumberClassName)[1][0];
            star = Number(starClass);
        }
        catch (err) {
        }
        result.push(new search_model_1.SearchResult({
            webName: 'booking',
            area: area,
            hotelName: hotelName,
            hotelStar: star,
            specialRank: '',
            roomTypeName: '',
            hasBreakfirst: null,
            price: Number(price)
        }));
    });
    const nextPage = $contents.find('.paging-next').attr('href');
    if (nextPage && hotels.length > 0) {
        $viewer[0].src = `http://www.booking.com${nextPage}`;
        setTimeout(() => {
            getContents(subject, $viewer, currentSearchTarget);
        }, 5500);
    }
    else {
        currentSearchTarget.searchState = search_model_1.SearchState.Finished;
    }
    subject.next(result);
    return subject;
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va2luZy5wcm9jZXNzb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib29raW5nLnByb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsZ0NBQW1DO0FBRW5DLGtEQUEwRTtBQUcxRSxpQkFDSSxPQUFZLEVBQ1osbUJBQWlDO0lBSWpDLElBQUksT0FBTyxHQUFHLElBQUksWUFBTyxFQUFrQixDQUFDO0lBRTVDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUN6QixFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixNQUFNLFNBQVMsbUJBQW1CLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUNyRixNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEtBQUssMEJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzFELG1CQUFtQixDQUFDLFdBQVcsR0FBRywwQkFBVyxDQUFDLFNBQVMsQ0FBQztRQUN4RCxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFBQSxDQUFDO0lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBbkJELDBCQW1CQztBQUFBLENBQUM7QUFHRixxQkFDSSxPQUFnQyxFQUNoQyxPQUFZLEVBQ1osbUJBQWlDO0lBR2pDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQyxNQUFNLE1BQU0sR0FBVSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTNELElBQUksTUFBTSxHQUFtQixFQUFFLENBQUM7SUFDaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1FBRWhCLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsTUFBTSxTQUFTLEdBQVcsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBWSxDQUFDO1FBQ3pFLE1BQU0sS0FBSyxHQUFXLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0csTUFBTSxJQUFJLEdBQVcsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTFELElBQUksSUFBSSxHQUFXLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUM7WUFDRCxNQUFNLG9CQUFvQixHQUFXLGdCQUFnQixDQUFDO1lBQ3RELE1BQU0sV0FBVyxHQUFXLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sU0FBUyxHQUFXLFdBQVcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdCLENBQ0E7UUFBQSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQ1AsSUFBSSwyQkFBWSxDQUFDO1lBQ2IsT0FBTyxFQUFFLFNBQVM7WUFDbEIsSUFBSSxFQUFFLElBQUk7WUFDVixTQUFTLEVBQUUsU0FBUztZQUNwQixTQUFTLEVBQUUsSUFBSTtZQUNmLFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLEVBQUU7WUFDaEIsYUFBYSxFQUFFLElBQUk7WUFDbkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDdkIsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdELEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyx5QkFBeUIsUUFBUSxFQUFFLENBQUM7UUFFckQsVUFBVSxDQUFDO1lBQ1AsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUN2RCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFYixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixtQkFBbUIsQ0FBQyxXQUFXLEdBQUcsMEJBQVcsQ0FBQyxRQUFRLENBQUE7SUFDMUQsQ0FBQztJQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBQUEsQ0FBQyJ9