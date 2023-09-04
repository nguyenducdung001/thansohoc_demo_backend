import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { UserLoginDto, UserSignupDto, getUserDto, updateUserDto } from './dto/users.dto';


const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
    constructor(private config: ConfigService , private jwt: JwtService ){}

    private prisma = new PrismaClient();

    async login( user:UserLoginDto ): Promise<String> {

        let {email, mat_khau} = user;

        let checkUser = await this.prisma.users.findUnique({
            where: {
                email,
            },
        });
        if(checkUser){
            // let checkPass = bcrypt.compareSync(mat_khau, checkUser.mat_khau);
            // if (checkPass) {
            //     let token = this.jwt.sign(
            //         { data: checkUser },
            //         { secret: this.config.get('SECRET_KEY'), expiresIn: '20m' },
            //       );
            //       return token;
            //     }

            let token = this.jwt.sign(
              { data: checkUser },
              { secret: this.config.get('SECRET_KEY'), expiresIn: '20m' },
            );
            return token;
        }

        
    }


    async signup(newUser: UserSignupDto) : Promise<UserSignupDto> {

        let { ho_ten, email, so_dt, mat_khau, loai_nguoi_dung } = newUser;
        // console.log(ho_ten);
        // console.log(email);
        // console.log(so_dt);
        // console.log(mat_khau);
        // console.log(loai_nguoi_dung);
        let model = {
            ho_ten,
            email,
            so_dt,
            mat_khau,
            loai_nguoi_dung,
          };

          let data = await this.prisma.users.create({
            data: model,
          });
          return data;
    }



    async getListUser() : Promise<getUserDto[]> {

        let data = this.prisma.users.findMany();

        return data;

    }


    async updateUser( updateUser: updateUserDto, tai_khoan: number) : Promise<any> {

        let dataOne = await this.prisma.users.findUnique({
            where: {
              tai_khoan: tai_khoan,
            },
          });

          if (dataOne) {
            let { ho_ten, email, so_dt, mat_khau, loai_nguoi_dung } = updateUser;
            let userEdit = {
              ho_ten,
              email,
              so_dt,
              mat_khau,
              loai_nguoi_dung,
            };
            let editData = await this.prisma.users.update({
              data: userEdit,
              where: {
                tai_khoan: tai_khoan,
              },
            });
            return editData;
          }
          return dataOne;
    }



    async removeUser ( id: number) {
        let dataOne = await this.prisma.users.findUnique({
            where: {
              tai_khoan: id,
            },
          });


          if (dataOne) {
            let delUser = await this.prisma.users.delete({
              where: {
                tai_khoan: id,
              },
            });
      
            return delUser;
          }
    }
 



}
