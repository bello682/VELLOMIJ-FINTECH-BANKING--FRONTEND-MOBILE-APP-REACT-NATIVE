// services/bankService.ts
import axios from "axios";

export const fetchBanksFromPaystack = async () => {
	try {
		// Use raw axios here to avoid sending your JWT to Paystack
		const res = await axios.get("https://api.paystack.co/bank?country=nigeria");

		const externalBanks = res.data.data;
		const internalBank = { name: "Vellomij Bank", code: "VELLOMIJ_CODE" };

		return [internalBank, ...externalBanks];
	} catch (err) {
		return [{ name: "Vellomij Bank", code: "VELLOMIJ_CODE" }];
	}
};
