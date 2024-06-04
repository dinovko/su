import { IPageQueryDto } from "types";

/**
 * Преобразует объет IPageQueryDto в строку с запросом
 * @param query IPageQueryDto
 * @returns string
 */
export const GetQuery = (query: IPageQueryDto): string => `?page=${query.pageNumber}&size=${query.pageSize}&filter=${query.filter}`;