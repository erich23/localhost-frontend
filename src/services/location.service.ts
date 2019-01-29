import { Location } from "../pages/models/location";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ProductService } from "./product.service";




@Injectable()
export class LocationService {

    private locations: Array<Location>;


    //public productService: ProductService;
    // public productService: ProductService = new ProductService();

    constructor(public productService: ProductService) {
        this.locations = [];
    }

    /*
        callback= function(err, data) {...}
    */
    async getAllLocations() {

        var location1 = new Location();

        location1.name = "New York";
        location1.id = 1;
        location1.image = "../assets/imgs/new-york-card.jpg";
        location1.listings = (await this.productService.getProductByCity(location1.name)).json().length;

        // this.productService.getProductByCity(location1.name, (err, data)=>{

        //     location1.listings = data.json().length;

        // })

        var location2 = new Location();

        location2.name = "San Francisco";
        location2.id = 2;
        location2.image = "../assets/imgs/sanfrancisco-card.jpg";

        location2.listings = (await this.productService.getProductByCity(location2.name)).json().length;


        // this.productService.getProductByCity(location1.name, (err, data)=>{

        //     location2.listings = data.json().length;

        // })



        var location3 = new Location();

        location3.name = "Ann Arbor";
        location3.id = 3;
        location3.image = "../assets/imgs/ann-arbor-card.jpg"
        location3.listings = (await this.productService.getProductByCity(location3.name)).json().length;


        // this.productService.getProductByCity(location1.name, (err, data)=>{

        //     if(err){

        //         console.log("cant get listings number in location.service.ts")
        //     }

        //     location3.listings = data.json().length;

        // })


        var location4 = new Location();

        location4.name = "Vienna";
        location4.id = 4;
        location4.image = "../assets/imgs/vienna-card.jpg";
        location4.listings = (await this.productService.getProductByCity(location4.name)).json().length;


        // this.productService.getProductByCity(location1.name, (err, data)=>{

        //     location4.listings = data.json().length;

        // })

        this.locations.push(location1);
        this.locations.push(location2);
        this.locations.push(location3);
        this.locations.push(location4);


        return this.locations;
    }
}
