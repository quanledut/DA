const rank_top_1 = require('./ranks/rank_top_1.png')
const rank_top_2 = require('./ranks/rank_top_2.png')
const rank_top_3 = require('./ranks/rank_top_3.png')
const rank_top_4 = require('./ranks/rank_top_4.png')
const rank_top_5 = require('./ranks/rank_top_5.png')

export const StepperData = [
    {
        label:'Sản phẩm',
        optional:'Chọn sản phẩm cho đơn hàng'
    },
    {
        label:'Khách hàng',
        optional:'Thông tin khách hàng'
    },
    {
        label:'Thanh toán',
        optional:'Thông tin thanh toán và vận chuyển'
    }
]

export const PaymentType = [
    {
        caption: 'Thanh toán trực tiếp',
        value: 'direct'
    },
    {
        caption: 'Thanh toán qua ngân hàng',
        value: 'bank'
    },
    {
        caption:'Thanh toán sau khi nhận hàng',
        value: 'after_shipment'
    }
]

export const ShipmentType = [
    {
        caption: 'Giao tận nhà',
        value: 'company_shipping'
    },
    {
        caption: 'Khách tự vận chuyển',
        value: 'customer_shipping'
    }
]

export const BankName = [
    'ABBANK', 'ACB', 'BacABank', 'BaoVietBank, BVB', 'BIDV, BID', 'Eximbank, EIB', 'HDBank', 'PG Bank', 'NCB','OCB','PVcombank','Sacombank','VietinBank','Vietcombank','BIDV'
]

export const SaleOrderStatus = [
    {
        caption: 'Tất cả',
        value: 'all'
    },
    {
        caption: 'Chưa duyệt',
        value: 'New'
    },
    {
        caption: 'Đã duyệt',
        value: 'Confirmed'
    },
    {
        caption: 'Xong',
        value: 'Done'
    },
]

export const EmployeeRole = [
    {
        caption: 'Nhân viên bán hàng',
        value: 'employee'
    },
    {
        caption: 'Quản lý',
        value: 'admin'
    }
]

export const BackgroundColor = [
    'rgba(75, 192, 192, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 99, 132, 0.6)'
]

export const Ranks = [
    rank_top_1,
    rank_top_2,
    rank_top_3,
    rank_top_4,
    rank_top_5
]

export const Location = {
    latitude:16.073742,
    longitude:  108.150028
}