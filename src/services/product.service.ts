import { Product } from "../pages/models/product";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { callbackify } from "util";
import { Globals } from "../app/globals";

@Injectable()
export class ProductService {





    constructor(public http: Http, public globals: Globals) {

    }

    // getProductByCity(locationName: string, callback){


    // this.http.get(this.globals.URL + "/productbylocation?city=" + locationName ).subscribe(
    //     this.http.get(this.globals.URL + "/productbylocation?city=" + locationName ).subscribe(

    //         result => {

    //             callback(null,result);
    //         },
    //         err => {
    //             console.log(err);
    //         }
    //     )

    // }

    async getProductByCity(locationName: string) {
        return this.http.get(this.globals.URL + "/productbylocation?city=" + locationName).toPromise();
    }





    getAllProducts(callback) {
        // if (this.products.length) return this.products;
        this.http.get(this.globals.URL + "/allproducts")
            .subscribe(
                result => {
                    console.log(result);
                    let products = result.json() as Array<Product>
                    callback(null, products.reverse());
                },
                err => {
                    console.log(err);
                    callback(err);
                }
            )
    }

    getUserProducts(callback) {

        this.http.get(this.globals.URL + "/myproducts")
            .subscribe(
                result => {
                    console.log(result);
                    let products = result.json() as Array<Product>
                    callback(null, products.reverse());
                },
                err => {
                    console.log(err);
                    callback(err);
                }
            )
    }
}