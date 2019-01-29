import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Reviews } from "../pages/models/reviews";
import { Globals } from "../app/globals";

@Injectable()
export class ReviewService {

    private reviews: Array<Reviews>;
    public globals: Globals
    constructor(private http: Http) {
        this.reviews = [];
    }
    getAllReviews() {


        this.reviews = [];


        var review1 = new Reviews();
        review1.name = "Kenneth iX"
        review1.description = "It was amazing";


        var review2 = new Reviews();
        review2.name = "Erich iX"
        review2.description = "It was amazing";

        var review3 = new Reviews();
        review3.name = "Amy iX"
        review3.description = "It was amazing";

        var review4 = new Reviews();
        review4.name = "Grace iX"
        review4.description = "It was amazing";

        var review5 = new Reviews();
        review5.name = "Ji iX"
        review5.description = "It was amazing";


        this.reviews.push(review1);
        this.reviews.push(review2);
        this.reviews.push(review3);
        this.reviews.push(review4);
        this.reviews.push(review5);



        return this.reviews;


        // 'http://127.0.0.1:3000/login?email=' + email + "&param2=" + param2
        //var url = 'http://127.0.0.1:3000/login';
        /*this.http.get('http://127.0.0.1:3000/login')
            .subscribe(
                result => {
                    console.log("Result: ", result);
                    callback(null, result);
                },
                err => {
                    console.log("Err: ", err);
                    callback(err, null);
                }
            );
        this.http.get('url')*/
    }


    createReview(reviewData: Reviews, callback: Function) {
        this.http.post(this.globals.URL + "/addreview", reviewData)
            .subscribe(
                result => {
                    callback(null, result.json());
                },
                err => {
                    callback(err, null);
                }
            )
    }

}
