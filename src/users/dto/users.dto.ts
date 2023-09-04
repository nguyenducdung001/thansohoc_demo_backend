 export interface UserLoginDto {
    email: string;
    mat_khau: string;
  }
  
  export interface UserSignupDto {
    ho_ten: string;
    email: string;
    so_dt: string;
    mat_khau: string;
    loai_nguoi_dung: string;
  }
  
  export interface getUserDto {
    tai_khoan: number;
    ho_ten: string;
    email: string;
    so_dt: string;
    mat_khau: string;
    loai_nguoi_dung: string;
  }
  
  export interface updateUserDto {
    tai_khoan: number;
    ho_ten: string;
    email: string;
    so_dt: string;
    mat_khau: string;
    loai_nguoi_dung: string;
  }