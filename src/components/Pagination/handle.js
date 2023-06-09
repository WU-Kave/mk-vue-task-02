export default {
    data() {
        return {
            //分页对象,此处可以重新定义使其被覆盖
            pageObj: {
                position: 'left', //分页组件位置
                total: 100,
                pageData: {
                    page: 1,
                    size: 10,
                },
            },
        }
    },
    method: {
        //分页处理
        handlePageTotal(totalCount) {
            this.pageObj.total = totalCount
        },
        //页码变化
        handleCurrentChange(e) {
            console.log('页码', e)
            this.pageObj.page = e
            // this.fetchData();
        },
        //条数变化
        handleSizeChange(e) {
            console.log('条数', e)
            this.pageObj.size = e
            this.pageObj.page = 1
            // this.fetchData();
        },
    }
}