import { call, put, takeEvery } from "redux-saga/effects";
import { fetchCategoriesData } from "./api";
import { setData, setError, setLoading } from "./slice";
import { GET_CATEGORIES } from "./constants";

// Inside your fetchCategoriesApiData saga:
function* fetchCategoriesApiData():any {
    try {
      yield put(setLoading());
      const data = yield call(fetchCategoriesData);
      console.log('API Data:', data);  // Log data to check response
      yield put(setData(data));
    } catch (error) {
      console.log('Error:', error);
      if (error instanceof Error) {
        yield put(setError(error.message));
      } else {
        yield put(setError("An unknown error occurred"));
      }
    }
  }
  
function* categoriesSaga(){
    yield takeEvery(GET_CATEGORIES,fetchCategoriesApiData);
}

export default categoriesSaga