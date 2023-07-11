export type Data = {
  title: string;
  year: number;
  poster: string;
  photo_width: number;
  photo_height: number;
  bookmarkStatus: boolean;
};

let bookmarks: Data[] = [];

export function updateBookmarks(state: Data): void {
  const newBookmarks = bookmarks.filter((object) => {
    return object.title === state.title;
  });

  if (newBookmarks.length > 0) {
    deleteFromBookmarks(state);
  } else {
    bookmarks.push(state);
  }
  console.log(bookmarks.length);
}

export function deleteFromBookmarks(state: Data) {
  const newBookmarks = bookmarks.filter((object) => {
    return object.title !== state.title;
  });

  bookmarks = newBookmarks;
}

export function getAllBookmarks(): Data[] {
  return bookmarks;
}
