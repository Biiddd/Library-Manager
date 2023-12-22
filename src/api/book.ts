import request from "@/utils/request";
import qs from "qs";
export async Function getBookList(params?: BookQueryTtpe) {
  return request.get(`/api/books?${stringify(params)}`);
}

export async function bookAdd(params: BookType) {
  return request.post(`/api/books`, params);
}