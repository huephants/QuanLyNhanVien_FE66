function NhanVien(maNV, tenNV, heSoCV, luongCB, soGioLam) {
    this.maNhanVien = maNV;
    this.tenNhanVien = tenNV;
    this.chucVu = '';
    this.heSoChucVu = heSoCV;
    this.luongCoBan = luongCB;
    this.soGioLamTrongThang = soGioLam;
    this.tinhTongLuong = function () {
        var tongLuong = (Number(heSoCV)) * (Number(luongCB));
        return tongLuong;
    };
    this.xepLoaiNV = function () {
        var xepLoai = '';
        if (soGioLam >= 120) {
            xepLoai = 'Nhân viên xuất sắc';
        } else {
            if (soGioLam < 120 && soGioLam >= 100) {
                xepLoai = 'Nhân viên giỏi';
            } else {
                if (soGioLam < 100 && soGioLam >= 80) {
                    xepLoai = 'Nhân viên khá';
                } else {
                    xepLoai = 'Nhân viên trung bình';
                }
            }
        }
        return xepLoai;
    };
    this.timChucVu = function (value) {
        if (value === 1) {
            return 'Nhân viên';
        } else {
            if (value === 2) {
                return 'Quản lý';
            } else {
                return 'Giám đốc';
            }
        }

    }
}
