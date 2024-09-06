import { all } from "redux-saga/effects";
import signUpSaga from "./auth/signUp";
import signInSaga from "./auth/signIn";
import addSong from "./song/addSongSaga";
import deleteSong from "./song/deleteSongSaga";
import setUserSaga from "./user/setUser";
import editSong from "./song/editSongSaga";
import favSong from "./song/favSongSaga";
import fetchRecentSaga from "./song/fetchRecentSaga";
import searchSongsSaga from "./song/searchSongsSaga";
import getByGenreSaga from "./song/getByGenre";
import signOutSaga from "./auth/signOut";
import getLibSongsSaga from "./song/getLibSaga";
import getMySongsSaga from "./song/getMySongsSaga";
import addToFavSaga from "./song/favSongsSaga";
import removeFromFavRequestSaga from "./song/removeFavSongsSaga";
import getFavsSaga from "./song/getFavsSaga";
import searchRequestForAddSaga from "./song/searchSongForAddSaga";

export default function* rootSaga() {
  yield all([
    setUserSaga(),
    addSong(),
    deleteSong(),
    signUpSaga(),
    signInSaga(),
    editSong(),
    favSong(),
    addToFavSaga(),
    fetchRecentSaga(),
    signOutSaga(),
    getByGenreSaga(),
    getLibSongsSaga(),
    getMySongsSaga(),
    removeFromFavRequestSaga(),
    searchSongsSaga(),
    getFavsSaga(),
    searchRequestForAddSaga(),
  ]);
}
