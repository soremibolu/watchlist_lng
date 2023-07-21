import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";

export type Data = {
  title: string;
  year: string;
  poster: string;
  bookmarkStatus: boolean;
};

const myBookmarks = new BehaviorSubject<Data[]>([]);

const allData = new BehaviorSubject<Data[]>([]);
export function getMain(data: Data[]) {
  const completeData = data.map((item) => {
    const items: Data = { ...item, bookmarkStatus: false };
    bookmarks$().subscribe((bookmarked) => {
      bookmarked.forEach((item) => {
        if (items.title === item.title) {
          items.bookmarkStatus = true;
        }
      });
    });
    return items;
  });

  updateMainData(completeData);
}

export function updateMainData(data: Data[]) {
  allData.next(data);
}

export function updateBookmarks(state: Data): void {
  let bookmarkData: Data[] = [];
  const getBookmarkData = bookmarks$().subscribe((data) => {
    bookmarkData = data;
  });
  const filteredBookmarks = bookmarkData.filter((object) => {
    return object.title === state.title;
  });

  if (filteredBookmarks.length > 0) {
    // delete
    const bookmarksDataWithoutFiltered = bookmarkData.filter((object) => {
      return object.title !== state.title;
    });

    myBookmarks.next(bookmarksDataWithoutFiltered);
  } else {
    myBookmarks.next([...bookmarkData, state]);
  }

  getBookmarkData.unsubscribe();
}

export function bookmarks$(): Observable<Data[]> {
  return myBookmarks.asObservable().pipe(distinctUntilChanged());
}

export function allData$(): Observable<Data[]> {
  return allData.asObservable();
}
