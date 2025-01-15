import { Injectable } from '@angular/core';

interface OemData {
    avgPolicyClaimsReduction: string;
    avgSavingsInTradeIns: number;
    image: string;
    additional: string;
}

export type OemKeys =
    | "Audi"
    | "Chevrolet"
    | "Ford"
    | "GMC"
    | "Cadillac"
    | "Ram"
    | "Tesla"
    | "Mercedes-Benz"
    | "BMW"
    | "Volkswagen"
    | "Porsche"
    | "Lexus"
    | "Honda"
    | "Subaru"
    | "Kia"
    | "Volvo"
    | "Polestar"
    | "Jaguar"
    | "Land Rover"
    | "Other";

@Injectable({
    providedIn: 'root',
})
export class OEMService {

    oemValues: Record<OemKeys, OemData> = {

        "Audi": { avgPolicyClaimsReduction: "80%", avgSavingsInTradeIns: 1000, image: "/car-dealers-calculator/assets/audi-bg2.png", additional: "" },
        "Chevrolet": {
            avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 500,
            image: "./assets/chevy-bg.png",
            additional: "Chevrolet stores in the UVeye network have saved an average of $189,000 in reconditioning costs, increased vehicle acquisitions from 1-3 to 5-10 per month, and achieved a 30% average rise in gross profit per repair order. They've also seen a 119% increase in alignment sales revenue and reduced policy spending by approximately $4,000 per month after installing UVeye."
        },
        "Ford": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 500, image: "../../assets/ford-bg3.png", additional: "" },
        "GMC": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 750, image: "car-dealers-calculator/assets/gmc-bg4.png", additional: "" },
        "Cadillac": {
            avgPolicyClaimsReduction: "80%", avgSavingsInTradeIns: 1000,
            image: "car-dealers-calculator/assets/cadillac-bg4.png",
            additional: "Cadillac stores within the UVeye network have experienced a 16% increase in average revenue, a 17% rise in average gross profit, and an additional $166,000 in monthly profits."
        },
        "Ram": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 750, image: "car-dealers-calculator/assets/ram-bg.png", additional: "" },
        "Tesla": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 500, image: ".car-dealers-calculator/assets/tesla-bg.png", additional: "" },
        "Mercedes-Benz": {
            avgPolicyClaimsReduction: "80%", avgSavingsInTradeIns: 1000,
            image: "car-dealers-calculator/assets/mercedes-bg.png",
            additional: "Mercedes-Benz stores in the UVeye network have experienced a 46% YoY increase in alignment sales and a 100% YoY rise in tire sales."
        },
        "BMW": {
            avgPolicyClaimsReduction: "80%", avgSavingsInTradeIns: 1000,
            image: "car-dealers-calculator/assets/bmw-bg2.png",
            additional: "BMW stores in the UVeye network have reported a 41% growth in alignment sales and a 25% increase in tire sales."
        },
        "Volkswagen": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 750, image: "car-dealers-calculator/assets/volkswagen-bg2.png", additional: "" },
        "Porsche": {
            avgPolicyClaimsReduction: "80%", avgSavingsInTradeIns: 1500,
            image: "car-dealers-calculator/assets/porsche-bg4.png",
            additional: "Porsche stores in the UVeye network have achieved over $100,000 annually in policy savings."
        },
        "Lexus": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 750, image: "car-dealers-calculator/assets/lexus-bg.png", additional: "" },
        "Honda": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 500, image: "car-dealers-calculator/assets/honda-bg.png", additional: "" },
        "Subaru": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 500, image: "car-dealers-calculator/assets/subaru-bg.png", additional: "" },
        "Kia": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 500, image: "car-dealers-calculator/assets/kia-bg.png", additional: "" },
        "Volvo": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 750, image: "car-dealers-calculator/assets/volvo-bg.png", additional: "" },
        "Polestar": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 500, image: "car-dealers-calculator/assets/polestar-bg4.png", additional: "" },
        "Jaguar": { avgPolicyClaimsReduction: "80%", avgSavingsInTradeIns: 1500, image: "car-dealers-calculator/assets/jaguar-bg.png", additional: "" },
        "Land Rover": {
            avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 750,
            image: "car-dealers-calculator/assets/jlr-bg2.png",
            additional: "Land Rover stores in the UVeye network have achieved an average increase of $340,000 in service sales, with a 34.7% rise in overall service sales. They’ve also seen a 25% average increase in RO counts for alignments, along with a reduction in service policy spending."
        },
        "Other": { avgPolicyClaimsReduction: "70%", avgSavingsInTradeIns: 500, image: "car-dealers-calculator/assets/polestar-bg3.png", additional: "" }
    };


    getOEMs(): OemKeys[] {
        return Object.keys(this.oemValues) as OemKeys[];
    }


    calculateROI(formData: any): any {
        const selectedOEM = this.oemValues[formData.oem as OemKeys];

        const roPerMonth = formData.roPerDay * 25; // Assuming 25 working days
        const savingsInClaims = formData.liabilityClaims * (parseFloat(selectedOEM.avgPolicyClaimsReduction) / 100);
        const savingsInTradeIns = formData.tradeIns * selectedOEM.avgSavingsInTradeIns;
        const monthlyPotentialIncreaseInROs = roPerMonth * 30;

        const monthlyPotentialNetProfit = savingsInClaims + savingsInTradeIns - 6300;
        const monthlyROI = (savingsInClaims + savingsInTradeIns) / 6300;

        return {
            oem: formData.oem,
            monthlyROI,
            monthlyPotentialNetProfit,
            savingsInClaims,
            savingsInTradeIns,
            monthlyPotentialIncreaseInROs,
            avgPolicyClaimsReduction: selectedOEM.avgPolicyClaimsReduction,
            avgSavingsInTradeIns: selectedOEM.avgSavingsInTradeIns,
            additional: selectedOEM.additional
        };
    }


}
