import request from "@/utils/request";
import qs from "qs";


import {BookQueryType, BookType} from "../type";

export async Function getCategoryList(params?: BookQueryTtpe) {
  return request.get(`/api/books?${stringify(params)}`);
}

export async function categoryAdd(params: BookType) {
  return request.post(`/api/books`, params);
}
