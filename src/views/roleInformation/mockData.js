export function mockData() {
    return new Promise(resolve => {
        const tableData = [
            {
                date: '2016-05-02',
                name: '王小虎1',
                address: '上海市普陀区金沙江路 1518 弄',
            },
            {
                date: '2016-05-04',
                name: '王小虎2',
                address: '上海市普陀区金沙江路 1517 弄',
            },
            {
                date: '2016-05-01',
                name: '王小虎3',
                address: '上海市普陀区金沙江路 1519 弄',
            },
            {
                date: '2016-05-03',
                name: '王小虎4',
                address: '上海市普陀区金沙江路 1516 弄',
            },
        ]
        const res = {
            code: 200,
            data: tableData,
            msg: 'success',
        }
        setTimeout(() => {
            resolve(res)
        }, 400)
    })
}