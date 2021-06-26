// Gọi Api lấy danh sách sinh viên do backend cung câp
function getNhanVienApi() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
        responseType: 'json',
    });

    promise.then(function (result) {
        console.log('1');
        console.log(result.data);
        renderTableNhanVien(result.data);
    });

    promise.catch(function (errors) {
        console.log('errors', errors);
    })
    console.log('2');
}

// Gọi hàm khi người dùng vừa vào web
getNhanVienApi();

function renderTableNhanVien(arrNV) {
    var content = '';
    for (var index = 0; index < arrNV.length; index++) {
        var nv = arrNV[index];
        var nhanVien = new NhanVien(nv.maNhanVien, nv.tenNhanVien, nv.heSoChucVu, nv.luongCoBan, nv.soGioLamTrongThang);
        nhanVien.chucVu = nhanVien.timChucVu(nv.heSoChucVu);
        var trNhanVien = `
            <tr>
                <td>${nhanVien.maNhanVien}</td>
                <td>${nhanVien.tenNhanVien}</td>
                <td>${nhanVien.chucVu}</td>
                <td>${nhanVien.luongCoBan}</td>
                <td>${nhanVien.soGioLamTrongThang}</td>
                <td>${nhanVien.tinhTongLuong()}</td>
                <td>${nhanVien.xepLoaiNV()}</td>
                <td>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')"> Xóa </button>
                <button class="btn btn-primary" onclick="layNhanVien('${nhanVien.maNhanVien}')"> Chỉnh sửa </button>
                </td>
            </tr>
        `;
        content += trNhanVien;
    }
    console.log(content);
    document.querySelector('#tblNhanVien').innerHTML = content;
}

// Thêm nhân viên (POST DATA)
document.querySelector('#btnThemNhanVien').onclick = function (event) {
    event.preventDefault();
    var nhanVien = new NhanVien();
    var kiemTraDuLieu = new Validation();

    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.chucVu = nhanVien.timChucVu(nhanVien.heSoChucVu);
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    console.log(nhanVien);
    // Kiểm tra dữ liệu trước khi post data
    //(1): Kiểm tra rỗng
    var valid = true;
    valid &= kiemTraDuLieu.kiemTraRong(nhanVien.maNhanVien, '#error_required_maNhanVien', 'Mã nhân viên') & kiemTraDuLieu.kiemTraRong(nhanVien.tenNhanVien, '#error_required_tenNhanVien', 'Tên nhân viên') & kiemTraDuLieu.kiemTraRong(nhanVien.luongCoBan, '#error_required_luongCoBan', 'Lương cơ bản') & kiemTraDuLieu.kiemTraRong(nhanVien.soGioLamTrongThang, '#error_required_soGioLamTrongThang', 'Số giờ làm trong tháng');
    // (2): Kiểm tra định dạng
    // (2.1): Kiểm tra tất cả là ký tự
    valid &= kiemTraDuLieu.kiemTraTatCaKyTu(nhanVien.tenNhanVien, '#error_allLetter_tenNhanVien', 'Tên nhân viên');
    // (2.2): Kiểm tra tất cả là ký số
    valid &= kiemTraDuLieu.kiemTraTatCaSo(nhanVien.maNhanVien, '#error_allNumber_maNhanVien', 'Mã nhân viên') & kiemTraDuLieu.kiemTraTatCaSo(nhanVien.luongCoBan, '#error_allNumber_luongCoBan', 'Lương cơ bản') & kiemTraDuLieu.kiemTraTatCaSo(nhanVien.soGioLamTrongThang, '#error_allNumber_soGioLamTrongThang', 'Số giờ làm trong tháng');

    // Kiểm tra giá trị
    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanVien.luongCoBan, '#error_min_max_value_luongCoBan', 1000000, 20000000, 'Lương cơ bản');
    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#error_min_max_value_soGioLamTrongThang', 50, 150, 'Số giờ làm trong tháng');

    //Kiểm tra độ dài
    valid &= kiemTraDuLieu.kiemTraDoDai(nhanVien.maNhanVien, '#error_min_max_length_maNhanVien', 4, 6, 'Mã nhân viên');


    if (!valid) {
        return;
    }


    var promise = axios({
        url: 'http://svcy.myclass.vn//api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nhanVien,
    })
    promise.then(function (result) {
        console.log(result.data)
        getNhanVienApi();
    }
    )
    promise.catch(function (error) {
        console.log('error', errror.response.data)
    })
}
// Xóa nhân viên
function xoaNhanVien(maNhanVienClick) {

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVienClick}`,
        method: 'DELETE'
    });


    promise.then(function (result) {
        console.log('result', result.data);
        getNhanVienApi();
    });

    promise.catch(function (error) {
        console.log('error', error.response.data);
    })
}
// Sửa nhân viên
function layNhanVien(maNhanVien) {

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET'
    });

    promise.then(function (result) {
        var nhanVien = result.data;
        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#chucVu').value = nhanVien.heSoChucVu;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nhanVien.soGioLamTrongThang;

    });

    promise.then(function (result) {
        console.log(result.data);
    })
    document.querySelector('#btnLuuThongTin').disabled = false;

}
// cập nhật dữ liệu nhân viên
document.querySelector('#btnLuuThongTin').onclick = function (event) {
    event.preventDefault();
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.chucVu = nhanVien.timChucVu(nhanVien.heSoChucVu);
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    console.log(nhanVien);

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
        method: 'PUT',
        data: nhanVien,
    });

    promise.then(function (result) {
        console.log(result.data)
        getNhanVienApi();
    }
    )
    promise.catch(function (error) {
        console.log('error', errror.response.data)
    })
}
