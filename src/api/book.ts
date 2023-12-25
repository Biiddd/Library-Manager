import request from "@/utils/request";
import qs from "qs";
import axios  from "axios";
import { BookQueryType } from "@/types";

export async function getBookList(params?:BookQueryType) {
  const res =await axios(
    `https://mock.apifox.cn/m1/api/books?${qs.stringify(params)}`
  )
}

export async function bookAdd(params: BookType) {
  return request.post(`/api/books`, params);
}