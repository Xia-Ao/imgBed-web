<template >
    <div class="home" v-paste="handlePaste">
        <!-- 图片上传 -->
        <div class="upload-img-container">
            <el-upload
                ref="upload"
                class="upload-ele"
                drag
                action="#"
                multiple
                :auto-upload="false"
                :limit="5"
                :on-change="handleFileChange"
                :on-remove="handleFileChange"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div class="upload-btn">
                <el-button size="big" type="primary" @click.stop="handelUploadBtn">立即上传</el-button>
            </div>
        </div>

        <!-- 文件列表 -->
        <div class="img-table">
            <el-table :data="tableData" align="center" @selection-change="selectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="ID" width="50"></el-table-column>
                <el-table-column prop="fileName" label="文件名称" align="center"></el-table-column>
                <el-table-column label="文件预览" align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="right">
                            <img :src="scope.row.url" alt class="hover-img" />
                            <img
                                slot="reference"
                                :src="scope.row.url"
                                alt
                                class="preview-img"
                                @click="handleDetailDialogShow(scope.row)"
                            />
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="文件地址" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            type="primary"
                            @click.stop="copyUrl(scope.row.url)"
                        >复制</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="文件类型" align="center">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.fileType}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="size" label="文件大小(单位B)" align="center"></el-table-column>
                <el-table-column prop="createTime" label="上传时间" width="100" align="center"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleDetailDialogShow(scope.row)"
                            type="primary"
                            size="small"
                        >查看</el-button>
                        <el-button
                            type="danger"
                            size="small"
                            @click.stop="deleteImg(scope.row.id)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-filter">
                <el-button v-if="selectedArr.length > 0" @click="batchDeleteImg" type="danger">批量删除</el-button>
            </div>
            <el-pagination
                background
                @size-change="handlePageSizeChange"
                @current-change="handleCurrentPageChange"
                :current-page="page"
                :page-sizes="[5, 10, 20, 30, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                class="pagination-container"
            ></el-pagination>
        </div>

        <!-- 图片详情 -->
        <el-dialog
            :title="detailInfo.fileName"
            :visible.sync="detailShow"
            :before-close="handleDetailDialog"
            class="dialog-wrapper"
        >
            <div class="dialog-content">
                <img :src="detailInfo.url" alt class="detail-img" />
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="detailShow = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import VueClipboard from 'vue-clipboard2';
import {
  Table,
  TableColumn,
  Pagination,
  Button,
  Tag,
  Dialog,
  Message,
  MessageBox,
  Popover,
  Upload,
} from 'element-ui';

import {ItabelData } from './table';
import {
  getListApi,
  PageParams,
  deleteImgApi,
  batchDeleteImgApi,
  batchUploadImgApi,
} from './api';
import { baseApi } from '../../common/ts/global';

Vue.use(VueClipboard);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Popover);
Vue.use(Upload);

Vue.directive('paste', {
  bind(el, binding, vnode) {
    el.addEventListener('paste', function(event) {
      // 这里直接监听元素的粘贴事件
      binding.value(event);
    });
  },
});

@Component
export default class Home extends Vue {
  private tableData!: any[]; // 表格数据
  private page: number = 1; // 当前页
  private pageSize: number = 10; // 当前每页数量
  private totalCount: number = 10; // 表格总数
  private detailShow: boolean = false; // 详情dialog显示
  private detailInfo: object = {}; // 详情信息
  private selectedArr: any[] = []; // 已选择列表
  private filterForm: object = {}; //  过滤器表单
  private fileList: any[] = []; // 待文件上传列表

  private data() {
    return {
      tableData: [],
    };
  }
  private created(): void {
    this.initTable();
  }

  /**
   * 初始化文件表格
   * @params {Boolean} firstPage 是否展示第一页
   */
  private initTable(firstPage: boolean = false): void {
    if (firstPage) {
      this.page = 1;
      this.pageSize = 10;
    }
    const params: PageParams = {
      page: this.page,
      pageSize: this.pageSize,
    };
    getListApi(params)
      .then((res: any) => {
        if (res.status && res.data) {
          const { data = {} } = res;
          this.page = data.page;
          this.pageSize = data.pageSize;
          this.totalCount = data.total;
          this.tableData = this.formatTableData(data.list);
        } else {
          Message.error(res.message || '请求数据失败');
        }
      })
      .catch((e: object) => {
        console.warn(e);
      });
  }

  /**
   * 当前页变化处理
   * @params {number} page 页码
   */
  private handleCurrentPageChange(page: number): void {
    this.page = page;
    this.initTable();
  }

