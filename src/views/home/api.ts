/*
 * @Author: ao.xia 
 * @Date: 2020-01-25 22:30:57 
 * @Last Modified by: ao.xia
 * @Last Modified time: 2020-01-26 16:23:58
 */
import axios from 'axios';
import { Message } from 'element-ui';

export interface PageParams {
    page: number;
    pageSize: number;
}

const baseAjax: any = (ajaxParams: object): object => new Promise((resolve, reject) => {
    axios(ajaxParams).then((res: any) => {
        if (res.data) {
            resolve(res.data);
        } else {
            Message.error('数据请求失败');
            reject(res.data);
        }
    }).catch((e: object) => {
        reject(e);
    });
});

export const getListApi: any = ({ page = 1, pageSize = 10 }: PageParams): object => {
    return baseAjax({
        method: 'GET',
        url: `/image/list`,
        params: {
            page,
            pageSize,
        },
    });
};

export const deleteImgApi: any = (id: string): object => {
    return baseAjax({
        method: 'DELETE',
        url: `/image/del`,
        params: {
            id,
        },
    });
};

export const batchDeleteImgApi: any = (ids: string[]): object => {
    return baseAjax({
        method: 'DELETE',
        url: `/image/batch_del`,
        params: {
            ids: ids.join(','),
        },
    });
};

/**
 * 图片批量上传
 * @param files
 */
export const batchUploadImgApi: any = (files: any[]): object => {
    debugger;
    const formData: any = new FormData();
    const paramsKey: string = files.length > 1 ? 'files' : 'file';
    const url: string = files.length > 1 ? '/image/batch_upload_v1' : '/image/uoload_v1';
    files.forEach((file: any) => {
        formData.append(paramsKey, file);
    });
    return baseAjax({
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8',
        },
        data: formData,
    });
};
