/*
 * @Author: ao.xia
 * @Date: 2020-01-25 21:48:59
 * @Last Modified by: ao.xia
 * @Last Modified time: 2020-01-26 17:07:06
 */

interface Table {
    prop: string;
    label: string;
    width: number | string;
    align: string;  // 对齐方式

}

export const tableConfig: Table[] = [
    {
        prop: 'id',
        label: 'ID',
        width: 100,
        align: 'center',
    },
    {
        prop: 'fileName',
        label: '文件名称',
        width: 100,
        align: 'center',
    },
    {
        prop: 'previewUrl',
        label: '文件预览',
        width: 100,
        align: 'center',
    },
    {
        prop: 'url',
        label: '文件地址',
        width: 100,
        align: 'center',
    },
    {
        prop: 'fileType',
        label: '文件类型',
        width: 100,
        align: 'center',
    },
    {
        prop: 'size',
        label: '文件大小',
        width: 100,
        align: 'center',
    },
    {
        prop: 'createTime',
        label: '上传时间',
        width: 100,
        align: 'center',
    },
];

export interface ItabelData {
    id: string;
    fileName: string;
    previewUrl: string;
    url: string;
    fileType: string;
    size: string;
    createTime: string;
}