  /**
   * 每页数量变化处理
   * @params {number} pageSize 每页数量
   */
  private handlePageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.initTable();
  }

  /**
   * 处理列表数据
   * @params {array} tableData
   */
  private formatTableData(tableData: any[]): ItabelData[] {
    const resArr: ItabelData[] = [];
    tableData.forEach((item) => {
      resArr.push({
        id: item.id,
        fileName: item.fileName,
        previewUrl: item.url,
        url: item.url,
        fileType: item.extension,
        size: item.size,
        createTime: item.createTime,
      });
    });
    return resArr;
  }
  /**
   * 处理详情弹窗显示
   */
  private handleDetailDialogShow(data: any): void {
    this.detailInfo = data;
    this.handleDetailDialog();
  }

  /**
   * 处理详情弹窗状态
   */
  private handleDetailDialog(): void {
    this.detailShow = !this.detailShow;
  }

  /**
   * 复制链接到粘贴板
   * @param {string} url 文件地址
   */
  private copyUrl(url: string): void {
    if (!url) {
      Message.error(`链接为空，复制失败`);
      return;
    }
    this.$copyText(url).then(
      function(e) {
        Message.success(`${url} 已经成功复制`);
      },
      function(e) {
        Message.error(`${url} 复制失败`);
      },
    );
  }

  /**
   * 表格选择变化处理
   * @param {Array} selected 已选择列表
   */
  private selectionChange(selected: any[]): void {
    this.selectedArr = selected;
  }

  /**
   * 处理 粘贴板中截图的图片并上传
   * @param {object} e 事件对象
   */
  private async handlePaste(e: any) {
    let file: any = null;
    if (
      e.clipboardData &&
      e.clipboardData.items[0] &&
      e.clipboardData.items[0].type &&
      e.clipboardData.items[0].type.indexOf('image') > -1
    ) {
      // 这里就是判断是否有粘贴进来的文件且文件为图片格式
      file = e.clipboardData.items[0].getAsFile();
    } else {
      Message.warn(
        '上传的文件必须为图片且无法复制本地图片且无法同时复制多张图片',
      );
      return;
    }
    let fileName: string;
    try {
      fileName = await this.reNameFile();
    } catch (e) {
      console.warn(e);
      return;
    }

    if (!fileName) {
      return;
    }
    // 重命名文件名称，使用new File
    const newFile: any = new File([file], `${fileName}.png`, {
      type: file.type,
    });
    this.fileUpload([newFile]);
  }

  /**
   * 对粘贴板中的图片文件命名
   */
  private reNameFile(): any {
    return new Promise((resolve, reject) => {
      MessageBox.prompt('请输入文件名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.+/,
        inputErrorMessage: '文件名不能为空',
      })
        .then(({ value }: any) => {
          if (!value) {
            reject();
          }
          resolve(value);
        })
        .catch(() => {
          Message.info('已取消上传');
          reject('已取消上传');
        });
    });
  }

  /**
   * 立即上传按钮点击
   */
  private handelUploadBtn(): void {
    if (!(Array.isArray(this.fileList) && this.fileList.length > 0)) {
      Message.warning('文件列表为空');
      return;
    } else {
      const ref: any = this.$refs.upload;
      this.fileUpload(this.fileList.map((file) => file.raw))
        .then((res: any) => {
          this.fileList = [];
          ref.clearFiles();
        })
        .catch((res: any) => {
          this.fileList = [];
          ref.clearFiles();
        });
    }
  }

  /**
   * 图片上传功能
   * @params {Array} fileList 文件列表，内容为File对象
   * @returns Promise
   */
  private fileUpload(fileList: any[]): any {
    return new Promise((resolve, reject) => {
      batchUploadImgApi(fileList)
        .then((res: any) => {
          if (res.status) {
            Message.success(res.message || '图片上传成功');
            resolve();
          } else {
            const resList: any = res.data || {};
            const {
              successList = [],
              failList = [],
            }: { successList: any[]; failList: any[] } = resList;
            if (failList.length > 0) {
              // TODO 对faillist单独处理，从this.fileList移除successlist中成功的文件
            }
            Message.error(res.message || '图片上传失败，请重新上传');
            reject(res.data);
          }
          this.initTable(true);
        })
        .catch((e: object) => {
          console.warn(e);
        });
    });
  }

  /**
   * 上传文件列表变化处理
   */
  private handleFileChange(file: any, fileList: any): void {
    this.fileList = fileList;
  }

  /**
   * 单个删除图片
   * @param {string} id 文件id
   */
  private deleteImg(id: string): void {
    MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        if (!id) {
          Message.warn('图片ID为空，请检查正确之后再删除！');
          return;
        }
        deleteImgApi(id)
          .then((res: any) => {
            if (res.status) {
              this.initTable();
              Message.error(res.message || '删除成功！');
            } else {
              Message.error(res.message || '删除遇到错误！');
            }
          })
          .catch((e: object) => {
            console.warn(e);
          });
      })
      .catch(() => {
        Message.info('已取消删除');
      });
  }

/**
 * 批量删除文件
 */
  private batchDeleteImg(): void {
    MessageBox.confirm('此操作将永久删除文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        if (this.selectedArr.length <= 0) {
          Message.warn('图片ID列表为空，请检查正确之后再删除');
          return;
        }
        const ids: string[] = this.selectedArr.map((item: any) => item.id);
        batchDeleteImgApi(ids)
          .then((res: any) => {
            if (res.status) {
              this.initTable();
              Message.error(res.message || '删除成功！');
            } else {
              Message.error(res.message || '删除遇到错误！');
            }
          })
          .catch((e: object) => {
            console.warn(e);
          });
      })
      .catch(() => {
        Message.info('已取消删除');
      });
  }
}
</script>
<style lang="less" scoped>
.upload-img-container {
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .upload-btn {
        margin-left: 50px;
    }
}
.img-table {
    .hover-img {
        max-width: 800px;
    }
    .preview-img {
        width: 50px;
        height: auto;
        cursor: pointer;
    }
}

.table-filter {
    margin: 10px auto;
}
.pagination-container {
    text-align: right;
    margin-bottom: 10px;
}
.dialog-wrapper {
    .el-dialog {
        min-width: 20%;
        width: auto;
        max-width: 70%;
    }
    .dialog-content {
        text-align: center;
        width: auto;
        .detail-img {
            max-width: 100%;
        }
    }
}
</style>