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